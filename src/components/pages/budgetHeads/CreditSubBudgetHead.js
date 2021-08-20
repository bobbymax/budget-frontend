/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Col, Container, Row, Button } from 'react-bootstrap'
import * as broadcast from '../../../redux/accessControl/types'
import { index, fetch, store, update} from '../../../redux/actions'
import { FiSend } from 'react-icons/fi'

const CreditSubBudgetHead = (props) => {

    const initialState = {
        id: 0,
        sub_budget_head_id: 0,
        description: "",
        approved_amount: 0,
        available_balance: 0
    }

    const budget = props.subBudgetHeads.subBudgetHead
    const [state, setState] = useState(initialState)

    const handleUpdate = e => {
        e.preventDefault()

        const data = {
            sub_budget_head_id: state.sub_budget_head_id,
            description: state.description,
            approved_amount: state.approved_amount
        }

        if (state.id > 0) {
            props.update('creditBudgetHeads', state.id, data, {
                success: broadcast.ADD_FUND_TO_SUB_BUDGET_HEAD,
                failed: broadcast.ADD_FUND_TO_SUB_BUDGET_HEAD_FAILED
            })
        } else {
            props.store('creditBudgetHeads', data, {
                success: broadcast.CREDIT_SUB_BUDGET_HEAD,
                failed: broadcast.CREDIT_SUB_BUDGET_HEAD_FAILED
            })
        }

        setState({
            ...state,
            id: 0,
            sub_budget_head_id: 0,
            description: "",
            approved_amount: 0,
            available_balance: 0
        })

        props.history.push('/sub-budget-heads')
    }


    const handleChange = (value) => {

        if (value > 0) {
            props.fetch('subBudgetHeads', value, {
                success: broadcast.FETCH_SUB_BUDGET_HEAD_RECORD,
                failed: broadcast.FETCH_SUB_BUDGET_HEAD_RECORD_FAILED
            })
        } else {
            console.log('nothing')
        }
    }


    useEffect(() => {
        props.index('subBudgetHeads', {
            success: broadcast.FETCH_SUB_BUDGET_HEADS,
            failed: broadcast.FETCH_SUB_BUDGET_HEADS_FAILED
        })
    }, [])

    useEffect(() => {
        if (budget !== null && state.sub_budget_head_id > 0) {
            if (budget.fund !== null) {
                setState({
                    ...state,
                    id: budget.fund.id,
                    sub_budget_head_id: budget.id,
                    description: budget.fund.description,
                    available_balance: budget.fund.actual_balance
                })
            } else {
                setState({
                    ...state,
                    id: 0,
                    sub_budget_head_id: budget.id,
                    description: "",
                    available_balance: 0
                })
            }
        }
    }, [budget])

    return (
        <>
            <h1 className="mb-5">Credit Sub Budget Head</h1>

            <form onSubmit={handleUpdate}>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col md={12} className="mb-5">
                            <div className="form-group">
                                <label htmlFor="subBudgetHead" className="mb-3">Sub Budget Head</label>
                                <select
                                    name="sub_buget_id"
                                    className="form-control form-control-lg"
                                    id="subBudgetHead"
                                    value={state.sub_budget_head_id}
                                    onChange={e => {
                                        setState({...state, sub_budget_head_id: e.target.value})
                                        handleChange(e.target.value)
                                    }}
                                >
                                    <option value="0">Select Sub Budget Head</option>
                                    {props.subBudgetHeads.collection.length !== 0 ? props.subBudgetHeads.collection.map(subBudgetHead => (<option key={subBudgetHead.id} value={subBudgetHead.id}>{subBudgetHead.name}</option>)) : null}
                                </select>
                            </div>
                        </Col>

                        {state.sub_budget_head_id > 0 ? 
                            (<><Col md={12} className="mb-3">
                                <div className="form-group">
                                    <label htmlFor="description" className="mb-3">Description</label>
                                    <textarea
                                        className="form-control"
                                        id="description"
                                        name="description"
                                        placeholder="Enter description here"
                                        value={state.description}
                                        onChange={(e) => setState({...state, description: e.target.value})}
                                    ></textarea>
                                </div>
                            </Col>

                            <Col md={6} className="md-5">
                                <div className="form-group">
                                    <label htmlFor="approvedAmount" className="mb-3">Amount</label>
                                    <input
                                        type="number"
                                        name="approved_amount"
                                        id="approvedAmount"
                                        placeholder="0"
                                        className="form-control"
                                        value={state.approved_amount}
                                        onChange={(e) => setState({...state, approved_amount: e.target.value})}
                                    />
                                </div>
                            </Col>
                            <Col md={6} className="md-5">
                                <div className="form-group">
                                    <label htmlFor="approvedAmount" className="mb-3">Available Balance</label>
                                    <input
                                        type="text"
                                        name="approved_amount"
                                        id="approvedAmount"
                                        placeholder="0" 
                                        className="form-control"
                                        value={state.available_balance}
                                        onChange={(e) => setState({...state, available_balance: e.target.value})}
                                        readOnly
                                    />
                                </div>
                            </Col></>)

                        : null}
                    </Row>
                    {state.sub_budget_head_id > 0 ? 
                        <Row className="mt-5">
                            <Col md={4}>
                                <Button
                                    variant="success"
                                    type="submit"
                                >
                                    <FiSend style={{ marginRight: 10 }} />
                                    Fund Sub Budget
                                </Button>
                            </Col>
                        </Row>
                    : null }
                </Container>
            </form>
        </>
    )
}

const mapStateToProps = state => {
    return {
        subBudgetHeads: state.budgetting.subBudgetHeads
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetch: (entity, id, broadcast) => dispatch(fetch(entity, id, broadcast)),
        index: (entity, broadcast) => dispatch(index(entity, broadcast)),
        store: (entity, data, broadcast) => dispatch(store(entity, data, broadcast)),
        update: (entity, id, data, broadcast) => dispatch(update(entity, id, data, broadcast))
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(CreditSubBudgetHead)
