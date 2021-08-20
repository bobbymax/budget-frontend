/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { store, update } from "../../../redux/actions"
import * as broadcast from '../../../redux/accessControl/types'

const Department = (props) => {

    const defaultState = {
        id: 0,
        name: "",
        label: "",
        code: "",
        parentId: 0,
        type: ""
    }

    const [state, setState] = useState(defaultState)
    const [actionType, setActionType] = useState("")

    const departmentTypes = [
        {label : "Directorate", value: "directorate"},
        {label : "Division", value: "division"},
        {label : "Department", value: "department"}
    ]

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = {
            name: state.name,
            code: state.code,
            parentId: state.parentId,
            type: state.type
        }

        props.store('departments', data, {
            success: broadcast.CREATE_DEPARTMENT_RECORD,
            failed: broadcast.CREATE_DEPARTMENT_RECORD_FAILED
        })
        props.history.push('/departments')
    }

    const handleUpdate = (e) => {
        e.preventDefault()

        const data = {
            name: state.name,
            code: state.code,
            parentId: state.parentId,
            type: state.type
        }

        props.update('departments', state.id, data, {
            success: broadcast.UPDATE_DEPARTMENT_RECORD,
            failed: broadcast.UPDATE_DEPARTMENT_RECORD_FAILED
        })
        props.history.push('/departments')
    }

    useEffect(() => {
        if(props.location && props.location.state) {
            const department = props.location.state.department
            const typer = props.location.state.actionType
            setState({
                ...state,
                id: department.id,
                name: department.name,
                label: department.label,
                code: department.code,
                parentId: department.parentId,
                type: department.type
            })

            setActionType(typer)
        }
    }, [props.location])

    return (
        <>
            <h1>{ actionType ? "Update" : "Add" } Department</h1>

            <div className="card form-portal-card" style={{ marginTop: 30 }}>
            <form onSubmit={ actionType ? handleUpdate : handleSubmit}>
                <div className="row">
                    <div className="col-md-8 mb-3">
                        <div className="form-group">
                            <label className="mb-3">Name</label>
                            <input 
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Enter Department Name"
                                value={state.name}
                                onChange={(e) => setState({...state, name: e.target.value})}
                            />
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="form-group">
                            <label className="mb-3">Code</label>
                            <input 
                                type="text"
                                name="code"
                                className="form-control"
                                placeholder="Enter Code"
                                value={state.code}
                                onChange={(e) => setState({...state, code: e.target.value})}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="mb-3">Type</label>
                            <select 
                                name="type" 
                                className="form-control"
                                value={state.type}
                                onChange={(e) => setState({...state, type: e.target.value})}
                            >
                                <option value="">Select Type</option>
                                {departmentTypes.map((deptType, i) => (
                                    <option key={i} value={deptType.value}>{deptType.label}</option>
                                ))}

                            </select>
                        </div>
                    </div>
                    <div className="col-md-6 mb-5">
                        <div className="form-group">
                            <label className="mb-3">Parent</label>
                            <select 
                                name="parentId" 
                                className="form-control"
                                value={state.parentId}
                                onChange={(e) => setState({...state, parentId: e.target.value})}
                            >
                                <option value="">Select Parent</option>
                                <option value="0">None</option>

                                {props.departments.collection.length !== 0 ? props.departments.collection.map((department, i) => (
                                    <option key={i} value={department.id}>{department.name}</option>
                                )) : null}

                            </select>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <button type="submit" className="btn btn-success">
                            {actionType ? 'Update' : 'Create'} Department
                        </button>
                    </div>
                </div>
            </form>
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    departments: state.access.departments
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
)(Department)
