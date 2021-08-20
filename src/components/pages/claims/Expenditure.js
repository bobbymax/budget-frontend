/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { connect, useSelector } from 'react-redux'
import { fetch, index, store } from '../../../redux/actions'
import * as broadcast from '../../../redux/accessControl/types'

export const Expenditure = (props) => {

    const initialState = {
        claim: null,
        code: "",
        title: "",
        beneficiary: "",
        amount: 0,
        sub_budget_head_id: 0,
        available_balance: 0,
        new_balance: 0,
        budget_code: "",
        claim_id: 0, 
        type: "",
        payment_type: "",
        status: "cleared",
        additional_info: "",
        subBudgetHeads: []
    }

    const [state, setState] = useState(initialState)
    const auth = useSelector(state => state.access.staff.authenticatedUser)

    const handleChange = value => {
        if (value.length === 8) {
            props.fetch('fetch/claims', value, {
                success: broadcast.FETCHED_CLAIM_RECORD,
                failed: broadcast.FETCHED_CLAIM_RECORD_FAILED
            })
        }
    }

    const fetchSubBudgetHead = value => {
        if (value > 0) {
            props.fetch('subBudgetHeads', value, {
                success: broadcast.FETCH_SUB_BUDGET_HEAD_RECORD,
                failed: broadcast.FETCH_SUB_BUDGET_HEAD_RECORD_FAILED
            })
        }
    }

    const handleSubmit = e => {
        e.preventDefault()
        
        const data = {
            payment_type: state.payment_type,
            type: state.payment_type === "staff-payment" ? state.type : "other",
            claim_id: state.claim_id,
            sub_budget_head_id: state.sub_budget_head_id,
            amount: state.amount,
            new_balance: state.new_balance,
            beneficiary: state.beneficiary,
            description: state.title,
            status: state.status,
            additional_info: state.additional_info
        }

        props.store('expenditures', data, {
            success: broadcast.CREATED_EXPENDITURE_RECORD,
            failed: broadcast.CREATED_EXPENDITURE_RECORD_FAILED
        })

        setState({
            ...state,
            claim: null,
            code: "",
            title: "",
            beneficiary: "",
            amount: 0,
            new_balance: 0,
            available_balance: 0,
            sub_budget_head_id: 0,
            claim_id: 0, 
            payment_type: "",
            type: "",
            status: "cleared",
            additional_info: ""
        })
    }

    useEffect(() => {
        props.index('subBudgetHeads', {
            success: broadcast.FETCH_SUB_BUDGET_HEADS,
            failed: broadcast.FETCH_SUB_BUDGET_HEADS_FAILED
        })
    }, [])

    useEffect(() => {
        if (props.claim) {
            setState({
                ...state,
                claim: props.claim,
                title: props.claim.title,
                beneficiary: props.claim.owner.name.toUpperCase(),
                amount: props.claim.total_amount,
                claim_id: props.claim.id
            })
        }
    }, [props.claim])

    useEffect(() => {
        if (props.subBudgetHeads) {
            setState({
                ...state,
                subBudgetHeads: props.subBudgetHeads.collection
            })
        }
    }, [props.subBudgetHeads])

    useEffect(() => {

        if (props.subBudgetHeads.subBudgetHead !== null && state.sub_budget_head_id > 0) {
            const subBudgetHead = props.subBudgetHeads.subBudgetHead
            setState({
                ...state,
                budget_code: subBudgetHead.budgetCode,
                available_balance: subBudgetHead.fund ? subBudgetHead.fund.actual_balance : 0,
            })
        } else {
            setState({
                ...state,
                budget_code: "",
                available_balance: 0,
            })
        }

    }, [props.subBudgetHeads.subBudgetHead, state.sub_budget_head_id])

    useEffect(() => {

        if (state.available_balance > 0 && state.amount > 0) {
            const value = parseFloat(state.available_balance) - parseFloat(state.amount)

            setState({
                ...state,
                new_balance: value
            })
        }

    }, [state.available_balance, state.amount])

    return (
        <>
            <h4  className="content-title content-title-xs mb-5">New Expenditure</h4>

            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Control
                                as="select"
                                className="custom-select"
                                value={state.payment_type}
                                onChange={e => setState({ ...state, payment_type: e.target.value })}
                            >
                                <option value="">SELECT PAYMENT TYPE</option>
                                <option value="staff-payment">STAFF PAYMENT</option>
                                <option value="third-party">THIRD PARTY</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Control
                                as="select"
                                className="custom-select"
                                value={state.type}
                                onChange={e => setState({ ...state, type: e.target.value })}
                                disabled={state.payment_type === "third-party"}
                            >
                                <option value="">STAFF PAYMENT TYPE</option>
                                <option value="staff-claim">STAFF CLAIM</option>
                                <option value="touring-advance">TOURING ADVANCE</option>
                                <option value="other">OTHER</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Control 
                                type="text"
                                placeholder="Enter Claim ID"
                                value={state.code}
                                onChange={e => {
                                    setState({ ...state, code: e.target.value })
                                    handleChange(e.target.value)
                                }}
                                readOnly={state.payment_type === "third-party"}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Control
                                as="select"
                                className="custom-select"
                                value={state.sub_budget_head_id}
                                onChange={e => {
                                    setState({ ...state, sub_budget_head_id: e.target.value })
                                    fetchSubBudgetHead(e.target.value)
                                }}
                            >
                                <option value="0">SELECT SUB BUDGET HEAD</option>
                                {state.subBudgetHeads.length !== 0 ? state.subBudgetHeads.map(subBudgetHead => {
                                    if (auth && auth.department.id === subBudgetHead.department_id) {
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
                            <Form.Control 
                                type="text"
                                placeholder="BUDGET CODE"
                                value={state.budget_code}
                                onChange={e => setState({ ...state, budget_code: e.target.value })}
                                readOnly
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Control 
                                type="text"
                                placeholder="AVAILABLE BALANCE"
                                value={state.available_balance}
                                onChange={e => setState({ ...state, available_balance: e.target.value })}
                                readOnly
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Control 
                                type="text"
                                placeholder="AMOUNT"
                                value={state.amount}
                                onChange={e => setState({ ...state, amount: e.target.value })}
                                readOnly={state.payment_type === "staff-payment"}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Control 
                                type="text"
                                placeholder="NEW BALANCE"
                                value={state.new_balance}
                                onChange={e => setState({...state, new_balance: e.target.value})}
                                readOnly
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Control 
                                type="text"
                                placeholder="BENEFICIARY"
                                value={state.beneficiary}
                                onChange={e => setState({...state, beneficiary: e.target.value})}
                                readOnly={state.payment_type === "staff-payment"}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <textarea
                                className="form-control"
                                placeholder="DESCRIPTION"
                                value={state.title}
                                onChange={e => setState({...state, title: e.target.value})}
                                readOnly={state.payment_type === "staff-payment"}
                            >
                            </textarea>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Control 
                                type="text"
                                placeholder="ADDITIONAL INFO"
                                value={state.additional_info}
                                onChange={e => setState({...state, additional_info: e.target.value})}
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
                            CREATE EXPENDITURE
                        </Button>
                        <Button
                            variant="danger"
                        >
                            CANCEL
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

const mapStateToProps = (state) => ({
    claim: state.payments.claims.claim,
    subBudgetHeads: state.budgetting.subBudgetHeads
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
)(Expenditure)
