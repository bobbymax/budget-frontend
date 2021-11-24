/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Table, Button, ButtonGroup } from 'react-bootstrap'
import { FiSearch, FiX, FiLoader } from 'react-icons/fi'
import { connect } from 'react-redux'
import { fetch, index, store } from '../../../redux/actions'
import * as broadcast from '../../../redux/accessControl/types'

const Logistics = (props) => {

    const initialState = {
        code: "",
        batch: null,
        expenditure_id: 0,
        budgetCode: "",
        beneficiary: "",
        sub_budget: "",
        description: "",
        department_id: 0,
        amount: 0,
        activeExp: false
    }

    const [state, setState] = useState(initialState)

    const fetchBatch = e => {
        e.preventDefault()

        props.fetch('batches', state.code, {
            success: broadcast.FETCHED_BATCH_RECORD,
            failed: broadcast.FETCHED_BATCH_RECORD_FAILED
        })

        setState({
            ...state,
            code: ""
        })
    }

    const requestRefund = e => {
        e.preventDefault()

        const data = {
            expenditure_id: state.expenditure_id,
            department_id: state.department_id
        }

        props.store('refunds', data, {
            success: broadcast.CREATED_REFUND_RECORD,
            failed: broadcast.CREATED_REFUND_RECORD_FAILED
        })

        setState({
            ...state,
            expenditure_id: 0,
            budgetCode: "",
            beneficiary: "",
            sub_budget: "",
            description: "",
            amount: 0,
            activeExp: false
        })
    }

    const fillExpenditure = exp => {
        setState({
            ...state,
            expenditure_id: exp.id,
            budgetCode: exp.subBudgetHead.budgetCode,
            beneficiary: exp.beneficiary,
            sub_budget: exp.subBudgetHead.name,
            description: exp.description,
            amount: exp.amount,
            activeExp: true
        })
    }

    useEffect(() => {
        if (props.batch !== null) {
            setState({
                ...state,
                batch: props.batch
            })
        }
    }, [props.batch])

    useEffect(() => {
        props.index('departments', {
            success: broadcast.FETCH_DEPARTMENTS,
            failed: broadcast.FETCH_DEPARTMENTS_FAILED
        })
    }, [])

    return (
        <>
            <h4 className="mb-4">Logistics</h4>

            <Row className="mb-4">
                <Form onSubmit={fetchBatch}>
                    <Row>
                        <Col>
                            <div className="header-search">
                                <FiSearch />
                                <Form.Control 
                                    type="text"
                                    placeholder="ENTER BATCH NUMBER"
                                    value={state.code}
                                    onChange={ e => setState({...state, code: e.target.value })}
                                />
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Row>

            { ! state.activeExp ? 
                <Row className="mb-4">
                    <Col>
                        <Table bordered striped hover>
                            <thead>
                                <tr>
                                    <th>Budget Code</th>
                                    <th>Beneficiary</th>
                                    <th>Description</th>
                                    <th>Amount</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {state.batch && state.batch.expenditures.length !== 0 ? state.batch.expenditures.map(exp => (
                                    <tr key={exp.id}>
                                        <td>{ exp.subBudgetHead.budgetCode }</td>
                                        <td>{ exp.beneficiary }</td>
                                        <td>{ exp.amount }</td>
                                        <td>{ exp.description }</td>
                                        <td>
                                            <Button
                                                variant="success"
                                                size="sm"
                                                onClick={ () => fillExpenditure(exp) }
                                                disabled={exp.refunded !== null}
                                            >
                                                REQUEST REFUND
                                            </Button>
                                        </td>
                                    </tr>
                                )) : <tr><td colSpan="5" className="text-danger">No Data Found!!</td></tr>}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            : null }
            { state.activeExp ? 
                <Form onSubmit={requestRefund}>
                    <Row>
                        <Col md={3}>
                            <Form.Group>
                                <Form.Control 
                                    type="text"
                                    placeholder="BUDGET CODE"
                                    value={state.budgetCode}
                                    onChange={e => setState({...state, budgetCode: e.target.value})}
                                    readOnly
                                />
                            </Form.Group>
                        </Col>
                        <Col md={9}>
                            <Form.Group>
                                <Form.Control 
                                    type="text"
                                    placeholder="BENEFICIARY"
                                    value={state.beneficiary}
                                    onChange={e => setState({...state, beneficiary: e.target.value})}
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
                                    placeholder="SUB BUDGET HEAD"
                                    value={state.sub_budget}
                                    onChange={e => setState({...state, sub_budget: e.target.value})}
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
                                    placeholder="EXPENDITURE DESCRIPTION"
                                    value={state.description}
                                    onChange={e => setState({...state, description: e.target.value})}
                                    readOnly
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={8}>
                            <Form.Group>
                                <Form.Control 
                                    as="select"
                                    className="custom-select"
                                    value={state.department_id}
                                    onChange={e => setState({...state, department_id: e.target.value})}
                                >
                                    <option>SELECT DEPARTMENT</option>
                                    {props.departments && props.departments.length !== 0 ? props.departments.map(dept => (<option key={dept.id} value={dept.id}>{dept.name.toUpperCase()}</option>)) : null}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group>
                                <Form.Control 
                                    type="text"
                                    placeholder="AMOUNT"
                                    value={state.amount}
                                    onChange={e => setState({...state, amount: e.target.value})}
                                    readOnly
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ButtonGroup>
                                <Button
                                    variant="success"
                                    type="submit"
                                    disabled={state.department_id === 0}
                                >
                                    <FiLoader className="mr-2" />
                                    REQUEST REFUND
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => setState({...state, activeExp: false})}
                                >
                                    <FiX className="mr-2" />
                                    CANCEL
                                </Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Form>
            : null }
        </>
    )
}

const mapStateToProps = state => ({
    batch: state.budgetting.batches.batch,
    departments: state.access.departments.collection
})

const mapDispatchToProps = dispatch => {
    return {
        fetch: (entity, id, broadcast) => dispatch(fetch(entity, id, broadcast)),
        index: (entity, broadcast) => dispatch(index(entity, broadcast)),
        store: (entity, data, broadcast) => dispatch(store(entity, data, broadcast))
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(Logistics)
