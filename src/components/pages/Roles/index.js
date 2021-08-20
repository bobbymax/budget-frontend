/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { connect } from 'react-redux'
import * as broadcast from '../../../redux/accessControl/types'
import { index, fetch, store, destroy } from "../../../redux/actions"
import {
    FiPlus
} from 'react-icons/fi'
import {
    Container,
    Row,
    Col,
    Table,
    Button
} from 'react-bootstrap'
import AddRole from "./AddRole"
import RolesWidget from "../../widgets/RolesWidget"

const Roles = (props) => {

    const [modalShow, setModalShow] = useState(false)

    const handleSubmit = (value) => {
        props.store('roles', value, {
            success: broadcast.CREATE_ROLE_RECORD,
            failed: broadcast.CREATE_ROLE_RECORD_FAILED
        })
    }

    const handleDestroy = (data) => {
        props.destroy('roles', data.label, {
            success: broadcast.DELETE_ROLE_RECORD,
            failed: broadcast.DELETE_ROLE_RECORD_FAILED
        })
    }

    const handleUpdate = (role) => {
        props.history.push({
            pathname: `roles/${role.label}/update`,
            state: {
                role: role,
            }
        })
    }

    useEffect(() => {
        props.index('roles', {
            success: broadcast.FETCH_ROLES,
            failed: broadcast.FETCH_ROLES_FAILED
        })
    }, [])

    return (
        <>
            <h1>Roles Section</h1>
            <Button variant="success" onClick={() => setModalShow(true)} style={{ marginBottom: 30 }}>
                <FiPlus style={{ marginRight: 8 }} />
                Add Role
            </Button>
            

            <AddRole
                onSubmit={handleSubmit}
                show={modalShow}
                onHide={() => {
                    setModalShow(false)
                }}
            />

            <div className="card form-portal-card">
                <Container fluid>
                    <Row>
                        <Col>
                            <Table striped hover>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Slots</th>
                                        <th>Expiry Date</th>
                                        <th>Super</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {props.roles.length !== 0 ? props.roles.map(role => {
                                        return (
                                            <RolesWidget 
                                                key={role.id}
                                                role={role}
                                                onEdit={handleUpdate}
                                                onDestroy={handleDestroy}
                                            />
                                        )
                                    }) : <tr><td colSpan="5" className="text-danger">No Data Found!!!</td></tr>}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )

}

const mapStateToProps = state => {
    return {
        roles: state.access.roles.collection
    }
}

const mapDispatchToProps = dispatch => {
    return {
        index: (entity, broadcast) => dispatch(index(entity, broadcast)),
        store: (entity, data, broadcast) => dispatch(store(entity, data, broadcast)),
        destroy: (entity, id, broadcast) => dispatch(destroy(entity, id, broadcast)),
        fetch: (entity, id, broadcast) => dispatch(fetch(entity, id, broadcast))
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(Roles)