/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react'
import { Modal, Button, Form, Container, Row, Col } from 'react-bootstrap'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { customTheme, filterByRef } from '../../../services/helpers/functions'

const AddEntitlements = (props) => {

    const defaultState = {
        benefit: null,
        prices: 0
    }

    const [entitlement, setEntitlement] = useState(defaultState)
    const [grades, setGrades] = useState([])

    const handleModalStateChange = (e) => {
        e.preventDefault()

        const data = {
            benefit_id: props.benefit.id,
            grades: grades,
            price_list_id: entitlement.prices
        }

        props.onSubmit(data)
        setEntitlement(defaultState)
        setGrades([])
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
                <Form onSubmit={handleModalStateChange}>
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Entitlements
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container fluid>
                            <Row style={{ marginBottom: 20 }}>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Benefit Name</Form.Label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={props.benefit ? props.benefit.name : null}
                                            readOnly 
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Grade Levels</Form.Label>
                                        <Select 
                                            components={makeAnimated()}
                                            theme={customTheme}
                                            options={props.benefit ? filterByRef(props.grades, props.benefit.entitlements) : props.grades}
                                            placeholder="Select Grade Levels"
                                            onChange={setGrades}
                                            value={grades}
                                            isSearchable
                                            isMulti
                                            autoFocus
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Amount</Form.Label>
                                        <select
                                            name="price_list_id"
                                            className="form-control"
                                            value={entitlement.prices}
                                            onChange={(e) => setEntitlement({...entitlement, prices: e.target.value})}
                                        >
                                            <option>Select Payment Category</option>
                                            {props.benefit ? props.benefit.wages.map(wage => <option key={wage.id} value={wage.id}>{wage.amount}</option>) : null}
                                        </select>
                                    </Form.Group>
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


export default AddEntitlements
