/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react'
import * as broadcast from '../../../redux/accessControl/types'
import { update } from "../../../redux/actions"
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import {FiSend} from 'react-icons/fi'
import { connect } from 'react-redux'

const UpdateRole = (props) => {

    const adminOptions = [
        { label: 'Super', value: 1 },
        { label: 'Basic', value: 0 }
    ]

    const expiryDates = [
        {label: 'Yes', value: 1},
        {label: 'No', value: 0}
    ]


    const initialState =  {
        id: 0,
        label: "",
        name: "",
        max_slots: 0,
        isSuper: 0,
        start_date: "",
        expiry_date: "",
        cannot_expire: 0,
    }

    const [state, setState] = useState(initialState)

    const handleUpdate = (e) => {
        e.preventDefault()

        const data = {
            name: state.name,
            max_slots: state.max_slots,
            start_date: state.start_date,
            expiry_date: state.expiry_date,
            isSuper: state.isSuper,
            cannot_expire: state.cannot_expire
        }

        props.update('roles', state.id, data, {
            success: broadcast.UPDATE_ROLE_RECORD,
            failed: broadcast.UPDATE_ROLE_RECORD_FAILED
        })

        props.history.push('/roles')

    }

    useEffect(() => {

        if(props.location && props.location.state) {
            const role = props.location.state.role
            setState({
                ...state,
                id: role.id,
                label: role.label,
                name: role.name,
                max_slots: role.max_slots,
                isSuper: role.isSuper,
                start_date: role.start_date,
                expiry_date: role.expiry_date ?? "",
                cannot_expire: role.cannot_expire
            })
        }
    }, [props.location])

    return (
        <>
            <div className="card form-portal-card">
                <Container fluid>
                    <Row>
                        <Col>
                            <Form onSubmit={handleUpdate}>
                            <Row>
                                <Col md={4} className="mb-4">
                                    <Form.Group>
                                        <Form.Label>Role Name</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="name"
                                            placeholder="Enter Role Name"
                                            value={state.name}
                                            onChange={(e) => { setState({...state, name: e.target.value}) } }
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={4} className="mb-4">
                                    <Form.Group>
                                        <Form.Label>Maximum Number of Slots</Form.Label>
                                        <Form.Control 
                                            type="number" 
                                            name="max_slots" 
                                            placeholder="Enter Max Slots"
                                            value={state.max_slots}
                                            onChange={(e) => { setState({...state, max_slots: e.target.value}) } }
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={4} className="mb-4">
                                    <Form.Group>
                                        <Form.Label>Authorization</Form.Label>
                                        <Form.Control 
                                            as="select" 
                                            name="isSuper"
                                            value={state.isSuper}
                                            onChange={(e) => { setState({...state, isSuper: e.target.value}) } }
                                        >
                                            <option value="">Select Role Level</option>
                                            {adminOptions.map((option, i) => (
                                                <option key={i} value={option.value}>{option.label}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col md={4} className="mb-4">
                                    <Form.Group>
                                        <Form.Label>Start Date</Form.Label>
                                        <Form.Control 
                                            type="date"
                                            name="start_date"
                                            value={state.start_date}
                                            onChange={(e) => { setState({...state, start_date: e.target.value}) } }
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={4} className="mb-4">
                                    <Form.Group>
                                        <Form.Label>Expiry Date</Form.Label>
                                        <Form.Control 
                                            type="date"
                                            name="expiry_date"
                                            value={state.expiry_date}
                                            onChange={(e) => { setState({...state, expiry_date: e.target.value}) } }
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={4} className="mb-4">
                                    <Form.Group>
                                        <Form.Label>Cannot Expire?</Form.Label>
                                        <Form.Control 
                                            as="select" 
                                            name="cannot_expire"
                                            value={state.cannot_expire}
                                            onChange={(e) => { setState({...state, cannot_expire: e.target.value}) } }
                                        >
                                            <option value="">Role cannot Expire?</option>
                                            {expiryDates.map((option, i) => (
                                                <option key={i} value={option.value}>{option.label}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>

                                <Col>
                                    <Button variant="success" type="submit">
                                        <FiSend style={{ marginRight: 8 }}/>
                                        Update Role
                                    </Button>
                                </Col>
                            </Row>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    item: state.access.roles.role
})

const mapDispatchToProps = dispatch => {
    return {
        update: (entity, id, data, broadcast) => dispatch(update(entity, id, data, broadcast))
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(UpdateRole)
