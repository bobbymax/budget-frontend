/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row, Table } from 'react-bootstrap'
import { FiEdit2, FiSend, FiTrash2 } from 'react-icons/fi'
import { connect } from 'react-redux'
import { destroy, index, store, update } from '../../../redux/actions'
import * as broadcast from '../../../redux/accessControl/types'

const Procedures = (props) => {

    const initialState = {
        procedures: [],
        roles: [],
        workflows: [],
        id: 0,
        workflowId: 0,
        roleId: 0,
        order: 0,
        isUpdating: false
    }

    const [state, setState] = useState(initialState)

    const data = {
        work_flow_id: state.workflowId,
        role_id: state.roleId,
        order: state.order
    }

    const loadData = data => {
        setState({
            ...state,
            id: data.id,
            workflowId: data.work_flow_id,
            roleId: data.role_id,
            order: data.order,
            isUpdating: true
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        if (state.isUpdating) {
            props.update('procedures', state.id, data, {
                success: broadcast.UPDATED_PROCEDURE_RECORD,
                failed: broadcast.UPDATED_PROCEDURE_RECORD_FAILED
            })
        } else {
            props.store('procedures', data, {
                success: broadcast.CREATED_PROCEDURE_RECORD,
                failed: broadcast.CREATED_PROCEDURE_RECORD_FAILED
            })
        }

        setState({
            ...state,
            id: 0,
            workflowId: 0,
            roleId: 0,
            order: 0,
            isUpdating: false
        })
    }

    const handleDelete = data => {
        props.destroy('procedures', data.id, {
            success: broadcast.DELETED_PROCEDURE_RECORD,
            failed: broadcast.DELETED_PROCEDURE_RECORD_FAILED
        })
    }

    useEffect(() => {
        props.index('procedures', {
            success: broadcast.FETCHED_PROCEDURES,
            failed: broadcast.FETCHED_PROCEDURES_FAILED
        })
    }, [])

    useEffect(() => {
        props.index('roles', {
            success: broadcast.FETCH_ROLES,
            failed: broadcast.FETCH_ROLES_FAILED
        })
    }, [])

    useEffect(() => {
        props.index('workFlows', {
            success: broadcast.FETCHED_WORKFLOWS,
            failed: broadcast.FETCHED_WORKFLOWS_FAILED
        })
    }, [])

    useEffect(() => {

        if (props.access.workflows.collection !== 0 && props.access.procedures.collection !== 0 && props.access.roles.collection !== 0) {
            setState({
                ...state,
                procedures: props.access.procedures.collection,
                roles: props.access.roles.collection,
                workflows: props.access.workflows.collection
            })
        }

    }, [props.access.workflows.collection, props.access.procedures.collection, props.access.roles.collection])

    return (
        <>
            <h4 className="mb-4">Procedures</h4>

            <Form onSubmit={handleSubmit} className="mb-5">
                <Row>
                    <Col md={5}>
                        <Form.Group>
                            <Form.Control 
                                as="select"
                                className="custom-select"
                                value={state.workflowId}
                                onChange={e => setState({...state, workflowId: e.target.value})}
                            >
                                <option value="0">Select Workflow</option>
                                {state.workflows.length !== 0 ? state.workflows.map(workflow => <option key={workflow.id} value={workflow.id}>{workflow.name}</option>) : null}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={5}>
                        <Form.Group>
                            <Form.Control 
                                as="select"
                                className="custom-select"
                                value={state.roleId}
                                onChange={e => setState({...state, roleId: e.target.value})}
                            >
                                <option value="0">Select Role</option>
                                {state.roles.length !== 0 ? state.roles.map(role => <option key={role.id} value={role.id}>{role.name}</option>) : null}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={2}>
                        <Form.Group>
                            <Form.Control 
                                type="number"
                                placeholder="ENTER ORDER"
                                value={state.order}
                                onChange={e => setState({...state, order: e.target.value})}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button
                            variant="success"
                            size="sm"
                            type="submit"
                            disabled={state.workflowId === 0 || state.roleId === 0 || state.order === 0}
                        >
                            <FiSend />
                            <span className="ml-3">{state.isUpdating ? 'UPDATE' : 'CREATE'} PROCEDURE</span>
                        </Button>
                    </Col>
                </Row>
            </Form>

            <Table striped hover bordered>
                <thead>
                    <tr>
                        <th>Workflow</th>
                        <th>Level</th>
                        <th>Order</th>
                        <th>Modify</th>
                    </tr>
                </thead>
                <tbody>
                    {state.procedures.length !== 0 ? state.procedures.map(procedure => (
                        <tr key={procedure.id}>
                            <td>{procedure.workflow.name}</td>
                            <td>{procedure.role.name}</td>
                            <td>{procedure.order}</td>
                            <td>
                                <Button
                                    variant="warning"
                                    size="sm"
                                    onClick={() => loadData(procedure)}
                                >
                                    <FiEdit2 />
                                </Button>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleDelete(procedure)}
                                >
                                    <FiTrash2 />
                                </Button>
                            </td>
                        </tr>
                    )) : <tr><td colSpan="4" className="text-danger">No Data Found!!</td></tr>}
                </tbody>
            </Table>
        </>
    )
}

const mapStateToProps = state => ({
    access: state.access
})

const mapDispatchToProps = dispatch => {
    return {
        index: (entity, broadcast) => dispatch(index(entity, broadcast)),
        store: (entity, data, broadcast) => dispatch(store(entity, data, broadcast)),
        destroy: (entity, id, broadcast) => dispatch(destroy(entity, id, broadcast)),
        update: (entity, id, data, broadcast) => dispatch(update(entity, id, data, broadcast))
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(Procedures)
