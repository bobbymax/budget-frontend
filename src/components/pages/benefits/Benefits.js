/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import * as broadcast from '../../../redux/entitlements/types'
import { index, store, update, destroy, bulk } from '../../../redux/actions'
import { levelOptions } from '../../../services/helpers/functions'
import {
    FiX,
    FiPlus, 
    FiSend
} from 'react-icons/fi'
import {
    Container,
    Row,
    Col,
    Table
} from 'react-bootstrap'
import AddEntitlements from './AddEntitlements'
import BenefitsWidget from '../../widgets/BenefitsWidget'

const Benefits = (props) => {

    const initialState = {
        showForm: false,
        id: 0,
        name: "",
        label: "",
        parentId: 0,
        depends: 0,
        description: "",
        isUpdating: false
    }

    const modalState = {
        entity: null,
        visibility: false
    }

    const [state, setState] = useState(initialState) 
    const [modalShow, setModalShow] = useState(modalState)

    const handleSubmit = e => {
        e.preventDefault()

        const data = {
            name: state.name,
            parentId: state.parentId,
            numOfDays: state.depends,
            description: state.description,
        }

        props.store('benefits', data, {
            success: broadcast.CREATE_BENEFIT_RECORD,
            failed: broadcast.CREATE_BENEFIT_RECORD_FAILED
        })

        setState({
            ...state,
            showForm: false,
            id: 0,
            name: "",
            label: "",
            parentId: 0,
            depends: 0,
            description: "",
            isUpdating: false
        })
    }

    const handleUpdateSubmit = (e) => {
        e.preventDefault()
        const data = {
            name: state.name,
            parentId: state.parentId,
            numOfDays: state.depends,
            description: state.description,
        }

        props.update('benefits', state.id, data, {
            success: broadcast.UPDATE_BENEFIT_RECORD,
            failed: broadcast.UPDATE_BENEFIT_RECORD_FAILED
        })

        setState({
            ...state,
            showForm: false,
            id: 0,
            name: "",
            label: "",
            parentId: 0,
            depends: 0,
            description: "",
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
            parentId: data.parentId,
            depends: data.numOfDays,
            description: data.description,
            isUpdating: true
        })
    }

    const handleStateChange = (data) => {

        props.bulk('load/entitlements', data, {
            success: broadcast.ADD_ENTITLEMENTS_FOR_GRADE_LEVELS,
            failed: broadcast.ADD_ENTITLEMENTS_FOR_GRADE_LEVELS_FAILED
        })
    }

    const handleModalEvent = (data) => {
        setModalShow({
            ...modalShow,
            entity: data,
            visibility: true
        })
    }

    const handleDestroy = (data) => {
        props.destroy('benefits', data.id, {
            success: broadcast.DELETE_BENEFIT_RECORD,
            failed: broadcast.DELETE_BENEFIT_RECORD_FAILED
        })
    }

    useEffect(() => {
        props.index('benefits', {
            success: broadcast.FETCH_BENEFITS,
            failed: broadcast.FETCH_BENEFITS_FAILED
        })
    }, [])

    useEffect(() => {
        if (props.entitlements.gradeLevels.collection.length === 0) {
            props.index('gradeLevels', {
                success: broadcast.FETCH_GRADE_LEVELS,
                failed: broadcast.FETCH_GRADE_LEVELS_FAILED
            })
        }
    }, [])

    useEffect(() => {
        if (props.entitlements.wages.collection.length === 0) {
            props.index('priceLists', {
                success: broadcast.FETCH_WAGES,
                failed: broadcast.FETCH_WAGES_FAILED
            })
        }
    }, [])

    return (
        <>
            <h1>Benefits</h1>
            <button 
                type="button" 
                className="btn btn-success" 
                style={{ marginBottom: 30 }}
                onClick={() => setState({...state, showForm: true})}
            >
                <FiPlus style={{ marginRight: 8 }} />
                Add Benefit
            </button>

            <AddEntitlements 
                onSubmit={handleStateChange}
                show={modalShow.visibility}
                benefit={modalShow.entity}
                grades={levelOptions(props.entitlements.gradeLevels.collection)}
                onHide={() => {
                    setModalShow({...modalShow, visibility: false})
                }}
            />

            {state.showForm ? 
            <div className="card form-portal-card mb-5">
                <form onSubmit={state.id !== 0 ? handleUpdateSubmit : handleSubmit}>
                    <Row className="mb-3">
                        <Col md={5}>
                            <div className="form-group">
                                <label htmlFor="benefitName" className="mb-3">Benefit Title</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control" 
                                    placeholder="Enter Grade Level Name"
                                    id="benefitName"
                                    value={state.name}
                                    onChange={(e) => setState({...state, name: e.target.value})}
                                />
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="form-group">
                                <label htmlFor="benefitParent" className="mb-3">Select Parent</label>
                                <select
                                    name="parentId"
                                    className="form-control" 
                                    id="benefitParent"
                                    value={state.parentId}
                                    onChange={(e) => setState({...state, parentId: e.target.value})}
                                >
                                    <option value="0">None</option>
                                    {props.entitlements.benefits.collection.length !== 0 ? props.entitlements.benefits.collection.map(benefit => (<option key={benefit.id} value={benefit.id}>{benefit.name}</option>)) : null}
                                </select>
                            </div>
                        </Col>
                        <Col mb={3}>
                            <div className="form-group">
                                <label htmlFor="numOfDays" className="mb-3">Requirement</label>
                                <select
                                    name="numOfDays"
                                    className="form-control"
                                    id="numOfDays"
                                    value={state.depends}
                                    onChange={e => setState({...state, depends: e.target.value})} 
                                >
                                    <option value="0">None</option>
                                    <option value="1">Number of Days</option>
                                </select>
                            </div>
                        </Col>
                    </Row>
                    <Row className="mb-5">
                        <Col>
                            <div className="form-group">
                                <label htmlFor="benefitDescription" className="mb-3">Description</label>
                                <textarea
                                    name="description"
                                    className="form-control"
                                    placeholder="Enter Benefit Description Here"
                                    id="benefitDescription"
                                    value={state.description}
                                    onChange={e => setState({...state, description: e.target.value})}
                                ></textarea>
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
                                {state.id !== 0 ? 'Update' : 'Add'} Benefit
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => setState({
                                    ...state, 
                                    showForm: false,
                                    id: 0,
                                    name: "",
                                    label: "",
                                    parentId: 0,
                                    depends: 0,
                                    description: "",
                                    isUpdating: false
                                })}
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
                                        <th>Parent</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.entitlements.benefits.collection.length !== 0 ? props.entitlements.benefits.collection.map(benefit => {
                                        return (
                                            <BenefitsWidget 
                                                key={benefit.id}
                                                benefit={benefit}
                                                onEdit={handleUpdate}
                                                onDestroy={handleDestroy}
                                                modalControl={handleModalEvent}
                                            />
                                        )
                                    }) : (<tr><td colSpan="3" className="text-danger">{'No Data Found!!'}</td></tr>)}
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
        entitlements: state.entitlements
    }
}

const mapDispatchToProps = dispatch => {
    return {
        index: (entity, broadcast) => dispatch(index(entity, broadcast)),
        store: (entity, data, broadcast) => dispatch(store(entity, data, broadcast)),
        update: (entity, id, data, broadcast) => dispatch(update(entity, id, data, broadcast)),
        destroy: (entity, id, broadcast) => dispatch(destroy(entity, id, broadcast)),
        bulk: (entity, data, broadcast) => dispatch(bulk(entity, data, broadcast))
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(Benefits)
