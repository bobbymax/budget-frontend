/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {destroy, index, store, update} from '../../../redux/actions'
import * as broadcast from '../../../redux/accessControl/types'
import { Row, Col, Form, Table } from 'react-bootstrap'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { customTheme, filterDepts } from '../../../services/helpers/functions'

import {
    FiX,
    FiPlus, 
    FiSend
} from 'react-icons/fi'
import ModulesWidget from '../../widgets/ModulesWidget'

export const Modules = (props) => {

    const initialState = {
        id: 0,
        name: "",
        path: "",
        component: "",
        parentId: 0,
        isMenu: 0,
        isAuthRequired: 0,
        isAdministration: 0,
        generatePermissions: 0,
        showForm: false,
        isUpdating: false
    }

    const [state, setState] = useState(initialState)
    const [departments, setDepartments] = useState([])
    const [roles, setRoles] = useState([])

    const handleSubmit = e => {
        e.preventDefault()

        const data = {
            name: state.name,
            path: state.path,
            component: state.component,
            parentId: state.parentId,
            isMenu: state.isMenu,
            isAuthRequired: state.isAuthRequired,
            isAdministration: state.isAdministration,
            generatePermissions: state.generatePermissions,
            departments: departments,
            roles: roles
        }

        if (state.isUpdating) {
            props.update('modules', state.id, data, {
                success: broadcast.UPDATE_MODULE_RECORD,
                failed: broadcast.UPDATE_MODULE_RECORD_FAILED
            })
        } else {
            props.store('modules', data, {
                success: broadcast.CREATE_MODULE_RECORD,
                failed: broadcast.CREATE_MODULE_RECORD_FAILED
            })
        }

        setState({
            ...state,
            id: 0,
            name: "",
            path: "",
            component: "",
            parentId: 0,
            isMenu: 0,
            isAuthRequired: 0,
            isAdministration: 0,
            generatePermissions: 0,
            showForm: false,
            isUpdating: false
        })

        setDepartments([])
        setRoles([])
    }

    const handleUpdate = data => {
        setState({
            ...state,
            id: data.id,
            name: data.name,
            path: data.path,
            component: data.component,
            parentId: data.parentId,
            isMenu: data.isMenu,
            isAuthRequired: data.isAuthRequired,
            isAdministration: data.isAdministration,
            generatePermissions: data.generatePermissions,
            showForm: true,
            isUpdating: true
        })
        setDepartments(filterDepts(data.departments))
        setRoles(filterDepts(data.roles))
    }

    const handleDestroy = data => {
        props.destroy('modules', data.id, {
            success: broadcast.DELETE_MODULE_RECORD,
            failed: broadcast.DELETE_MODULE_RECORD_FAILED
        })
    }
 
    // Fetch Modules
    useEffect(() => {
        props.index('modules', {
            success: broadcast.FETCH_MODULES,
            failed: broadcast.FETCH_MODULES_FAILED
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
            <h1>Modules</h1>
            <button 
                type="button" 
                className="btn btn-success" 
                style={{ marginBottom: 30 }}
                onClick={() => setState({...state, showForm: true})}
                disabled={state.isUpdating}
            >
                <FiPlus style={{ marginRight: 8 }} />
                Add Module
            </button>

            {state.showForm ? 
                <div className="card form-portal-card mb-5">
                    <form onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Col md={3}>
                                <Form.Group>
                                    <Form.Label>Name</Form.Label>
                                    <input 
                                        className="form-control" 
                                        name="name"
                                        placeholder="Enter Module Name"
                                        value={state.name}
                                        onChange={e => setState({...state, name: e.target.value})}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group>
                                    <Form.Label>Path</Form.Label>
                                    <input 
                                        className="form-control" 
                                        name="path"
                                        placeholder="Module Pathname"
                                        value={state.path}
                                        onChange={e => setState({...state, path: e.target.value})}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group>
                                    <Form.Label>Component</Form.Label>
                                    <input 
                                        className="form-control" 
                                        name="component"
                                        placeholder="Enter Module Component"
                                        value={state.component}
                                        onChange={e => setState({...state, component: e.target.value})}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group>
                                    <Form.Label>Generate Permissions</Form.Label>
                                    <select
                                        name="generatePermissions"
                                        className="form-control"
                                        value={state.generatePermissions}
                                        onChange={e => setState({...state, generatePermissions: e.target.value})}
                                    >
                                        <option value="0">No</option>
                                        <option value="1">Yes</option>
                                    </select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-5">
                            <Col md={3}>
                                <Form.Group>
                                    <Form.Label>Parent</Form.Label>
                                    <select
                                        name="parentId"
                                        className="form-control"
                                        value={state.parentId}
                                        onChange={e => setState({...state, parentId: e.target.value})}
                                    >
                                        <option value="0">None</option>
                                        {props.modules.collection.length !== 0 ? props.modules.collection.map(module => (
                                            <option key={module.id} value={module.id}>{module.name}</option>
                                        )) : null}
                                    </select>
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group>
                                    <Form.Label>Add to Quick Menu</Form.Label>
                                    <select
                                        name="isMenu"
                                        className="form-control"
                                        value={state.isMenu}
                                        onChange={e => setState({...state, isMenu: e.target.value})}
                                    >
                                        <option value="0">No</option>
                                        <option value="1">Yes</option>
                                    </select>
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group>
                                    <Form.Label>Access</Form.Label>
                                    <select
                                        name="isAdministration"
                                        className="form-control"
                                        value={state.isAdministration}
                                        onChange={e => setState({...state, isAdministration: e.target.value})}
                                    >
                                        <option value="0">General</option>
                                        <option value="1">Administrator</option>
                                    </select>
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group>
                                    <Form.Label>Authentication</Form.Label>
                                    <select
                                        name="isAuthRequired"
                                        className="form-control"
                                        value={state.isAuthRequired}
                                        onChange={e => setState({...state, isAuthRequired: e.target.value})}
                                    >
                                        <option value="0">Not Required</option>
                                        <option value="1">Required</option>
                                    </select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-5">
                            <Col>
                                <Form.Group>
                                    <Form.Label>Departments</Form.Label>
                                    <Select 
                                        components={makeAnimated()}
                                        theme={customTheme}
                                        options={filterDepts(props.dependencies.departments.collection)}
                                        placeholder="Select Departments Access"
                                        onChange={setDepartments}
                                        value={departments}
                                        isSearchable
                                        isMulti
                                        autoFocus
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Roles</Form.Label>
                                    <Select 
                                        components={makeAnimated()}
                                        theme={customTheme}
                                        options={filterDepts(props.dependencies.roles.collection)}
                                        placeholder="Select Roles Access"
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
                                <button
                                    type="submit"
                                    className="btn btn-success"
                                >
                                    <FiSend style={{ marginRight: 10 }} />
                                    {state.isUpdating ? 'Update' : 'Create'} Module
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => setState({
                                        ...state, 
                                        id: 0,
                                        name: "",
                                        path: "",
                                        component: "",
                                        parentId: 0,
                                        isMenu: 0,
                                        isAuthRequired: 0,
                                        isAdministration: 0,
                                        generatePermissions: 0,
                                        showForm: false,
                                        isUpdating: false
                                    })}
                                >
                                    <FiX style={{ marginRight: 10 }} />
                                    Close
                                </button>
                            </Col>
                        </Row>
                    </form>
                </div>
            : null}

            <div className="card form-portal-card mb-5">
                <Row>
                    <Col>
                        <Table striped hover>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Path</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.modules.collection.length !== 0 ? props.modules.collection.map(module => (
                                    <ModulesWidget 
                                        key={module.id}
                                        module={module}
                                        onEdit={handleUpdate}
                                        onDestroy={handleDestroy}
                                    />
                                )): <tr><td colSpan="5" className="text-danger">No Data Found!!!</td></tr>}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        modules: state.access.modules,
        dependencies: state.access
    }
}

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
)(Modules)
