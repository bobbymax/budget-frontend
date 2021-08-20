/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import {Container, Col, Form, Modal, Row, Button} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { verifyNumOfDays } from '../../../services/helpers/functions'

const AddInstruction = (props) => {

    const initialState = {
        claim_id: 0,
        benefit_id: 0,
        from: "",
        to: "",
        category: 0,
        numOfDays: 0,
        description: "",
        amount: 0
    }

    const [state, setState] = useState(initialState)
    const auth = useSelector(state => state.access.staff.authenticatedUser)
    const benefits = useSelector(state => state.entitlements.benefits.collection)
    const benefit = useSelector(state => state.entitlements.benefits.benefit)
    const child = useSelector(state => state.entitlements.benefits.child)

    const collectData = e => {
        e.preventDefault()

        const url = `claims/${state.claim_id}/instructions`

        const data = {
            benefit_id: state.benefit_id,
            from: state.from,
            to: state.to,
            category: state.category,
            numOfDays: state.numOfDays,
            description: state.description,
            amount: state.amount
        }

        props.onSubmit(url, data)

        setState({
            ...state,
            benefit_id: 0,
            from: "",
            to: "",
            category: 0,
            numOfDays: 0,
            description: "",
            amount: 0
        })

        props.onHide()
    }

    const closeModal = () => {
        setState({
            ...state,
            benefit_id: 0,
            from: "",
            to: "",
            category: 0,
            numOfDays: 0,
            description: "",
            amount: 0
        })

        props.onHide()
    }

    useEffect(() => {
        if (props.claim) {
            setState({
                ...state,
                claim_id: props.claim.id
            })
        } else {
            setState({
                ...state,
                claim_id: 0
            })
        }
    }, [props.claim])

    useEffect(() => {
        if (state.from !== "" && state.to !== "") {
            if (benefit && benefit.numOfDays) {
                setState({
                    ...state,
                    numOfDays: verifyNumOfDays(state.from, state.to)
                })
            } else {
                setState({
                    ...state,
                    numOfDays: 0
                })
            }
        }
    }, [state.from, state.to])

    useEffect(() => {
        if (benefit && ! benefit.numOfDays && benefit.entitlements.length !== 0 && state.benefit_id > 0) {
            const fee = benefit.entitlements.filter(entitlement => entitlement.grade === auth.level)
            const entitlement = fee[0]

            setState({
                ...state,
                amount: entitlement.amount
            })
        } else {
            setState({
                ...state,
                amount: 0
            })
        }
    }, [benefit])

    useEffect(() => {
        if (benefit && benefit.numOfDays && benefit.entitlements.length !== 0 && state.numOfDays > 0) {
            const fee = benefit.entitlements.filter(entitlement => entitlement.grade === auth.level)
            const entitlement = fee[0]            
            const total = entitlement.amount * state.numOfDays

            setState({
                ...state,
                amount: total
            })
        }
    }, [benefit, state.numOfDays])

    useEffect(() => {
        if (child && state.numOfDays > 0 && child.entitlements.length !== 0 && state.category > 0) {
            const fee = child.entitlements.filter(entitlement => entitlement.grade === auth.level)
            const entitlement = fee[0]

            const total = entitlement.amount * state.numOfDays

            setState({
                ...state,
                amount: total
            })
        }
    }, [child, state.numOfDays])

    return (
        <>
            <Modal
                show={props.show}
                onHide={closeModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Form onSubmit={collectData}>
                    <Modal.Header>
                        <Modal.Title>Add Detail</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container fluid>
                            <Row className="mb-3">
                                <Col md={4}>
                                    <Form.Group>
                                        <Form.Label>Type</Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={state.benefit_id}
                                            onChange={e => {
                                                setState({
                                                    ...state,
                                                    benefit_id: e.target.value
                                                })
                                        
                                                props.fetcher(e.target.value)
                                            }}
                                        >
                                            <option value="0">Select Type</option>
                                            {benefits.length !== 0 ? benefits.map(benefit => {
                                                if (benefit.parentId === 0) {
                                                    return (
                                                        <option key={benefit.id} value={benefit.id}>{benefit.name}</option>
                                                    )
                                                } else {
                                                    return null
                                                }
                                            }) : null}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group>
                                        <Form.Label>From</Form.Label>
                                        <input 
                                            type="date"
                                            className="form-control"
                                            value={state.from}
                                            onChange={e => setState({...state, from: e.target.value})}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group>
                                        <Form.Label>To</Form.Label>
                                        <input 
                                            type="date"
                                            className="form-control"
                                            value={state.to}
                                            onChange={e => setState({...state, to: e.target.value})}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            {state.benefit_id !== 0 && benefit && benefit.hasChildren ? 
                                <Row className="mb-3">
                                    <Col>
                                        <Form.Label>Select Category</Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={state.category}
                                            onChange={e => {
                                                setState({...state, category: e.target.value})
                                                props.children(e.target.value)
                                            }}
                                        >
                                            <option value="0">Select Category</option>
                                            {benefit !== null && benefit.children ? benefit.children.map(child => <option key={child.id} value={child.id}>{child.name}</option>) : null}
                                        </Form.Control>
                                    </Col>
                                </Row>
                            : null}
                            {state.benefit_id !== 0 && benefit && benefit.numOfDays ? 
                                <Row className="mb-3">
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Number of Days</Form.Label>
                                            <Form.Control 
                                                type="text"
                                                placeholder="Enter Number of Days"
                                                value={state.numOfDays}
                                                onChange={e => setState({...state, numOfDays: e.target.value})}
                                                readOnly
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            : null}
                            <Row className="mb-3">
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Description</Form.Label>
                                        <textarea
                                            className="form-control"
                                            value={state.description}
                                            onChange={e => setState({...state, description: e.target.value})}
                                        ></textarea>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Amount</Form.Label>
                                        <Form.Control 
                                            type="text"
                                            placeholder="Enter Amount"
                                            value={state.amount}
                                            onChange={e => setState({...state, amount: e.target.value})}
                                            readOnly={benefit && benefit.label !== "others"}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" type="submit">Submit</Button>
                        <Button variant="danger" onClick={() => closeModal()}>Close</Button>
                    </Modal.Footer>
                </Form>
            
            </Modal>
        </>
    )
}

export default AddInstruction
