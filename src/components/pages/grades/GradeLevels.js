/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { index, store, update, destroy } from '../../../redux/actions'
import * as broadcast from '../../../redux/entitlements/types'
import {
    FiX,
    FiPlus, 
    FiSend
} from 'react-icons/fi'
import {
    Container,
    Row,
    Col,
    Table,
} from 'react-bootstrap'
import GradeLevelWidget from '../../widgets/GradeLevelWidget'

const GradeLevels = (props) => {

    const initialState = {
        showForm: false,
        id: 0,
        name: "",
        label: "",
        code: "",
        isUpdating: false
    }

    const [state, setState] = useState(initialState) 

    const handleSubmit = e => {
        e.preventDefault()

        const data = {
            name: state.name,
            code: state.code
        }

        props.store('gradeLevels', data, {
            success: broadcast.CREATE_GRADE_LEVEL_RECORD,
            failed: broadcast.CREATE_GRADE_LEVEL_RECORD_FAILED
        })

        setState({
            ...state,
            showForm: false,
            id: 0,
            name: "",
            label: "",
            code: "",
            isUpdating: false
        })
    }

    const handleUpdateSubmit = (e) => {
        e.preventDefault()
        const data = {
            name: state.name,
            code: state.code
        }

        props.update('gradeLeves', state.id, data, {
            success: broadcast.UPDATE_GRADE_LEVEL_RECORD,
            failed: broadcast.UPDATE_GRADE_LEVEL_RECORD_FAILED
        })

        setState({
            ...state,
            showForm: false,
            id: 0,
            name: "",
            label: "",
            code: "",
            isUpdating: false
        })
    } 

    const handleUpdate = (data) => {
        setState({
            ...state,
            showForm: true,
            id: data.id,
            name: data.name,
            label: data.label,
            code: data.code,
            isUpdating: true
        })
    }

    const handleDestroy = (data) => {
        props.destroy('gradeLevels', data.id, {
            success: broadcast.DELETE_GRADE_LEVEL_RECORD,
            failed: broadcast.DELETE_GRADE_LEVEL_RECORD_FAILED
        })
    }

    useEffect(() => {
        props.index('gradeLevels', {
            success: broadcast.FETCH_GRADE_LEVELS,
            failed: broadcast.FETCH_GRADE_LEVELS_FAILED
        })
    }, [])

    return (
        <>
            <h1>Grade Levels</h1>
            <button 
                type="button" 
                className="btn btn-success" 
                style={{ marginBottom: 30 }}
                onClick={() => setState({...state, showForm: true})}
            >
                <FiPlus style={{ marginRight: 8 }} />
                Add Grade Level
            </button>

            {state.showForm ? 
            <div className="card form-portal-card mb-5">
                <form onSubmit={state.id !== 0 ? handleUpdateSubmit : handleSubmit}>
                    <Row className="mb-5">
                        <Col md={8}>
                            <div className="form-group">
                                <label htmlFor="gradeLevelName" className="mb-3">Grade Level Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control" 
                                    placeholder="Enter Grade Level Name"
                                    value={state.name}
                                    onChange={(e) => setState({...state, name: e.target.value})}
                                />
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="form-group">
                                <label htmlFor="gradeLevelName" className="mb-3">Grade Level Code</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control" 
                                    placeholder="Enter Code"
                                    value={state.code}
                                    onChange={(e) => setState({...state, code: e.target.value})}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <button
                                type="submit"
                                className="btn btn-success"
                            >
                                <FiSend style={{ marginRight: 10 }} />
                                {state.id !== 0 ? 'Update' : 'Add'} Grade Level
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => setState({...state, showForm: false})}
                            >
                                <FiX style={{ marginRight: 10 }} />
                                Close
                            </button>
                        </Col>
                    </Row>
                </form>
            </div>
            : null}
            <div className="card form-portal-card">
                <Container fluid>
                    <Row>
                        <Col>
                            <Table striped hover>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Code</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.gradeLevels.collection.length !== 0 ? props.gradeLevels.collection.map(grade => {
                                        return (
                                            <GradeLevelWidget 
                                                key={grade.id}
                                                grade={grade}
                                                onEdit={handleUpdate}
                                                onDestroy={handleDestroy}
                                            />
                                        )
                                    }) : (<tr><td colSpan="3" className="text-danger">{'NO DATA FOUND!!'}</td></tr>)}
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
        gradeLevels: state.entitlements.gradeLevels
    }
}

const mapDispatchToProps = dispatch => {
    return {
        index: (entity, broadcast) => dispatch(index(entity, broadcast)),
        store: (entity, data, broadcast) => dispatch(store(entity, data, broadcast)),
        update: (entity, id, data, broadcast) => dispatch(update(entity, id, data, broadcast)),
        destroy: (entity, id, broadcast) => dispatch(destroy(entity, id, broadcast))
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(GradeLevels)
