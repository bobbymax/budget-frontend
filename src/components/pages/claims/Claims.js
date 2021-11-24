/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Form, Table, Button, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import {destroy, index, store, update} from '../../../redux/actions'
import * as broadcast from '../../../redux/accessControl/types'
import ClaimWidget from '../../widgets/ClaimWidget'
import { FiPlus, FiSave, FiX } from 'react-icons/fi'

const Claims = (props) => {

    const auth = props.auth

    const initialState = {
        id: 0,
        title: "",
        type: "staff-claim",
        submitted: false,
        formDisplay: false,
        isUpdating: false
    }

    const [state, setState] = useState(initialState)

    const loadClaim = data => {
        setState({
            ...state,
            id: data.id,
            title: data.title,
            type: data.type,
            formDisplay: true,
            isUpdating: true
        })
    }

    const deleteClaim = data => {
        props.destroy('claims', data.id, {
            success: broadcast.DELETED_CLAIM_RECORD,
            failed: broadcast.DELETED_CLAIM_RECORD_FAILED
        })
    }

    const handleAddDetails = claim => {
        props.history.push({
            pathname: `/claims/${claim.reference_no}/add/details`,
            state: {
                claim: claim,
                actionType: "update"
            }
        })
    }

    // Handle Claim Print out
    const handlePrintOut = claim => {
        props.history.push({
            pathname: `/claims/${claim.reference_no}/print`,
            state: {
                claim: claim,
                actionType: 'print'
            }
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        const data = {
            title: state.title,
            type: state.type
        }

        if (state.isUpdating) {
            props.update('claims', state.id, data, {
                success: broadcast.UPDATED_CLAIM_RECORD,
                failed: broadcast.UPDATED_CLAIM_RECORD_FAILED
            })
        } else {
            props.store('claims', data, {
                success: broadcast.CREATED_CLAIM_RECORD,
                failed: broadcast.CREATED_CLAIM_RECORD_FAILED
            })
        }

        setState({
            ...state,
            id: 0,
            title: "",
            type: "staff-claim",
            submitted: false,
            formDisplay: false,
            isUpdating: false
        })
    }

    useEffect(() => {
        props.index('claims', {
            success: broadcast.FETCHED_CLAIMS,
            failed: broadcast.FETCHED_CLAIMS_FAILED
        })
    }, [])

    return (
        <>
            <h1>Claims</h1>
            <Button
                variant="success"
                className="mb-5"
                onClick={() => setState({...state, formDisplay: true})}
                disabled={state.formDisplay}
            >
                <FiPlus />
                <span style={{ marginLeft: 10 }}>
                    Create Claim
                </span>
            </Button>
            {state.formDisplay ? 
                <div className="card form-portal-card mb-5">
                    <Form onSubmit={handleSubmit}>
                        <Row className="mb-4">
                            <Col>
                                <Form.Group>
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control 
                                        type="text"
                                        placeholder="Enter Claim Title"
                                        value={state.title}
                                        onChange={e => setState({...state, title: e.target.value})}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button
                                    type="submit"
                                    variant="success"
                                    style={{ marginRight: 5 }}
                                >
                                    <FiSave />
                                    <span style={{ marginLeft: 10 }}>
                                        Save Claim
                                    </span>
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => setState({
                                        ...state,
                                        id: 0,
                                        title: "",
                                        type: "staff-claim",
                                        submitted: false,
                                        formDisplay: false,
                                        isUpdating: false
                                    })}
                                >
                                    <FiX />
                                    <span style={{ marginLeft: 10 }}>
                                        Close
                                    </span>
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            : null}
            <div className="card form-portal-card">
                <Table striped hover>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Amount</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.claims.collection.length !== 0 ? props.claims.collection.map(claim => {
                            if (auth.id === claim.owner.id || auth.administrator === 1) {
                                return (
                                    <ClaimWidget 
                                        key={claim.id}
                                        claim={claim}
                                        onEdit={loadClaim}
                                        onDestroy={deleteClaim}
                                        addDetails={handleAddDetails}
                                        onView={handlePrintOut}
                                    />
                                )
                            } else {
                                return null
                            }
                        }) : <tr><td colSpan="3" className="text-danger">{'No Data Found!!'}</td></tr>}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    auth: state.access.staff.authenticatedUser,
    claims: state.payments.claims
})

const mapDispatchToProps = dispatch => {
    return {
        index: (entity, broadcast) => dispatch(index(entity, broadcast)),
        store: (entity, body, broadcast) => dispatch(store(entity, body, broadcast)),
        update: (entity, id, body, broadcast) => dispatch(update(entity, id, body, broadcast)),
        destroy: (entity, id, broadcast) => dispatch(destroy(entity, id, broadcast))
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(Claims)
