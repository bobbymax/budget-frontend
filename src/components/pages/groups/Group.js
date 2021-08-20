/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react'
import { store, update } from "../../../redux/actions"
import * as broadcast from '../../../redux/accessControl/types'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { FiSend } from 'react-icons/fi'
import { connect } from 'react-redux'

const Group = (props) => {

    const expiryDates = [
        {label: 'Yes', value: 1},
        {label: 'No', value: 0}
    ]


    const initialState =  {
        id: 0,
        label: "",
        name: "",
        max_slots: 0,
        start_date: "",
        expiry_date: "",
        cannot_expire: 0,
    }

    const [state, setState] = useState(initialState)
    const [actionType, setActionType] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = {
            name: state.name,
            max_slots: state.max_slots,
            start_date: state.start_date,
            expiry_date: state.expiry_date,
            cannot_expire: state.cannot_expire
        }

        props.store('groups', data, {
            success: broadcast.CREATE_GROUP_RECORD,
            failed: broadcast.CREATE_GROUP_RECORD_FAILED
        })
        props.history.push('/groups')
    }

    const handleUpdate = (e) => {
        e.preventDefault()

        const data = {
            name: state.name,
            max_slots: state.max_slots,
            start_date: state.start_date,
            expiry_date: state.expiry_date,
            cannot_expire: state.cannot_expire
        }

        props.update('groups', state.id, data, {
            success: broadcast.UPDATE_GROUP_RECORD,
            failed: broadcast.UPDATE_GROUP_RECORD_FAILED
        })
        props.history.push('/groups')
    }

    useEffect(() => {

        if(props.location && props.location.state) {
            const group = props.location.state.group
            const typer = props.location.state.actionType
            setState({
                ...state,
                id: group.id,
                label: group.label,
                name: group.name,
                max_slots: group.max_slots,
                start_date: group.start_date,
                expiry_date: group.expiry_date ?? "",
                cannot_expire: group.cannot_expire
            })

            setActionType(typer)
        }
    }, [props.location])

    return (
        <>
            <Container fluid>
                <Row>
                    <Col>
                        <h3 className="mb-5">{ actionType ? 'Update' : 'Create' } Group</h3>
                    </Col>
                </Row>
            </Container>
            <div className="card form-portal-card">
                <Container fluid>
                    <Row>
                        <Col>
                            <Form onSubmit={ actionType ? handleUpdate : handleSubmit}>
                            <Row>
                                <Col md={4} className="mb-4">
                                    <Form.Group>
                                        <Form.Label>Group Name</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="name"
                                            placeholder="Enter Group Name"
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
                                        <Form.Label>Start Date</Form.Label>
                                        <Form.Control 
                                            type="date"
                                            name="start_date"
                                            value={state.start_date}
                                            onChange={(e) => { setState({...state, start_date: e.target.value}) } }
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6} className="mb-4">
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
                                <Col md={6} className="mb-4">
                                    <Form.Group>
                                        <Form.Label>Cannot Expire?</Form.Label>
                                        <Form.Control 
                                            as="select" 
                                            name="cannot_expire"
                                            value={state.cannot_expire}
                                            onChange={(e) => { setState({...state, cannot_expire: e.target.value}) } }
                                        >
                                            <option value="">Group cannot Expire?</option>
                                            {expiryDates.map((option, i) => (
                                                <option key={i} value={option.value}>{option.label}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>

                                <Col>
                                    <Button variant="success" type="submit">
                                        <FiSend style={{ marginRight: 8 }}/>
                                        { actionType ? 'Update' : 'Create' } Group
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
    groups: state.access.groups
})

const mapDispatchToProps = dispatch => {
    return {
        store: (entity, data, broadcast) => dispatch(store(entity, data, broadcast)),
        update: (entity, id, data, broadcast) => dispatch(update(entity, id, data, broadcast))
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(Group)
