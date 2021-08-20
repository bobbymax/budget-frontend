/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Form, Row, Col, Button, Table } from 'react-bootstrap'
import { connect, useSelector } from 'react-redux'
import { destroy, fetch, index, store, update } from '../../../redux/actions'
import * as broadcast from '../../../redux/entitlements/types'
import * as broad from '../../../redux/accessControl/types'
import AddInstruction from './AddInstruction'
import InstructionWidget from '../../widgets/InstructionWidget'

export const Instructions = (props) => {

    const initialState = {
        claim: null,
        claim_id: 0,
        title: ""
    }

    const [state, setState] = useState(initialState)
    const [modal, setModal] = useState(false)
    const [total, setTotal] = useState(0)
    const auth = useSelector(state => state.access.staff.authenticatedUser)
    const instructions = useSelector(state => state.payments.instructions.collection)
    

    const handleSubmit = (url, data) => {
        props.store(url, data, {
            success: broad.CREATED_CLAIM_INSTRUCTION_RECORD,
            failed: broad.CREATED_CLAIM_INSTRUCTION_RECORD_FAILED
        })
    }

    const fetchBen = value => {
        props.fetch('benefits', value, {
            success: broadcast.FETCH_BENEFIT_RECORD,
            failed: broadcast.FETCH_BENEFIT_RECORD_FAILED
        })
    }

    const fetchChild = value => {
        props.fetch('benefits', value, {
            success: broadcast.FETCH_BENEFIT_CHILD,
            failed: broadcast.FETCH_BENEFIT_CHILD_FAILED
        })
    }

    const handleInstructionDestroy = instruction => {
        props.destroy(`claims/${instruction.parent.id}/instructions`, instruction.id, {
            success: broad.DELETED_CLAIM_INSTRUCTION_RECORD,
            failed: broad.DELETED_CLAIM_INSTRUCTION_RECORD_FAILED
        })
    }

    const updateGrandTotal = sum => {
        return setTotal(sum)
    }

    const registerClaim = () => {

        const data = {
            title: state.claim.title,
            total_amount: total,
            status: "registered"
        }

        props.update('claims', state.claim.id, data, {
            success: broad.REGISTERED_CLAIM_SUCCESSFULLY,
            failed: broad.REGISTERED_CLAIM_FAILED
        })

        setState({
            ...state,
            claim: null,
            claim_id: 0,
            title: ""
        })
        setTotal(0)

        props.history.push('/claims')
    }

    useEffect(() => {
        props.index('benefits', {
            success: broadcast.FETCH_BENEFITS,
            failed: broadcast.FETCH_BENEFITS_FAILED
        })
    }, [])

    useEffect(() => {
        if (instructions.length !== 0) {
            const sum = instructions.reduce((sum, instruction) => sum + parseFloat(instruction.amount), 0)
            updateGrandTotal(sum)
        }
    }, [instructions])

    useEffect(() => {
        if (props.location && props.location.state) {
            const claim = props.location.state.claim
            // const status = props.location.state.actionType

            setState({
                ...state,
                claim: claim,
                claim_id: claim.id,
                title: claim.title
            })

            props.index(`claims/${claim.id}/instructions`, {
                success: broad.FETCHED_CLAIM_INSTRUCTIONS,
                failed: broad.FETCHED_CLAIM_INSTRUCTIONS_FAILED
            })
            // setStatus(status)
        }
    }, [])

    return (
        <>
            <Form.Group>
                <Form.Label>CLAIM TITLE</Form.Label>
                <Form.Control 
                    type="text"
                    disabled={state.claim}
                    value={state.title}
                    onChange={e => setState({...state, title: e.target.value})}
                />
            </Form.Group>

            <AddInstruction 
                show={modal}
                claim={state.claim}
                onSubmit={handleSubmit}
                fetcher={fetchBen}
                children={fetchChild}
                onHide={() => {
                    setModal(false)
                }}
            />

            <div className="card form-portal-card mt-5">
                <Row className="mb-5">
                    <Col>
                        <Button 
                            variant="success"
                            onClick={() => setModal(true)}
                        >
                            ADD DETAILS
                        </Button>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Table striped hover>
                            <thead>
                                <tr>
                                    <th>From</th>
                                    <th>To</th>
                                    <th>Type</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.instructions.collection.length !== 0 ? props.instructions.collection.map(instruction => {
                                    if (state.claim && state.claim.owner.id === auth.id) {
                                        return (
                                            <InstructionWidget 
                                                key={instruction.id}
                                                instruction={instruction}
                                                onDestroy={handleInstructionDestroy}
                                            />
                                        )
                                    } else {
                                        return null
                                    }
                                }) : null}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </div>

            <div className="card form-portal-card mt-5 mb-5">
                <Row>
                    <Col></Col>
                    <Col>
                        <h4 className="mb-4">TOTAL: <span style={{ marginLeft: 25 }}>NGN {total}</span></h4>
                        <Button
                            variant="success"
                            className="btn-lg"
                            type="button"
                            onClick={registerClaim}
                        >
                            Submit
                        </Button>
                    </Col>
                </Row>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    benefits: state.entitlements.benefits,
    instructions: state.payments.instructions,
})

const mapDispatchToProps = dispatch => {
    return {
        index: (entity, broadcast) => dispatch(index(entity, broadcast)),
        update: (entity, id, body, broadcast) => dispatch(update(entity, id, body, broadcast)),
        fetch: (entity, id, broadcast) => dispatch(fetch(entity, id, broadcast)),
        store: (entity, body, broadcast) => dispatch(store(entity, body, broadcast)),
        destroy: (entity, id, broadcast) => dispatch(destroy(entity, id, broadcast))
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(Instructions)
