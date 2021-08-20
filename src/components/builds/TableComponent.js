import React from 'react'
import {Row, Col, Container, Table} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'
import TableWidget from './widgets/TableWidget'

const TableComponent = ({entity, collection}) => {
    return (
        <>
           <h1>{`${entity}s`}</h1>
            <NavLink to="/groups/create" className="btn btn-success" style={{ marginBottom: 30 }}>
                <FiPlus style={{ marginRight: 8 }} />
                Add {entity}
            </NavLink>

            <div className="card form-portal-card">
                <Container fluid>
                    <Row>
                        <Col>
                            <Table striped hover>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Slots</th>
                                        <th>Can Expire</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {collection.length !== 0 ? collection.map(item => {
                                        return (
                                            <TableWidget 
                                                key={item.id}
                                                item={item}
                                            />
                                        )
                                    }) : (<tr><td>{'No Data Found!!!'}</td></tr>)}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </div> 
        </>
    )
}

export default TableComponent
