/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row, Table } from 'react-bootstrap'
import { connect, useSelector } from 'react-redux'
import { fetch, index, store } from '../../../redux/actions'
import * as broadcast from '../../../redux/accessControl/types'
import { FiEye } from 'react-icons/fi'
import { formatDate } from '../../../services/helpers/functions'

const BudgetClear = (props) => {

    const initialState = {
        id: 0,
        sub_budget_head_id: 0,
        claim: null,
        code: "",
        cleared: false,
        details: false
    }

    const [state, setState] = useState(initialState)
    const auth = useSelector(state => state.access.staff.authenticatedUser)

    const handleSubmit = e => {
        e.preventDefault()

        props.fetch('fetch/claims', state.code, {
            success: broadcast.FETCHED_CLAIM_RECORD,
            failed: broadcast.FETCHED_CLAIM_RECORD_FAILED
        })

        setState({
            ...state,
            code: ""
        })
    }

    const budgetClear = e => {
        e.preventDefault()

        const data = {
            claim_id: state.id,
            sub_budget_head_id: state.sub_budget_head_id
        }

        props.store('budget/clear', data, {
            success: broadcast.CLAIM_BUDGET_CLEARED,
            failed: broadcast.CLAIM_BUDGET_CLEARED_FAILED
        })

        setState({
            ...state,
            id: 0,
            sub_budget_head_id: 0,
            details: false,
            claim: null
        })
    }

    useEffect(() => {
        if (props.claim) {
            setState({
                ...state,
                id: props.claim.id,
                claim: props.claim,
            })
        }
    }, [props.claim])

    useEffect(() => {
        props.index('subBudgetHeads', {
            success: broadcast.FETCH_SUB_BUDGET_HEADS,
            failed: broadcast.FETCH_SUB_BUDGET_HEADS_FAILED
        })
    }, [])

    return (
        <>
            <h1 className="mb-5">Budget Clear</h1>

            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Control 
                                type="text"
                                placeholder="Enter Claim Reference Code"
                                className="form-control-lg"
                                value={state.code}
                                onChange={e => setState({...state, code: e.target.value})}
                            />
                        </Form.Group>

                        <Button
                            type="submit"
                            variant="success"
                            className="btn-lg mt-4"
                        >
                            FETCH CLAIM
                        </Button>
                    </Col>
                </Row>
            </Form>

            {state.claim ? 
                <div className="card form-portal-card mt-5 mb-5">
                    <Table striped hover>
                        <thead>
                            <tr>
                                <th>Ref. No.</th>
                                <th>Title</th>
                                <th>Amount</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.claim && state.claim.status === 'registered' ? 
                                <tr>
                                    <td>{state.claim.reference_no.toUpperCase()}</td>
                                    <td>{state.claim.title}</td>
                                    <td>{state.claim.total_amount}</td>
                                    <td>
                                        <Button
                                            variant="primary"
                                            className="btn-sm"
                                            onClick={() => setState({...state, details: true})}
                                        >
                                            <FiEye />
                                        </Button>
                                    </td>
                                </tr>
                            : null}
                        </tbody>
                    </Table>
                    {state.details ? 
                    <div className="mt-3">
                        <Form className="mb-5" onSubmit={budgetClear}>
                            <Form.Group>
                                <Form.Control
                                    as="select"
                                    value={state.sub_budget_head_id}
                                    onChange={e => setState({...state, sub_budget_head_id: e.target.value})}
                                >
                                    <option value="0">Select Sub Budget Head</option>
                                    {props.subBudgetHeads && props.subBudgetHeads.length !== 0 ? props.subBudgetHeads.map(subBudgetHead => {
                                        if (auth.department.id === subBudgetHead.department_id) {
                                            return (
                                                <option key={subBudgetHead.id} value={subBudgetHead.id}>{subBudgetHead.name}</option>
                                            )
                                        } else {
                                            return null
                                        }
                                    })
                                    : null}
                                </Form.Control>
                            </Form.Group>
                            <Button
                                variant="success"
                                className="mt-3"
                                style={{ marginRight: 5 }}
                                type="submit"
                            >
                                Clear Expenditure
                            </Button>
                            <Button
                                variant="danger"
                                className="mt-3"
                                onClick={() => setState({...state, details: false})}
                            >
                                Close
                            </Button>
                        </Form>
                        <Table striped hover>
                            <thead>
                                <tr>
                                    <th>From</th>
                                    <th>to</th>
                                    <th>Description</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {state.claim && state.claim.instructions.length !== 0 ? state.claim.instructions.map(instruction => (
                                    <tr key={instruction.id}>
                                        <td>{formatDate(instruction.from)}</td>
                                        <td>{formatDate(instruction.to)}</td>
                                        <td>{instruction.description}</td>
                                        <td>{instruction.amount}</td>
                                    </tr>
                                )) : null}
                            </tbody>
                        </Table>
                    </div>
                    : null }
                </div>
            : null }
        </>
    )
}

const mapStateToProps = state => ({
    claim: state.payments.claims.claim,
    subBudgetHeads: state.budgetting.subBudgetHeads.collection
})

const mapDispatchToProps = dispatch => {
    return {
        index: (entity, broadcast) => dispatch(index(entity, broadcast)),
        fetch: (entity, id, broadcast) => dispatch(fetch(entity, id, broadcast)),
        store: (entity, body, broadcast) => dispatch(store(entity, body, broadcast))
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(BudgetClear)
