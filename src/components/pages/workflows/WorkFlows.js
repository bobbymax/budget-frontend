/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {Button, Col, Form, Row, Table} from 'react-bootstrap'
import { FiEdit2, FiSend, FiTrash2 } from 'react-icons/fi'
import { destroy, index, store, update } from '../../../redux/actions'
import * as broadcast from '../../../redux/accessControl/types'

const WorkFlows = (props) => {

    const initialState = {
        id: 0,
        name: "",
        rule: "",
        active: 0,
        workflows: [],
        isUpdating: false
    }
    const [state, setState] = useState(initialState)


    const handleSubmit = e => {
        e.preventDefault()

        const data = {
            name: state.name,
            rule: state.rule,
            active: state.active
        }

        if (state.isUpdating) {
            props.update('workFlows', state.id, data, {
                success: broadcast.UPDATED_WORKFLOW_RECORD,
                failed: broadcast.UPDATED_WORKFLOW_RECORD_FAILED
            })
        } else {
            props.store('workFlows', data, {
                success: broadcast.CREATED_WORKFLOW_RECORD,
                failed: broadcast.CREATED_WORKFLOW_RECORD_FAILED
            })
        }

        setState({
            ...state,
            name: "",
            rule: "",
            active: 0,
            isUpdating: false
        })
    }

    const loadFormData = data => {
        setState({
            ...state,
            id: data.id,
            name: data.name,
            rule: data.rule,
            active: data.active,
            isUpdating: true
        })
    }

    const handleDelete = data => {
        props.destroy('workFlows', data.id, {
            success: broadcast.DELETED_WORKFLOW_RECORD,
            failed: broadcast.DELETED_WORKFLOW_RECORD_FAILED
        })
    }

    useEffect(() => {
        props.index('workFlows', {
            success: broadcast.FETCHED_WORKFLOWS,
            failed: broadcast.FETCHED_WORKFLOWS_FAILED
        })
    }, [])

    useEffect(() => {
        if (props.workflows.collection.length !== 0) {
            setState({
                ...state,
                workflows: props.workflows.collection
            })
        }
    }, [props.workflows.collection])

    return (
        <>
            <h4 className="mb-3">Workflows</h4>
            <Form onSubmit={handleSubmit} className="mb-4">
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Control 
                                type="text"
                                placeholder="ENTER WORKFLOW NAME"
                                value={state.name}
                                onChange={e => setState({ ...state, name: e.target.value })}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Control 
                                as="select"
                                className="custom-select"
                                value={state.rule}
                                onChange={e => setState({ ...state, rule: e.target.value })}
                            >
                                <option value="">SELECT RULE</option>
                                <option value="sequence">SEQUENCE</option>
                                <option value="broadcast">BROADCAST</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group>
                            <Form.Control 
                                as="select"
                                className="custom-select"
                                value={state.active}
                                onChange={e => setState({ ...state, active: e.target.value })}
                            >
                                <option value="">ACTIVE?</option>
                                <option value="0">NO</option>
                                <option value="1">YES</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={2}>
                        <Button
                            variant="success"
                            type="submit"
                            disabled={state.name === "" || state.rule === "" || state.active === 0}
                        >
                            <FiSend />
                            <span style={{ marginLeft: 20 }}>{state.isUpdating ? 'UPDATE' : 'SUBMIT'}</span>
                        </Button>
                    </Col>
                </Row>
            </Form>

            <Table bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Rule</th>
                        <th>Modify</th>
                    </tr>
                </thead>
                <tbody>
                    {state.workflows && state.workflows.length !== 0 ? state.workflows.map(workflow => (
                        <tr key={workflow.id}>
                            <td>{workflow.name}</td>
                            <td>{workflow.rule.toUpperCase()}</td>
                            <td>
                                <Button
                                    variant="warning"
                                    size="sm"
                                    onClick={() => loadFormData(workflow)}
                                >
                                    <FiEdit2 />
                                </Button>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleDelete(workflow)}
                                >
                                    <FiTrash2 />
                                </Button>
                            </td>
                        </tr>
                    )) : null}
                </tbody>
            </Table>
        </>
    )
}

const mapStateToProps = state => ({
    workflows: state.access.workflows
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
)(WorkFlows)
