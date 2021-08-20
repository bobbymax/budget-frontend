/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Button, Table } from 'react-bootstrap'
import { FiActivity, FiCreditCard, FiEdit3, FiPackage, FiSearch, FiX } from 'react-icons/fi'
import { connect } from 'react-redux'
import { fetch, store, update } from '../../../redux/actions'
import * as broadcast from '../../../redux/accessControl/types'
import { getPaymentType } from '../../../services/helpers/functions'
import { userHasRole } from '../../../services/helpers/access'

const Approvals = (props) => {

    const initialState = {
        batch_code: "",
        batch: null,
        expenditure: null,
        batch_id: 0,
        expenditure_id: 0,
        description: "",
        beneficiary: "",
        amount: 0,
        modification: 0,
        previousTotal: 0,
        grandTotal: 0,
        status: "",
        isUpdating: false,
        showDetails: false
    }

    const [state, setState] = useState(initialState)

    const fetchPaymentBatch = e => {
        e.preventDefault()

        if (state.batch_code !== "") {
            props.fetch('batches', state.batch_code, {
                success: broadcast.FETCHED_BATCH_RECORD,
                failed: broadcast.FETCHED_BATCH_RECORD_FAILED
            })
        }
        setState({
            ...state,
            batch_code: "",
            showDetails: true
        })
    }

    const handleExpenditureUpdate = e => {
        e.preventDefault()

        const data = {
            amount: state.amount
        }

        props.update('batch/expenditures', state.expenditure_id, data, {
            success: broadcast.UPDATED_BATCHED_EXPENDITURE_RECORD,
            failed: broadcast.UPDATED_BATCHED_EXPENDITURE_RECORD_FAILED
        })

        setState({
            ...state,
            expenditure: null,
            expenditure_id: 0,
            description: "",
            beneficiary: "",
            amount: 0,
            isUpdating: false,
            previousTotal: 0,
        })
    }

    const fetchExpenditureSubBudgetHead = batch => {
        return batch.expenditures[0].subBudgetHead.budgetCode
    }

    const fetchExpenditureSubBudgetHeadDesc = batch => {
        return batch.expenditures[0].subBudgetHead.description
    }

    const modifyExpenditure = exp => {
        setState({
            ...state,
            expenditure: exp,
            expenditure_id: exp.id,
            description: exp.description,
            beneficiary: exp.beneficiary,
            amount: exp.amount,
            previousTotal: exp.amount,
            isUpdating: true
        })
    }

    const handlePaymentAction = status => {
        const data = {
            batchId: state.batch_id,
            work_flow: "budget-payment-process",
            level: state.batch.level,
            description: state.description,
            status: status
        }

        props.store('clear/payments', data, {
            success: broadcast.BATCH_PAYMENT_CLEARED,
            failed: broadcast.BATCH_PAYMENT_CLEARED_FAILED
        })

        setState({
            ...state,
            batch_code: "",
            batch: null,
            batch_id: 0,
            modification: 0,
            previousTotal: 0,
            grandTotal: 0,
            status: "",
            isUpdating: false,
            showDetails: false
        })
    }

    useEffect(() => {
        if (props.batch !== null && state.showDetails) {
            setState({
                ...state,
                batch: props.batch,
                batch_id: props.batch.id,
                grandTotal: props.batch.amount
            })
        }
    }, [props.batch, state.showDetails])

    return (
        <>
            <h4 className="mb-4">Approve Payments</h4>
            <Form onSubmit={fetchPaymentBatch}>
                <Row>
                    <div className="header-search">
                        <FiSearch />
                        <Form.Control 
                            type="text"
                            placeholder="ENTER BATCH NUMBER"
                            value={state.batch_code}
                            onChange={e => setState({...state, batch_code: e.target.value})}
                        />
                    </div>
                </Row>
            </Form>

            <div className={'payments-container mt-4'}>
                {state.expenditure !== null && state.isUpdating ? 
                    <Form onSubmit={handleExpenditureUpdate}>
                        <div className="card card-invoice mb-3">
                                <div className="card-header">
                                    <div>
                                        <h5 className="mg-b-3">Expenditure</h5>
                                    </div>
                                    <div className="btn-group-invoice">
                                        <Button
                                            type="button"
                                            variant="white"
                                            size="sm"
                                            className="btn-uppercase"
                                            onClick={() => {
                                                setState({
                                                    ...state,
                                                    expenditure: null,
                                                    expenditure_id: 0,
                                                    description: "",
                                                    beneficiary: "",
                                                    amount: 0,
                                                    isUpdating: false
                                                })
                                            }}
                                        >
                                            <FiX className="mr-2" />
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            variant="success"
                                            size="sm"
                                            className="btn-uppercase"
                                        >
                                            <FiCreditCard className="mr-2" />
                                            Update Expenditure
                                        </Button>
                                    </div>
                                </div>
                            <div className="card-body">
                                <Row className="mb-3">
                                    <Col md={8}>
                                        <Form.Control 
                                            type="text"
                                            placeholder="Enter Expenditure Title"
                                            value={state.beneficiary}
                                            onChange={e => setState({...state, beneficiary: e.target.value})}
                                            readOnly
                                        />
                                    </Col>
                                    <Col md={4}>
                                        <Form.Control 
                                            type="text"
                                            placeholder="Enter Amount"
                                            value={state.amount}
                                            onChange={e => setState({...state, amount: e.target.value})}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Control 
                                            as="textarea"
                                            rows={2}
                                            value={state.description}
                                            onChange={e => setState({...state, description: e.target.value})}
                                            readOnly
                                        />
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Form>
                : null}

                {state.batch && state.showDetails ? 
                    <div className="card card-invoice">
                        <div className="card-header">
                            <div>
                                <h5 className="mg-b-3">{state.batch !== "" ? getPaymentType(state.batch.batch_no) : ""}</h5>
                                <span className="tx-sm text-muted">{ state.batch && state.batch.controller ? `Expenditure raised by ${state.batch.controller.name} on date` : "" }</span>
                            </div>
                            <div className="btn-group-invoice">
                                {state.batch && state.batch.steps === 3 && state.batch.editable === 1 && userHasRole(props.auth, 'audit-officer') ? 
                                    <Button
                                        type="button"
                                        variant="danger"
                                        size="sm"
                                        className="btn-uppercase"
                                        disabled={state.status === "approved" || state.expenditure !== null || state.description === ""}
                                        onClick={() => {
                                            setState({...state, status: "queried"})
                                            handlePaymentAction('queried')
                                        }}
                                    >
                                        <FiActivity className="mr-2" />
                                        Query
                                    </Button>
                                : null }
                                <Button
                                    type="button"
                                    variant="success"
                                    size="sm"
                                    className="btn-uppercase"
                                    disabled={state.status === "queried" || state.expenditure !== null || state.batch.status === "paid"}
                                    onClick={() => {
                                        setState({...state, status: "approved"})
                                        handlePaymentAction('approved')
                                    }}
                                >
                                    <FiPackage className="mr-2" />
                                    {state.batch && state.batch.steps === 4 ? 'Post' : 'Clear'} Payment
                                </Button>
                            </div>
                        </div>
                        <div className="card-body">
                            <Row>
                                <Col sm={6}>
                                    <label className="content-label text-success">Billed From</label>
                                    <h6 className="tx-15 mg-b-10">{ state.batch && state.batch.expenditures ? fetchExpenditureSubBudgetHead(state.batch) : "" }</h6>
                                    <p className="mg-b-0">{ state.batch && state.batch.expenditures ? fetchExpenditureSubBudgetHeadDesc(state.batch) : "" }</p>
                                </Col>
                                <Col sm={6} className="tx-right d-none d-md-block">
                                    <label className="content-label text-secondary">Batch Number</label>
                                    <h2 className="tx-normal tx-gray-400 mg-b-10 tx-spacing--2 text-success">{ state.batch ? state.batch.batch_no : "" }</h2>
                                </Col>
                            </Row>

                            <Table striped bordered responsive className="mg-t-25">
                                <thead>
                                    <tr>
                                        {state.batch && state.batch.editable === 1 && state.batch.steps >= 2 && userHasRole(props.auth, 'treasury-officer') ? 
                                            <th>Modify</th>
                                        : null }
                                        <th className="wd-40p d-none d-sm-table-cell">Description</th>
                                        <th className="tx-center">Beneficiary</th>
                                        <th className="tx-right">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {state.batch && state.batch.expenditures ? state.batch.expenditures.map(exp => {
                                        return (
                                            <tr key={exp.id}>
                                                {state.batch && state.batch.editable === 1 && state.batch.steps >= 2 && userHasRole(props.auth, 'treasury-officer') ? 
                                                    <td>
                                                        <Button
                                                            variant="secondary"
                                                            type="button"
                                                            size="sm"
                                                            onClick={() => modifyExpenditure(exp)}
                                                        >
                                                            <FiEdit3 />
                                                        </Button>
                                                    </td>
                                                : null }
                                                <td>{exp.description}</td>
                                                <td className="tx-center">{exp.beneficiary}</td>
                                                <td className="tx-right">{exp.amount}</td>
                                            </tr>
                                        )
                                    }) : null}
                                </tbody>
                            </Table>


                            <Row className="justify-content-between mg-t-25">

                                <Col sm={6} lg={6} className="order-2 order-sm-0 mg-t-40 mg-sm-t-0">
                                    {state.batch && state.batch.steps === 3 && state.batch.editable === 1 && userHasRole(props.auth, 'audit-officer') ? 
                                        <>
                                            <label className="content-label mg-b-10">Action</label>
                                            <Row>
                                                <Col>
                                                    <Form.Control 
                                                        as="textarea"
                                                        placeholder="Enter Description"
                                                    />
                                                </Col>
                                            </Row>
                                        </>
                                    : null }
                                </Col>


                                <Col sm={6} lg={4} className="order-1 order-sm-0">
                                    <ul className="list-unstyled lh-7 pd-r-10">
                                        {state.expenditure !== null ? 
                                        <>
                                            <li className="d-flex justify-content-between">
                                                <span>Expenditure Amount</span>
                                                <span>NGN { state.previousTotal }</span>
                                            </li>
                                            <li className="d-flex justify-content-between">
                                                <span>Alteration</span>
                                                <span>NGN { state.amount - state.previousTotal }</span>
                                            </li>
                                        </>
                                        : null }
                                        <li className="d-flex justify-content-between">
                                            <strong>TOTAL DUE</strong>
                                            <strong>NGN { state.grandTotal }</strong>
                                        </li>
                                    </ul>
                                </Col>

                            </Row>
                        </div>
                    </div>
                : null}
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    batch: state.budgetting.batches.batch,
    auth: state.access.staff.authenticatedUser
})

const mapDispatchToProps = dispatch => {
    return {
        fetch: (entity, id, broadcast) => dispatch(fetch(entity, id, broadcast)),
        update: (entity, id, body, broadcast) => dispatch(update(entity, id, body, broadcast)),
        store: (entity, body, broadcast) => dispatch(store(entity, body, broadcast))
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(Approvals)
