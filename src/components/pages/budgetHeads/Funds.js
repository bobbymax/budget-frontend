/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Col, Row, Button, Form, ButtonGroup } from 'react-bootstrap'
import { FiPlusSquare, FiSend, FiX } from 'react-icons/fi'
import { connect } from 'react-redux'
import { fetch, index, store, update } from '../../../redux/actions'
import * as broadcast from '../../../redux/accessControl/types'
import { Grid } from '@material-ui/core'
import TableComponent from '../../../widgets/components/TableComponent'

const Funds = (props) => {

    const initialState = {
        id: 0,
        sub_budget_id: 0,
        approved_amount: 0,
        available_balance: 0,
        description: "",
        subBudgetHeads: [],
        showForm: false,
        isUpdating: false,
        name: "",
        previousAmount: 0
    }

    const [state, setState] = useState(initialState)

    const columns = [
        {
            name: 'Budget Code',
            label: 'budgetCode'
        },
        {
            name: 'Sub Budget Head',
            label: 'sub_budget_head_name'
        },
        {
            name: 'Department',
            label: 'department'
        },
        {
            name: 'Approved Amount',
            label: 'approved_amount'
        }
    ]

    const populateFields = data => {
        setState({
            ...state,
            id: data.id,
            sub_budget_id: data.subBudgetHead.id,
            approved_amount: data.approved_amount,
            previousAmount: data.approved_amount,
            available_balance: data.actual_balance,
            description: data.description,
            showForm: true,
            isUpdating: true,
            name: data.subBudgetHead.name
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        const data = {
            sub_budget_head_id: state.sub_budget_id,
            description: state.description,
            approved_amount: state.approved_amount
        }

        if (state.isUpdating) {
            props.update('creditBudgetHeads', state.id, data, {
                success: broadcast.UPDATED_FUND_RECORD,
                failed: broadcast.UPDATED_FUND_RECORD_FAILED
            })
        } else {
            props.store('creditBudgetHeads', data, {
                success: broadcast.CREATED_FUND_RECORD,
                failed: broadcast.CREATED_FUND_RECORD_FAILED
            })
        }

        setState({
            ...state,
            id: 0,
            sub_budget_id: 0,
            approved_amount: 0,
            available_balance: 0,
            description: "",
            showForm: false,
            isUpdating: false
        })
    }

    const fetchSubBudgetHead = id => {
        if (id > 0) {
            props.fetch('subBudgetHeads', id, {
                success: broadcast.FETCH_SUB_BUDGET_HEAD_RECORD,
                failed: broadcast.FETCH_SUB_BUDGET_HEAD_RECORD_FAILED
            })
        }
    }

    useEffect(() => {
        if (props.subBudgetHeads.length !== 0) {
            setState({
                ...state,
                subBudgetHeads: props.subBudgetHeads
            })
        }
    }, [props.subBudgetHeads])

    useEffect(() => {
        props.index('creditBudgetHeads', {
            success: broadcast.FETCHED_FUNDS,
            failed: broadcast.FETCHED_FUNDS_FAILED
        })
    }, [])

    useEffect(() => {
        props.index('subBudgetHeads', {
            success: broadcast.FETCH_SUB_BUDGET_HEADS,
            failed: broadcast.FETCH_SUB_BUDGET_HEADS_FAILED
        })
    }, [])

    useEffect(() => {
        if (props.subBudgetHead !== null && state.sub_budget_id > 0) {
            setState({
                ...state,
                sub_budget_id: props.subBudgetHead.id,
                approved_amount: props.subBudgetHead.fund !== null ? props.subBudgetHead.fund.approved_amount : 0,
                available_balance: props.subBudgetHead.fund !== null ? props.subBudgetHead.fund.actual_balance : 0,
                description: props.subBudgetHead.description,
                showForm: true
            })
        }
    }, [props.subBudgetHead])



    return (
        <>
            <h4>Funds</h4>
            <Button
                size="sm"
                variant="success"
                className="mb-4"
                disabled={state.showForm}
                onClick={() => setState({...state, showForm: true})}
            >
                <FiPlusSquare className="mr-3" />
                {'Credit Sub Budget Head'.toLocaleUpperCase()}
            </Button>

            {state.showForm ? 

                <Form className="mb-4" onSubmit={handleSubmit}>
                    <>
                        <Row>
                            <Col>
                                <Form.Group>
                                    {state.isUpdating ? 
                                        <Form.Control 
                                            type="text"
                                            value={state.name}
                                            onChange={e => setState({...state, name: e.target.value})}
                                            readOnly
                                        />
                                    : 
                                    <Form.Control
                                        as="select"
                                        className="custom-select"
                                        value={state.sub_budget_id}
                                        onChange={e => {
                                            setState({...state, sub_budget_id: e.target.value})
                                            fetchSubBudgetHead(e.target.value)
                                        }}
                                    >
                                        <option value="0">SELECT SUB BUDGET HEAD</option>
                                        {state.subBudgetHeads.length !== 0 ? state.subBudgetHeads.map(sub => {
                                            if (sub.fund === null && ! state.isUpdating) {
                                                return <option key={sub.id} value={sub.id}>{sub.name}</option>
                                            } else {
                                                return null
                                            }
                                        }) : null}
                                    </Form.Control>
                                    }
                                </Form.Group>
                            </Col>
                        </Row>
                        {state.sub_budget_id > 0 ? 
                            <>
                                <Row>
                                    <Col>
                                        <Form.Group>
                                            <Form.Control
                                                as="textarea"
                                                placeholder="ENTER DESCRIPTION HERE"
                                                rows={5}
                                                value={state.description}
                                                onChange={e => setState({...state, description: e.target.value})}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group>
                                            <Form.Control
                                                type="number"
                                                placeholder="ENTER AMOUNT"
                                                value={state.approved_amount}
                                                onChange={e => setState({...state, approved_amount: e.target.value})}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Control
                                                type="text"
                                                placeholder="AVAILABLE BALANCE"
                                                value={state.available_balance}
                                                onChange={e => setState({...state, available_balance: e.target.value})}
                                                readOnly
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </>
                        : null }
                        <Row>
                            <Col>
                                <ButtonGroup>
                                    <Button
                                        type="submit"
                                        variant="success"
                                        disabled={state.description === "" || state.approved_amount === 0 || state.approved_amount === state.previousAmount}
                                    >
                                        <FiSend className="mr-2" />
                                        SUBMIT
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="danger"
                                        onClick={() => {
                                            setState({
                                                ...state,
                                                id: 0,
                                                sub_budget_id: 0,
                                                approved_amount: 0,
                                                available_balance: 0,
                                                description: "",
                                                showForm: false,
                                                isUpdating: false
                                            })
                                        }}
                                    >
                                        <FiX className="mr-2" />
                                        CANCEL
                                    </Button>
                                </ButtonGroup>
                            </Col>
                        </Row>
                    </>
                </Form>

            : null }
            
            <Grid container spacing={3}>
                <Grid item md={12}>
                    <TableComponent 
                        columns={columns}
                        rows={props.funds}
                        callToAction={populateFields}
                        callToDelete={() => console.log('here')}
                    />
                </Grid>
            </Grid>
        </>
    )
}

const mapStateToProps = state => ({
    funds: state.budgetting.funds.collection,
    subBudgetHeads: state.budgetting.subBudgetHeads.collection,
    subBudgetHead: state.budgetting.subBudgetHeads.subBudgetHead
})

const mapDispatchToProps = dispatch => {
    return {
        index: (entity, broadcast) => dispatch(index(entity, broadcast)),
        fetch: (entity, id, broadcast) => dispatch(fetch(entity, id, broadcast)),
        store: (entity, data, broadcast) => dispatch(store(entity, data, broadcast)),
        update: (entity, id, data, broadcast) => dispatch(update(entity, id, data, broadcast))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Funds)
