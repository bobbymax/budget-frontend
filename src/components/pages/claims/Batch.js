/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { connect, useSelector } from 'react-redux'
import {index, store} from '../../../redux/actions'
import * as broadcast from '../../../redux/accessControl/types'
import { Table, Row, Col, Button } from 'react-bootstrap'
import { uniqueNumberGenerator } from '../../../services/helpers/functions'
import ExpenditureCard from '../../widgets/ExpenditureCard'
import "../../../assets/js/canvas"
import BatchCard from '../../widgets/BatchCard'

const Batch = (props) => {

    const initialState = {
        expenditures: [],
        board: [],
        boardType: "",
        maxSlot: 0,
        code: "",
        total: 0,
        len: 0,
        canvas: false,
        buttonDisabled: false,
        sub_budget_head_id: 0
    }

    const [state, setState] = useState(initialState)
    const grandTotal = state.board.length !== 0 ? state.board.reduce((sum, expenditure) => sum + parseFloat(expenditure.amount), 0) : 0
    const auth = useSelector(state => state.access.staff.authenticatedUser)
    const boardLength = state.board.length

    const batchClaim = expenditure => {
        const batch = state.expenditures.filter(batch => expenditure.id === batch.id)

        const maxSlots = {
            staffPayment: 6,
            thirdParty: 1
        }

        if (expenditure.payment_type === "third-party" && state.board.length < maxSlots.thirdParty) {
            setState({
                ...state,
                expenditures: state.expenditures.filter(batch => expenditure.id !== batch.id),
                board: [...state.board, batch[0]],
                buttonDisabled: ! state.buttonDisabled,
                boardType: expenditure.payment_type,
                maxSlot: maxSlots.thirdParty
            })
        } else if (expenditure.payment_type === "staff-payment" && state.board.length <= maxSlots.staffPayment) {
            if (boardLength >= 1 && expenditure.subBudgetHead.id === state.sub_budget_head_id) {
                setState({
                    ...state,
                    expenditures: state.expenditures.filter(batch => expenditure.id !== batch.id),
                    board: [...state.board, batch[0]],
                    buttonDisabled: true,
                    boardType: expenditure.payment_type,
                    maxSlot: maxSlots.staffPayment
                })
            } else {
                setState({
                    ...state,
                    expenditures: state.expenditures.filter(batch => expenditure.id !== batch.id),
                    board: [...state.board, batch[0]],
                    buttonDisabled: true,
                    boardType: expenditure.payment_type,
                    maxSlot: maxSlots.staffPayment
                })
            }
        } else {
            setState({
                ...state,
                buttonDisabled: ! state.buttonDisabled
            })
        }
    }

    const grandPrettyTotal = (num) => {
        return `NGN ${new Intl.NumberFormat().format(num)}`
    }

    const handleBatcher = () => {

        const data = {
            batch_no: state.code,
            expenditures: state.board,
            noOfClaim: state.board.length,
            subBudgetHeadCode: state.board[0].subBudgetHead.budgetCode,
            amount: state.total,
            steps: 1
        }

        props.store('batches', data, {
            success: broadcast.BATCHED_EXPENDITURES,
            failed: broadcast.BATCHED_EXPENDITURES_FAILED
        })

        setState({
            ...state,
            board: [],
            boardType: "",
            maxSlot: 0,
            code: "",
            total: 0,
            buttonDisabled: false
        })

        props.history.push('/payments')
    }

    const handleDelete = expenditure => {
        if (state.board.length !== 0) {
            const claimChoosen = state.board.filter(b => expenditure.id === b.id)
            const boardState = state.board.filter(b => expenditure.id !== b.id)

            if (boardState.length > 0) {
                setState({
                    ...state,
                    board: boardState,
                    expenditures: [...state.expenditures, claimChoosen[0]],
                    buttonDisabled: state.boardType !== "" ? true : false
                })
            } else {
                setState({
                    ...state,
                    board: boardState,
                    boardType: "",
                    expenditures: [...state.expenditures, claimChoosen[0]],
                    buttonDisabled: false
                })
            }
        }
    }


    useEffect(() => {
        props.index('expenditures', {
            success: broadcast.FETCHED_EXPENDITURES,
            failed: broadcast.FETCHED_EXPENDITURES_FAILED
        })
    }, [])

    useEffect(() => {
        if (boardLength === 1) {
            setState({
                ...state,
                sub_budget_head_id: state.board[0].subBudgetHead.id
            })
        }
    }, [boardLength])

    useEffect(() => {
        setState({
           ...state,
           total: grandTotal 
        })
    }, [grandTotal])

    useEffect(() => {
        if (props.expenditures && props.expenditures.collection.length !== 0) {
            setState({
                ...state,
                expenditures: props.expenditures.collection
            })
        }
    }, [props.expenditures])

    return (
        <>
            <h4 className="content-title content-title-xs mb-3">Expenditures</h4>
            <Button
                type="button"
                variant="success"
                onClick={() => setState({...state, code: uniqueNumberGenerator(state.boardType)})}
                disabled={boardLength === 0 || state.code !== ""}
            >
                Generate Batch Number
            </Button>
            
            <Row className="mt-4">
                <Col md={9}>
                    <Row>
                        <Table bordered hover>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Budget Code</th>
                                    <th>Payment Type</th>
                                    <th>Description</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {state.expenditures.length !== 0 ? state.expenditures.map(expenditure => {
                                    if (auth.department.id === expenditure.controller.department.id && expenditure.status === "cleared") {
                                        return (
                                            <ExpenditureCard 
                                                key={expenditure.id}
                                                expenditure={expenditure}
                                                addToBatch={batchClaim}
                                                isButtonOff={state.buttonDisabled}
                                                paymentType={state.boardType}
                                                maxed={state.board.length > 0 && state.board.length === state.maxSlot}
                                            />
                                        )
                                    } else {
                                        return null
                                    }
                                }) 
                                : <tr><td colSpan="5">{'No Expenditure Data!!'}</td></tr>}
                            </tbody>
                        </Table>
                    </Row>
                </Col>
                <Col md={3}>
                    <Row>
                        <Col>
                            <h4 className="content-title content-title-xs mb-3">Batch - {state.code.toUpperCase()}</h4>
                            {state.board.length !== 0 ? state.board.map(batch => (
                                <BatchCard
                                    key={batch.id} 
                                    batch={batch}
                                    onRemove={handleDelete}
                                />
                            )) : null}

                            <div className="card card-hover card-social-one mt-3">
                                <div className="card-body">
                                    <div className="d-flex align-items-center justify-content-between mg-b-10">
                                    <h1 className="card-value">{grandPrettyTotal(state.total)}</h1>
                                    </div>
                                    <h5 className="card-title tx-primary">{'Grand Total'}</h5>
                                </div>
                            </div>
                            <Button
                                variant="success"
                                className="btn-block"
                                disabled={state.code === ""}
                                onClick={handleBatcher}
                            >
                                Batch Payments
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}

const mapStateToProps = state => ({
    expenditures: state.budgetting.expenditures
})

const mapDispatchToProps = dispatch => {
    return {
        index: (entity, broadcast) => dispatch(index(entity, broadcast)),
        store: (entity, body, broadcast) => dispatch(store(entity, body, broadcast))
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(Batch)
