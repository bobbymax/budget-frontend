/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { store, update } from "../../../redux/actions"
// import * as broadcast from '../../../redux/accessControl/types'
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField, ButtonGroup, Button } from '@material-ui/core'
import Requests from '../../../services/classes/Requests'

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
    const [departments, setDepartments] = useState([])

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

        Requests.store('departments', data)
        .then(res => {
            props.history.push({
                pathname: '/departments',
                state: {
                    department: res.data.data,
                    status: 'created'
                }
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    const handleUpdate = (e) => {
        e.preventDefault()

        const data = {
            name: state.name,
            code: state.code,
            parentId: state.parentId,
            type: state.type
        }

        Requests.update('departments', state.id, data)
        .then(res => {
            props.history.push({
                pathname: '/departments',
                state: {
                    department: res.data.data,
                    status: 'updated'
                }
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        Requests.index('departments')
        .then(res => {
            setDepartments(res.data.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

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

            // debugger
        }
    }, [props.location])

    return (
        <>
            <h1>{ actionType ? "Update" : "Add" } Department</h1>

            <form onSubmit={ actionType ? handleUpdate : handleSubmit} style={{ marginTop: 30 }}>
                <Grid container spacing={3}>
                    <Grid item md={8}>
                        <TextField 
                            variant="outlined"
                            label="Department Name"
                            value={state.name}
                            onChange={(e) => setState({...state, name: e.target.value})}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item md={4}>
                        <TextField 
                            variant="outlined"
                            label="Department Code"
                            value={state.code}
                            onChange={(e) => setState({...state, code: e.target.value})}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item md={6}>
                        <FormControl variant="outlined" style={{ minWidth: '100%' }}>
                            <InputLabel id="department_type">Department Type</InputLabel>
                            <Select
                                labelId="departmentTypeLabel"
                                id="department_type"
                                value={state.type}
                                onChange={(e) => setState({...state, type: e.target.value})}
                                label="Department Type"
                                required
                            >
                                <MenuItem value=""><em>Select Department Type</em></MenuItem>
                                {departmentTypes.map((deptType, i) => (
                                    <MenuItem key={i} value={deptType.value}>{deptType.label}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item md={6}>
                        <FormControl variant="outlined" style={{ minWidth: '100%' }}>
                            <InputLabel id="department_parent">Department Parent</InputLabel>
                            <Select
                                labelId="departmentParentLabel"
                                id="department_parent"
                                value={state.parentId}
                                onChange={(e) => setState({...state, parentId: e.target.value})}
                                label="Department Parent"
                                required
                            >
                                <MenuItem value="0"><em>None</em></MenuItem>
                                {departments.map((department, i) => (
                                    <MenuItem key={i} value={department.id}>{department.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item md={12}>
                        <ButtonGroup>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={state.name === "" || state.code === ""}
                            >
                                {actionType ? 'Update' : 'Create'} Department
                            </Button>
                            <Button
                                type="reset"
                                variant="contained"
                                color="secondary"
                            >
                                Cancel
                            </Button>
                        </ButtonGroup>
                    </Grid>
                </Grid>
            </form>
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
