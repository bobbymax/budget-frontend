import { useState } from "react"
import {Container, Row, Col, Form, Button} from 'react-bootstrap'
import {FiSend} from 'react-icons/fi'
import logo from '../../../assets/images/logo.png'
import { connect } from 'react-redux'
import { login } from "../../../redux/actions/auth"

const Login = (props) => {

    const initialState = {
        staff_no: "",
        password: ""
    }

    const [state, setState] = useState(initialState)

    const handleSubmit = (e) => {
        e.preventDefault()
        props.login(state.staff_no, state.password)
    }

    return (
        <>
            <div id="authentication">
                <div 
                    className="login-content" 
                    style={{ marginTop: 60 }}
                >
                    <Container>
                        <Row className="justify-content-center mb-5">
                            <img src={logo} alt="logo" className="img-fluid auth-img" />
                        </Row>
                        <Row className="justify-content-center">
                            <Col md={4} className="align-me">
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Staff Number</Form.Label>
                                        <Form.Control
                                            size="lg"
                                            name="staff_no"
                                            placeholder="Enter Staff Numner"
                                            value={ state.staff_no } 
                                            onChange={e => setState({ ...state, staff_no: e.target.value })}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-5">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control 
                                            size="lg"
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            value={ state.password } 
                                            onChange={e => setState({ ...state, password: e.target.value })}
                                        />
                                    </Form.Group>
                                    <Col>
                                        <Button type="submit" className="btn btn-success btn-lg">
                                            <FiSend style={{ marginRight: 12 }} />
                                            Login
                                        </Button>
                                    </Col>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        auth: state.access
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (staff_no, password) => dispatch(login(staff_no, password))
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(Login)
