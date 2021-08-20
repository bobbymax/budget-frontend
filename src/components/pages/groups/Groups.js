/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { index, destroy } from "../../../redux/actions"
import * as broadcast from '../../../redux/accessControl/types'

import {
    FiPlus
} from 'react-icons/fi'
import {
    Container,
    Row,
    Col,
    Table,
} from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import GroupsWidget from '../../widgets/GroupsWidget'

export const Groups = (props) => {

    const handleUpdate = (group) => {
        props.history.push({
            pathname: `groups/${group.label}/update`,
            state: {
                group: group,
                actionType: "update"
            }
        })

    }

    const handleDestroy = (data) => {
        props.destroy('groups', data.id, {
            success: broadcast.DELETE_GROUP_RECORD,
            failed: broadcast.DELETE_GROUP_RECORD_FAILED
        })
    }

    useEffect(() => {
        props.index('groups', {
            success: broadcast.FETCH_GROUPS,
            failed: broadcast.FETCH_GROUPS_FAILED
        })
    }, [])

    return (
        <>
            <h1>Groups</h1>
            <NavLink to="/groups/create" className="btn btn-success" style={{ marginBottom: 30 }}>
                <FiPlus style={{ marginRight: 8 }} />
                Add Group
            </NavLink>

            <div className="card form-portal-card">
                <Container fluid>
                    <Row>
                        <Col>
                            <Table striped hover>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Slots</th>
                                        <th>Can Expire</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.groups.collection.length !== 0 ? props.groups.collection.map(group => {
                                        return (
                                            <GroupsWidget 
                                                key={group.id}
                                                group={group}
                                                onEdit={handleUpdate}
                                                onDestroy={handleDestroy}
                                            />
                                        )
                                    }) : (<tr><td colSpan="5" className="text-danger">{'No Data Found!!!'}</td></tr>)}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        groups: state.access.groups
    }
}

const mapDispatchToProps = dispatch => {

    return {
        index: (entity, broadcast) => dispatch(index(entity, broadcast)),
        destroy: (entity, id, broadcast) => dispatch(destroy(entity, id, broadcast)),
    }
    
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(Groups)
