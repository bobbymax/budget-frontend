/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row, Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import { index, fetch, update } from '../../../redux/actions'
import * as broadcast from '../../../redux/accessControl/types'

const RefundRequests = props => {

    const initialState = {
        id: 0,
        subBudgetHeadId: 0,
        exp_id: 0,
        description: "",
        sub_budget_head_id: 0,
        subBudgetHeadName: "",
        budgetCode: "",
        amount: 0,
        balance: 0,
        newBalance: 0,
        status: "",
        showForm: false
    }

    const [state, setState] = useState(initialState)

    const loadRefundDetails = data => {
        setState({
            ...state,
            id: data.id,
            exp_id: data.expenditure.id,
            sub_budget_head_id: data.expenditure.subBudgetHead.id,
            subBudgetHeadName: data.expenditure.subBudgetHead.name,
            budgetCode: data.expenditure.subBudgetHead.budgetCode,
            amount: data.expenditure.amount,
            showForm: true
        })
    }

    const fetchSubBudgetHead = value => {
        if (value > 0) {
            props.fetch('subBudgetHeads', value, {
                success: broadcast.FETCH_SUB_BUDGET_HEAD_RECORD,
                failed: broadcast.FETCH_SUB_BUDGET_HEAD_RECORD_FAILED
            })
        }
    }

    const calcNewBalance = bal => {
        return bal - state.amount
    }

    const handleSubmit = e => {
        e.preventDefault()

        const data = {
            oldSubBudgetHead: state.sub_budget_head_id,
            sub_budget_head_id: state.subBudgetHeadId,
            description: state.description,
            amount: state.amount,
            status: "approved"
        }

        props.update('refunds', state.id, data, {
            success: broadcast.UPDATED_REFUND_RECORD,
            failed: broadcast.UPDATED_REFUND_RECORD_FAILED
        })

        setState({
            ...state,
            id: 0,
            subBudgetHeadId: 0,
            exp_id: 0,
            description: "",
            sub_budget_head_id: 0,
            subBudgetHeadName: "",
            budgetCode: "",
            amount: 0,
            balance: 0,
            newBalance: 0,
            status: "",
            showForm: false
        })
    }

    useEffect(() => {
        props.index('refunds', {
            success: broadcast.FETCHED_REFUNDS,
            failed: broadcast.FETCHED_REFUNDS_FAILED
        })
    }, [])

    useEffect(() => {
        props.index('subBudgetHeads', {
            success: broadcast.FETCH_SUB_BUDGET_HEADS,
            failed: broadcast.FETCH_SUB_BUDGET_HEADS_FAILED
        })
    }, [])

    useEffect(() => {
        if (props.subBudgetHead) {
            setState({
                ...state,
                balance: props.subBudgetHead.fund.actual_balance,
                newBalance: calcNewBalance(props.subBudgetHead.fund.actual_balance)
            })
        }
    }, [props.subBudgetHead])

    return (
        <>
            <h4 className="mb-4">Refund Requests</h4>

            {state.showForm ? 
                <Form className="mb-4" onSubmit={handleSubmit}>
                    <Row>
                        <Col md={8}>
                            <Form.Group>
                                <Form.Control 
                                    type="text"
                                    value={state.subBudgetHeadName}
                                    onChange={e => setState({...state, subBudgetHeadName: e.target.value})}
                                    readOnly
                                />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group>
                                <Form.Control 
                                    type="text"
                                    value={state.budgetCode}
                                    onChange={e => setState({...state, budgetCode: e.target.value})}
                                    readOnly
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Form.Group>
                                <Form.Control 
                                    type="text"
                                    value={state.amount}
                                    onChange={e => setState({...state, amount: e.target.value})}
                                    readOnly
                                />
                            </Form.Group>
                        </Col>
                        <Col md={8}>
                            <Form.Group>
                                <Form.Control 
                                    as="select"
                                    className="custom-select"
                                    value={state.subBudgetHeadId}
                                    onChange={e => {
                                        setState({...state, subBudgetHeadId: e.target.value})
                                        fetchSubBudgetHead(e.target.value)
                                    }}
                                >
                                    <option>Select Sub Budget Head</option>
                                    {props.subBudgetHeads && props.subBudgetHeads.length !== 0 ? props.subBudgetHeads.map(subBudgetHead => {
                                        if (props.auth && props.auth.department.id === subBudgetHead.department_id && state.sub_budget_head_id !== subBudgetHead.id) {
                                            return (
                                                <option key={subBudgetHead.id} value={subBudgetHead.id}>{subBudgetHead.name}</option>
                                            )
                                        } else {
                                            return null
                                        }
                                    }) : null}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>AVAILABLE BALANCE</Form.Label>
                                <Form.Control 
                                    type="text"
                                    placeholder="AVAILABLE BALANCE"
                                    value={state.balance}
                                    onChange={e => setState({...state, balance: e.target.value})}
                                    readOnly
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>NEW BALANCE</Form.Label>
                                <Form.Control 
                                    type="text"
                                    placeholder="NEW BALANCE"
                                    value={state.newBalance}
                                    onChange={e => setState({...state, newBalance: e.target.value})}
                                    readOnly
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Control 
                                    as="textarea"
                                    rows="8"
                                    placeholder="ENTER DESCRIPTION"
                                    value={state.description}
                                    onChange={e => setState({...state, description: e.target.value})}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button
                                type="submit"
                                variant="success"
                                size="sm"
                                disabled={state.description === "" || state.subBudgetHeadId === 0}
                            >
                                APPROVE REFUND
                            </Button>
                        </Col>
                    </Row>
                </Form>
            : null}

            <Table striped hover bordered>
                <thead>
                    <tr>
                        <th>BUDGET NAME</th>
                        <th>BENEFICIARY</th>
                        <th>DESCRIPTION</th>
                        <th>AMOUNT</th>
                        <th>DATE REQUESTED</th>
                        <th>DATE REFUNDED</th>
                        <th>MODIFY</th>
                    </tr>
                </thead>
                <tbody>
                    {props.refunds && props.refunds.length !== 0 ? props.refunds.map(refund => {
                        if (props.auth && props.auth.department.id === refund.department_id) {
                            return (
                                <tr key={refund.id}>
                                    <td>{refund.expenditure.subBudgetHead.name}</td>
                                    <td>{refund.expenditure.beneficiary}</td>
                                    <td>{refund.expenditure.description}</td>
                                    <td>{refund.expenditure.amount}</td>
                                    <td>{refund.created_at}</td>
                                    <td>{refund.closed === 0 ? 'Not Refunded' : refund.updated_at}</td>
                                    <td>
                                        <Button
                                            variant="success"
                                            size="sm"
                                            onClick={() => loadRefundDetails(refund)}
                                            disabled={refund.closed === 1}
                                        >
                                            {refund.closed === 1 ? 'REFUNDED' : 'LOAD REQUEST'}
                                        </Button>
                                    </td>
                                </tr>
                            )
                        } else {
                            return null
                        }
                    }) : null}
                </tbody>
            </Table>
        </>
    )
}

const mapStateToProps = state => ({
    refunds: state.payments.refunds.collection,
    auth: state.access.staff.authenticatedUser,
    subBudgetHeads: state.budgetting.subBudgetHeads.collection,
    subBudgetHead: state.budgetting.subBudgetHeads.subBudgetHead
})

const mapDispatchToProps = dispatch => {
    return {
        index: (entity, broadcast) => dispatch(index(entity, broadcast)),
        fetch: (entity, id, broadcast) => dispatch(fetch(entity, id, broadcast)),
        update: (entity, id, data, broadcast) => dispatch(update(entity, id, data, broadcast))
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(RefundRequests)
