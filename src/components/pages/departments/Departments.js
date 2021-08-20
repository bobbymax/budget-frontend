/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { index, destroy } from "../../../redux/actions"
import * as broadcast from '../../../redux/accessControl/types'

import {
    FiPlus
} from 'react-icons/fi'
import {
    Container,
    Row,
    Col,
    Table,
} from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import DepartmentsWidget from '../../widgets/DepartmentsWidget'

const Departments = (props) => {

    // const handleSubmit = (data) => {

    // }

    const handleUpdate = (department) => {
        // e.preventDefault()
        props.history.push({
            pathname: `departments/${department.label}/update`,
            state: {
                department: department,
                actionType: "update"
            }
        })

    }

    const handleDestroy = (data) => {
        props.destroy('departments', data.id, {
            success: broadcast.DELETE_DEPARTMENT_RECORD,
            failed: broadcast.DELETE_DEPARTMENT_RECORD_FAILED
        })
        // props.index('departments')
    }

    useEffect(() => {
        props.index('departments', {
            success: broadcast.FETCH_DEPARTMENTS,
            failed: broadcast.FETCH_DEPARTMENTS_FAILED
        })
    }, [])

    return (
        <>
            <h1>Departments</h1>
            <NavLink to="/departments/create" className="btn btn-success" style={{ marginBottom: 30 }}>
                <FiPlus style={{ marginRight: 8 }} />
                Add Department
            </NavLink>

            <div className="card form-portal-card">
                <Container fluid>
                    <Row>
                        <Col>
                            <Table striped hover>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Code</th>
                                        <th>Type</th>
                                        <th>Parent</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.departments.collection.length !== 0 ? props.departments.collection.map(department => {
                                        return (
                                            <DepartmentsWidget 
                                                key={department.id}
                                                department={department}
                                                onEdit={handleUpdate}
                                                onDestroy={handleDestroy}
                                            />
                                        )
                                    }): <tr><td colSpan="5" className="text-danger">{'No Data Found!!!'}</td></tr>}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        departments: state.access.departments
    }
}

const mapDispatchToProps = dispatch => {
    return {
        index: (entity, broadcast) => dispatch(index(entity, broadcast)),
        destroy: (entity, id, broadcast) => dispatch(destroy(entity, id, broadcast))
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(Departments)
