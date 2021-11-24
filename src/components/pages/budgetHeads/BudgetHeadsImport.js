import React, { useState } from 'react'
import { connect } from 'react-redux'
import * as Excel from 'xlsx'
import * as broadcast from '../../../redux/accessControl/types'
import { Container, Row, Col, Form, Table } from 'react-bootstrap'
import { FiDatabase } from 'react-icons/fi'
import { bulk } from '../../../redux/actions'

const BudgetHeadsImport = (props) => {

    const [budgetHeads, setBudgetHeads] = useState([])

    const readExcel = (file) => {
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();

            fileReader.readAsArrayBuffer(file)

            fileReader.onload = e => {
                const bufferArray = e.target.result
                const wb = Excel.read(bufferArray, {type: 'buffer'})
                const wsname = wb.SheetNames[0]
                const ws = wb.Sheets[wsname]
                const data = Excel.utils.sheet_to_json(ws)
                resolve(data)
            }

            fileReader.onerror = error => {
                reject(error)
            }
        })

        promise.then(data => {
            setBudgetHeads(data)
        })
    }

    const handleUpload = (e) => {
        e.preventDefault()

        const data = {
            budget_heads: budgetHeads
        }

        props.bulk('budgetHeads/import', data, {
            success: broadcast.BULK_BUDGET_HEAD_UPLOAD,
            failed: broadcast.BULK_BUDGET_HEAD_UPLOAD_FAILED
        })
        setBudgetHeads([])
        props.history.push('/budget-heads')
    }

    return (
        <>

            <Container fluid>

                <Row>
                    <Col>
                        <h1 className="mb-5">Import Budget Heads</h1>
                    </Col>
                </Row>

                <Row className="mb-5">
                    <Col md={8}>
                        <Form onSubmit={handleUpload}>
                            <Row>
                                <Col md={8}>
                                    <Form.Group>
                                        <Form.File
                                            id="custom-file-translate-scss"
                                            lang="en"
                                            onChange={e => {
                                                const file = e.target.files[0]

                                                readExcel(file)
                                            }}
                                            custom
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <button 
                                        type="submit"
                                        className="btn btn-success"
                                        disabled={budgetHeads.length === 0}
                                    >
                                        <FiDatabase />
                                        <span style={{ marginLeft: 8 }}>Save to Database</span>
                                    </button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>

                <Row>
                    
                    <Table striped hover>
                        <thead>
                            <tr>
                                <th>BATCH NO</th>
                                <th>BUDGET NAME</th>
                            </tr>
                        </thead>
                        <tbody>
                            {budgetHeads ? budgetHeads.map((item, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{item.ref_no}</td>
                                        <td>{item.name}</td>
                                    </tr>
                                )
                            }) : 'No Data'}
                        </tbody>
                    </Table>

                </Row>

            </Container>
            
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        budgetHeads: state.budgetting.budgetHeads
    }
}

const mapDispatchToProps = dispatch => {
    return {
        bulk: (entity, data, broadcast) => dispatch(bulk(entity, data, broadcast))
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(BudgetHeadsImport)
