import React, { useState } from 'react'
import { connect } from 'react-redux'
import MaterialTable from 'material-table'
import {Button, Col, Form, Row} from 'react-bootstrap'
import XLSX from 'xlsx'
import Controllers from '../../../services/classes/Controllers'

const EXTS = ['xlsx', 'xls', 'csv']

const ImportGroups = props => {

    const [cols, setCols] = useState([])
    const [data, setData] = useState()
    const [dataTypes, setDataTypes] = useState("")

    const types = [
        {
            id: 1,
            label: 'Departments',
            value: 'departments'
        }, 
        {
            id: 2,
            label: 'Staff',
            value: 'staff'
        }, 
        {
            id: 3,
            label: 'Budget Heads',
            value: 'budget-heads'
        }, 
        {
            id: 4,
            label: 'Sub Budget Heads',
            value: 'sub-budget-heads'
        },
        {
            id: 5,
            label: 'Modules',
            value: 'modules'
        }
    ]

    const importData = e => {
        e.preventDefault()

        Controllers.bulkSubmit('imports', {
            type: dataTypes,
            data
        })
        .then(res => console.log(res.data))
        .catch(err => console.log(err.message)) 

        setCols([])
        setDataTypes("")
        setData([])
    }

    const getExtension = file => {
        const parts = file.name.split('.')
        const ext = parts[parts.length - 1]
        return EXTS.includes(ext)
    }

    const convertToJson = (headers, data) => {
        const rows = []
        data.forEach(row => {
            let rowData = {}
            row.forEach((el, index) => {
                rowData[headers[index]] = el
            })
            rows.push(rowData)
        })
        // console.log(headers)
        return rows
    }


    const importExcel = e => {
        const file = e.target.files[0]

        const reader = new FileReader()
        reader.onload = event => {
            // console.log(event)
            // parse data
            const bstr = event.target.result
            const workBook = XLSX.read(bstr, {type: "binary"})

            // get first sheet
            const workSheetName = workBook.SheetNames[0]
            const workSheet = workBook.Sheets[workSheetName]
            // convert to array
            const fileData = XLSX.utils.sheet_to_json(workSheet, {header:1})
            const headers = fileData[0]
            const heads = headers.map(head => ({title: head, field: head}))
            setCols(heads)

            fileData.splice(0, 1)
            setData(convertToJson(headers, fileData))
        }

        if (file) {
            if (getExtension(file)) {
                reader.readAsBinaryString(file)
            } else {
                alert("Invalid file input, Select Excel or CSV file")
            }
        } else {
            setData([])
            setCols([])
        }
    }

    return (
        <>
            <Form onSubmit={importData} className="mb-5">
                <Row>
                    <Col md={4}>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Control 
                                type="file"
                                onChange={importExcel}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Control
                            as="select"
                            value={dataTypes}
                            onChange={e => setDataTypes(e.target.value)}
                            disabled={! data}
                        >
                            <option>Select Type</option>
                            {types.map(typ => (<option key={typ.id} value={typ.value}>{typ.label}</option>))}
                        </Form.Control>
                    </Col>
                    <Col md={2}>
                        <Button 
                            className="btn btn-success btn-sm"
                            type="submit"
                            disabled={dataTypes === ""}
                        >
                            Import Data
                        </Button>
                    </Col>
                </Row>
            </Form>
            <MaterialTable title={'Title of Table'} data={data} columns={cols} />
        </>
    )
}

const mapStateToProps = state => ({
    
})

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(ImportGroups)
