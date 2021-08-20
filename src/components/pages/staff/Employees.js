/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { destroy, index, store, update } from '../../../redux/actions'
import * as broadcast from '../../../redux/accessControl/types'
import * as broad from '../../../redux/entitlements/types'
import {Row, Col, Container, Table, Button, Form} from 'react-bootstrap'
import { FiPlus, FiUserPlus, FiX } from 'react-icons/fi'
import EmployeeWidget from '../../widgets/EmployeeWidget'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { customTheme, filterDepts } from '../../../services/helpers/functions'

export const Employees = (props) => {

    const initialState = {
        id: 0,
        name: "",
        staff_no: "",
        email: "",
        grade_level_id: 0,
        showForm: false,
        isUpdating: false
    }

    const [state, setState] = useState(initialState)
    const [departments, setDepartments] = useState([])
    const [roles, setRoles] = useState([])
    

    const handleUpdate = data => {
        setState({
            ...state,
            id: data.id,
            name: data.name,
            staff_no: data.staff_no,
            email: data.email,
            grade_level_id: data.grade_level_id,
            showForm: true,
            isUpdating: true
        })

        if (data.departments.length !== 0) {
            setDepartments(filterDepts(data.departments))
        }

        if (data.roles.length !== 0) {
            setRoles(filterDepts(data.roles))
        }
    }

    const handleDestroy = data => {
        props.destroy('users', data.id, {
            success: broadcast.DELETE_STAFF_RECORD,
            failed: broadcast.DELETE_STAFF_RECORD_FAILED
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        const data = {
            name: state.name,
            staff_no: state.staff_no,
            email: state.email,
            grade_level_id: state.grade_level_id,
            departments: departments,
            roles: roles
        }

        if (! state.isUpdating) {
            props.store('users', data, {
                success: broadcast.CREATE_STAFF_RECORD,
                failed: broadcast.CREATE_STAFF_RECORD_FAILED
            })
        } else {
            props.update('users', state.id, data, {
                success: broadcast.UPDATE_STAFF_RECORD,
                failed: broadcast.UPDATE_STAFF_RECORD_FAILED
            })
        }

        setState({
            ...state,
            id: 0,
            name: "",
            staff_no: "",
            email: "",
            grade_level_id: 0,
            showForm: false,
            isUpdating: false
        })

        setDepartments([])
        setRoles([])
    }

    useEffect(() => {
        props.index('users', {
            success: broadcast.FETCH_ALL_STAFF,
            failed: broadcast.FETCH_ALL_STAFF_FAILED
        })
    }, [])

    useEffect(() => {
        props.index('gradeLevels', {
            success: broad.FETCH_GRADE_LEVELS,
            failed: broad.FETCH_GRADE_LEVELS_FAILED
        })
    }, [])

    useEffect(() => {
        props.index('departments', {
            success: broadcast.FETCH_DEPARTMENTS,
            failed: broadcast.FETCH_DEPARTMENTS_FAILED
        })
    }, [])

    useEffect(() => {
        props.index('roles', {
            success: broadcast.FETCH_ROLES,
            failed: broadcast.FETCH_ROLES_FAILED
        })
    }, [])

    return (
        <>
            <h1>Staff List</h1>
            <Button 
                className="btn btn-success" 
                style={{ marginBottom: 30 }}
                onClick={() => setState({...state, showForm: true})}
                disabled={state.isUpdating}
            >
                <FiPlus style={{ marginRight: 8 }} />
                Add Staff Record
            </Button>

            {state.showForm ? 
                <div className="card form-portal-card mb-5">
                    <Form onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control 
                                        type="text"
                                        placeholder="Enter Staff Name"
                                        value={state.name}
                                        onChange={e => setState({...state, name: e.target.value})}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={2}>
                                <Form.Group>
                                    <Form.Label>Staff Number</Form.Label>
                                    <Form.Control 
                                        type="text"
                                        placeholder="Enter Staff Number"
                                        value={state.staff_no}
                                        onChange={e => setState({...state, staff_no: e.target.value})}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control 
                                        type="email"
                                        placeholder="Enter Staff Email"
                                        value={state.email}
                                        onChange={e => setState({...state, email: e.target.value})}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={2}>
                                <Form.Group>
                                    <Form.Label>Grade Level</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={state.grade_level_id}
                                        onChange={e => setState({...state, grade_level_id: e.target.value})}
                                    >
                                        <option>Select Grade Level</option>
                                        {props.entitlements.gradeLevels.collection.length !== 0 ? props.entitlements.gradeLevels.collection.map(level => <option key={level.id} value={level.id}>{level.code}</option>) : null}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Departments</Form.Label>
                                    <Select 
                                        components={makeAnimated()}
                                        theme={customTheme}
                                        options={filterDepts(props.access.departments.collection)}
                                        placeholder="Select Departments"
                                        onChange={setDepartments}
                                        value={departments}
                                        isSearchable
                                        isMulti
                                        autoFocus
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Roles</Form.Label>
                                    <Select 
                                        components={makeAnimated()}
                                        theme={customTheme}
                                        options={filterDepts(props.access.roles.collection)}
                                        placeholder="Select Roles"
                                        onChange={setRoles}
                                        value={roles}
                                        isSearchable
                                        isMulti
                                        autoFocus
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button 
                                    variant="success"
                                    type="submit"
                                >
                                    <FiUserPlus style={{ marginRight: 10 }}/>
                                    {state.isUpdating ? 'Update' : 'Add'} Staff
                                </Button>
                                <Button 
                                    variant="danger"
                                    onClick={() => {
                                        setState({
                                            ...state,
                                            id: 0,
                                            name: "",
                                            staff_no: "",
                                            email: "",
                                            grade_level_id: 0,
                                            showForm: false,
                                            isUpdating: false
                                        })

                                        setDepartments([])
                                        setRoles([])
                                    }}
                                >
                                    <FiX style={{ marginRight: 10 }} />
                                    Close
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            : null}

            <div className="card form-portal-card">
                <Container fluid>
                    <Row>
                        <Col>
                            <Table striped hover>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Staff Number</th>
                                        <th>Email</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.access.staff.collection.length !== 0 ? props.access.staff.collection.map(employee => {
                                        return (
                                            <EmployeeWidget 
                                                key={employee.id}
                                                employee={employee}
                                                onEdit={handleUpdate}
                                                onDestroy={handleDestroy}
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

const mapStateToProps = state => ({
    access: state.access,
    entitlements: state.entitlements
})

const mapDispatchToProps = dispatch => {
    return {
        index: (entity, broadcast) => dispatch(index(entity, broadcast)),
        store: (entity, body, broadcast) => dispatch(store(entity, body, broadcast)),
        update: (entity, id, body, broadcast) => dispatch(update(entity, id, body, broadcast)),
        destroy: (entity, id, broadcast) => dispatch(destroy(entity, id, broadcast))
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(Employees)
