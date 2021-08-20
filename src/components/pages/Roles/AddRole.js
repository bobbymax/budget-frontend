import { useState } from 'react'
import { Modal, Button, Form, Container, Row, Col } from 'react-bootstrap'

const AddRole = (props) => {

    const adminOptions = [
        { label: 'Super', value: 1 },
        { label: 'Basic', value: 0 }
    ]
 
    const initialState =  {
        name: "",
        max_slots:  "",
        isSuper: "",
        start_date: "",
        expiry_date: "",
        cannot_expire: false,
    }

    const [state, setState] = useState(initialState)

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            name: state.name,
            max_slots: state.max_slots,
            start_date: state.start_date,
            expiry_date: state.expiry_date,
            isSuper: state.isSuper,
            cannot_expire: state.cannot_expire ? 1 : 0
        }

        props.onSubmit(data)
        setState(initialState)
        props.onHide()
    }

    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Form onSubmit={handleSubmit}>
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Role
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container fluid>
                            <Row>
                                <Col md={4} className="mb-4">
                                    <Form.Group>
                                        <Form.Label>Role Name</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="name"
                                            placeholder="Enter Role Name"
                                            value={state.name}
                                            onChange={(e) => setState({...state, name: e.target.value})}
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
                                            onChange={(e) => setState({...state, max_slots: e.target.value})}
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
                                            onChange={(e) => setState({ ...state, isSuper: e.target.value })}
                                        >
                                            <option value="">Select Role Level</option>
                                            {adminOptions.map((option, i) => (
                                                <option key={i} value={option.value}>{option.label}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col md={6} className="mb-4">
                                    <Form.Group>
                                        <Form.Label>Start Date</Form.Label>
                                        <Form.Control 
                                            type="date"
                                            name="start_date"
                                            value={state.start_date}
                                            onChange={(e) => setState({...state, start_date: e.target.value})}
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
                                            onChange={(e) => setState({...state, expiry_date: e.target.value})}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={8}>
                                    <Form.Check 
                                        type="checkbox"
                                        name="cannot_expire"
                                        label="Cannot Expire"
                                        value={state.cannot_expire}
                                        defaultChecked={state.cannot_expire ? true : false}
                                        onChange={(e) => setState({...state, cannot_expire: e.target.value})}
                                    />
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" type="submit">Submit</Button>
                        <Button variant="danger" onClick={props.onHide}>Close</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
      
        </>
    )
}

export default AddRole
