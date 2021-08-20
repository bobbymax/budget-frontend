/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { FiSend } from 'react-icons/fi'
import { connect } from 'react-redux'
import * as broadcast from '../../../redux/accessControl/types'
import { index, store, update } from '../../../redux/actions'

export const SubBudgetHead = (props) => {

    const defaults = {
        budgetTypes: ['capital', 'recursive', 'personnel'],
        logistics: [
            {label: "Yes", value: 1},
            {label: "No", value: 0}
        ]
    }

    const initialState = {
        id: 0,
        budgetCode: "",
        budget_head_id: 0,
        department_id: 0,
        name: "",
        label: "",
        type: "",
        logisticsBudget: 0,
        description: ""
    }

    const [state, setState] = useState(initialState)
    const [actionType, setActionType] = useState("")

    const data = {
        budget_head_id: state.budget_head_id,
        department_id: state.department_id,
        budgetCode: state.budgetCode,
        name: state.name,
        description: state.description,
        type: state.type,
        logisticsBudget: state.logisticsBudget
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        props.store('subBudgetHeads', data, {
            success: broadcast.CREATE_SUB_BUDGET_HEAD_RECORD,
            failed: broadcast.CREATE_SUB_BUDGET_HEAD_RECORD_FAILED
        })

        props.history.push('/sub-budget-heads')
    }

    const handleUpdate = (e) => {
        e.preventDefault()

        props.update('subBudgetHeads', state.id, data, {
            success: broadcast.UPDATE_SUB_BUDGET_HEAD_RECORD,
            failed: broadcast.UPDATE_SUB_BUDGET_HEAD_RECORD_FAILED
        })
        props.history.push('/sub-budget-heads')
    }

    useEffect(() => {
        props.index('departments', {
            success: broadcast.FETCH_DEPARTMENTS,
            failed: broadcast.FETCH_DEPARTMENTS_FAILED
        })
    }, [])

    useEffect(() => {
        props.index('budgetHeads', {
            success: broadcast.FETCH_BUDGET_HEADS,
            failed: broadcast.FETCH_BUDGET_HEADS_FAILED
        })
    }, [])

    useEffect(() => {
        // Check if Sub Budget Head exists in props state then set to Component State
        if(props.location && props.location.state) {
            const subBudgetHead = props.location.state.subBudgetHead
            const action = props.location.state.actionType ?? ""
            setState({
                ...state,
                id: subBudgetHead.id,
                budget_head_id: subBudgetHead.budget_head_id,
                department_id: subBudgetHead.department_id,
                budgetCode: subBudgetHead.budgetCode,
                name: subBudgetHead.name,
                description: subBudgetHead.description,
                type: subBudgetHead.type,
                logisticsBudget: subBudgetHead.logisticsBudget,
            })

            setActionType(action)
        }
    }, [])

    return (
        <div>
            <h1 className="mb-5">{ actionType !== "" ? 'Update' : 'Create'} Sub Budget Head</h1>

            <div className="card form-portal-card">
                <form onSubmit={actionType !== "" ? handleUpdate : handleSubmit}>
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <div className="form-group">
                                <label htmlFor="budgetCode" className="mb-3">Budget Code</label>
                                <input
                                    type="text"
                                    name="budgetCode"
                                    className="form-control" 
                                    id="budgetCode"
                                    placeholder="Enter Sub Budget Code"
                                    value={state.budgetCode}
                                    onChange={e => setState({...state, budgetCode: e.target.value})}
                                />
                            </div>
                        </div>
                        <div className="col-md-4 mb-3">
                            <div className="form-group">
                                <label htmlFor="name" className="mb-3">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control" 
                                    id="name"
                                    placeholder="Enter Sub Budget Name"
                                    value={state.name}
                                    onChange={e => setState({...state, name: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="col-md-4 mb-3">
                            <div className="form-group">
                                <label htmlFor="type" className="mb-3">Budget Type</label>
                                <select
                                    name="type"
                                    className="form-control"
                                    id="type"
                                    value={state.type}
                                    onChange={e => setState({...state, type: e.target.value})}
                                >
                                    <option value="">Select Budget Type</option>
                                    {defaults.budgetTypes.map((btype, i) => (<option key={i} value={btype}>{btype}</option>))}

                                </select>
                            </div>
                        </div>

                        <div className="col-md-8 mb-3">
                            <div className="form-group">
                                <label htmlFor="department_id" className="mb-3">Department</label>
                                <select
                                    name="department_id"
                                    className="form-control"
                                    id="department_id"
                                    value={state.department_id}
                                    onChange={e => setState({...state, department_id: e.target.value})}
                                >
                                    <option value="">Select Department</option>
                                    {props.departments.length !== 0 ? props.departments.map(department => (<option key={department.id} value={department.id}>{department.name}</option>)) : null}
                                </select>
                            </div>
                        </div>

                        <div className="col-md-4 mb-3">
                            <div className="form-group">
                                <label htmlFor="logisticsBudget" className="mb-3">Logistics Budget</label>
                                <select
                                    name="logisticsBudget"
                                    className="form-control"
                                    id="logisticsBudget"
                                    value={state.logisticsBudget}
                                    onChange={e => setState({...state, logisticsBudget: e.target.value})}
                                >
                                    <option value="">Is Logistics Budget?</option>
                                    {defaults.logistics.map((logist, i) => (<option key={i} value={logist.value}>{logist.label}</option>))}
                                </select>
                            </div>
                        </div>

                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <label htmlFor="budget_head_id" className="mb-3">Budget Head</label>
                                <select
                                    name="budget_head_id"
                                    className="form-control"
                                    id="budget_head_id"
                                    value={state.budget_head_id}
                                    onChange={e => setState({...state, budget_head_id: e.target.value})}
                                >
                                    <option value="">Select Budget Head</option>
                                    { props.budgetHeads.length !== 0 ? props.budgetHeads.map(budgetHead => (<option key={budgetHead.id} value={budgetHead.id}>{budgetHead.name}</option>)) : null}

                                </select>
                            </div>
                        </div>

                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <label htmlFor="description" className="mb-3">Description</label>
                                <textarea
                                    className="form-control"
                                    placeholder="Enter Sub Budget Description Here"
                                    id="description"
                                    style={{ height: 150, maxHeight: 150 }}
                                    value={state.description}
                                    onChange={e => setState({...state, description: e.target.value})}
                                ></textarea>
                            </div>
                        </div>

                        <div className="col-md-4 mt-3">
                            <button
                                type="submit"
                                className="btn btn-success btn-sm"
                            >
                                <FiSend style={{ marginRight: 15 }} />
                                { actionType !== "" ? 'Update' : 'Create'} Sub Budget Head
                            </button>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    )
}

const mapStateToProps = state => {
    return {
        budgetHeads: state.budgetting.budgetHeads.collection,
        departments: state.access.departments.collection
    }
}

const mapDispatchToProps = dispatch => {
    return {
        index: (entity, broadcast) => dispatch(index(entity, broadcast)),
        store: (entity, data, broadcast) => dispatch(store(entity, data, broadcast)),
        update: (entity, id, data, broadcast) => dispatch(update(entity, id, data, broadcast))
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(SubBudgetHead)
