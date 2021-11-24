/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { destroy, index, store, update } from '../../../redux/actions'
import * as broadcast from '../../../redux/accessControl/types'
import * as broad from '../../../redux/entitlements/types'
import {Form} from 'react-bootstrap'
import { FiPlus, FiUserPlus, FiX } from 'react-icons/fi'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { customTheme, filterDepts } from '../../../services/helpers/functions'
import Requests from '../../../services/classes/Requests'
import { 
    Select as MuiSelect,
    Grid, 
    Button, 
    ButtonGroup, 
    TextField, 
    FormControl, 
    InputLabel,
    MenuItem
} from '@material-ui/core'
import TableComponent from '../../../widgets/components/TableComponent'

const columns = [
    {
        name: 'Name',
        label: 'name'
    },
    {
        name: 'Staff Number',
        label: 'staff_no'
    },
    {
        name: 'Email',
        label: 'email'
    }
]

export const Employees = (props) => {

    const initialState = {
        id: 0,
        name: "",
        staff_no: "",
        email: "",
        grade_level_id: 0,
        showForm: false,
        isUpdating: false
    }

    const [state, setState] = useState(initialState)
    const [staff, setStaff] = useState([])
    const [departments, setDepartments] = useState([])
    const [roles, setRoles] = useState([])
    

    const handleUpdate = data => {
        setState({
            ...state,
            id: data.id,
            name: data.name,
            staff_no: data.staff_no,
            email: data.email,
            grade_level_id: data.grade_level_id,
            showForm: true,
            isUpdating: true
        })

        if (data.departments.length !== 0) {
            setDepartments(filterDepts(data.departments))
        }

        if (data.roles.length !== 0) {
            setRoles(filterDepts(data.roles))
        }
    }

    const handleDestroy = data => {
        props.destroy('users', data.id, {
            success: broadcast.DELETE_STAFF_RECORD,
            failed: broadcast.DELETE_STAFF_RECORD_FAILED
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        const data = {
            name: state.name,
            staff_no: state.staff_no,
            email: state.email,
            grade_level_id: state.grade_level_id,
            departments: departments,
            roles: roles
        }

        if (! state.isUpdating) {
            props.store('users', data, {
                success: broadcast.CREATE_STAFF_RECORD,
                failed: broadcast.CREATE_STAFF_RECORD_FAILED
            })
        } else {
            props.update('users', state.id, data, {
                success: broadcast.UPDATE_STAFF_RECORD,
                failed: broadcast.UPDATE_STAFF_RECORD_FAILED
            })
        }

        setState({
            ...state,
            id: 0,
            name: "",
            staff_no: "",
            email: "",
            grade_level_id: 0,
            showForm: false,
            isUpdating: false
        })

        setDepartments([])
        setRoles([])
    }

    useEffect(() => {
        Requests.index('users')
        .then(res => {
            setStaff(res.data.data)
        })
        .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        props.index('gradeLevels', {
            success: broad.FETCH_GRADE_LEVELS,
            failed: broad.FETCH_GRADE_LEVELS_FAILED
        })
    }, [])

    useEffect(() => {
        props.index('departments', {
            success: broadcast.FETCH_DEPARTMENTS,
            failed: broadcast.FETCH_DEPARTMENTS_FAILED
        })
    }, [])

    useEffect(() => {
        props.index('roles', {
            success: broadcast.FETCH_ROLES,
            failed: broadcast.FETCH_ROLES_FAILED
        })
    }, [])

    return (
        <>
            <h1>Staff List</h1>
            <Button 
                variant="contained"
                color="primary" 
                style={{ marginBottom: 30 }}
                onClick={() => setState({...state, showForm: true})}
                disabled={state.isUpdating}
            >
                <FiPlus style={{ marginRight: 8 }} />
                Add Staff Record
            </Button>

            {state.showForm ? 
                <>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item md={4}>
                                <TextField 
                                    variant="outlined"
                                    label="Name"
                                    value={state.name}
                                    onChange={e => setState({...state, name: e.target.value})}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item md={2}>
                                <TextField 
                                    variant="outlined"
                                    label="Staff Number"
                                    value={state.staff_no}
                                    onChange={e => setState({...state, staff_no: e.target.value})}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item md={4}>
                                <TextField 
                                    variant="outlined"
                                    label="Email"
                                    value={state.email}
                                    onChange={e => setState({...state, email: e.target.value})}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item md={2}>

                                <FormControl variant="outlined" style={{ minWidth: '100%' }}>
                                    <InputLabel id="gradeLevel">Grade Level</InputLabel>
                                    <MuiSelect
                                        labelId="gradeLevelLabel"
                                        id="gradeLevel"
                                        value={state.grade_level_id}
                                        onChange={e => setState({...state, grade_level_id: e.target.value})}
                                        label="Grade Level"
                                        required
                                    >
                                        <MenuItem value="0" disabled><em>Select Grade Level</em></MenuItem>
                                        {props.entitlements.gradeLevels.collection.length !== 0 ? props.entitlements.gradeLevels.collection.map(level => (
                                            <MenuItem key={level.id} value={level.id}>{level.code}</MenuItem>
                                        )) : null}
                                    </MuiSelect>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item md={6}>
                                <Form.Group>
                                    <Form.Label>Departments</Form.Label>
                                    <Select 
                                        components={makeAnimated()}
                                        theme={customTheme}
                                        options={filterDepts(props.access.departments.collection)}
                                        placeholder="Select Departments"
                                        onChange={setDepartments}
                                        value={departments}
                                        isSearchable
                                        isMulti
                                        autoFocus
                                    />
                                </Form.Group>
                            </Grid>
                            <Grid item md={6}>
                                <Form.Group>
                                    <Form.Label>Roles</Form.Label>
                                    <Select 
                                        components={makeAnimated()}
                                        theme={customTheme}
                                        options={filterDepts(props.access.roles.collection)}
                                        placeholder="Select Roles"
                                        onChange={setRoles}
                                        value={roles}
                                        isSearchable
                                        isMulti
                                        autoFocus
                                    />
                                </Form.Group>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item md={12}>
                                <ButtonGroup
                                    variant="contained"
                                >
                                    <Button 
                                        color="primary"
                                        type="submit"
                                    >
                                        <FiUserPlus style={{ marginRight: 10 }}/>
                                        {state.isUpdating ? 'Update' : 'Add'} Staff
                                    </Button>
                                    <Button 
                                        color="secondary"
                                        onClick={() => {
                                            setState({
                                                ...state,
                                                id: 0,
                                                name: "",
                                                staff_no: "",
                                                email: "",
                                                grade_level_id: 0,
                                                showForm: false,
                                                isUpdating: false
                                            })

                                            setDepartments([])
                                            setRoles([])
                                        }}
                                    >
                                        <FiX style={{ marginRight: 10 }} />
                                        Close
                                    </Button>
                                </ButtonGroup>
                            </Grid>
                        </Grid>
                    </form>
                </>
            : null}

            
            <Grid container spacing={3}>
                <Grid item md={12}>

                    <TableComponent 
                        columns={columns}
                        rows={staff}
                        callToAction={handleUpdate}
                        callToDelete={handleDestroy}
                    />
                </Grid>
            </Grid>
            
        </>
    )
}

const mapStateToProps = state => ({
    access: state.access,
    entitlements: state.entitlements
})

const mapDispatchToProps = dispatch => {
    return {
        index: (entity, broadcast) => dispatch(index(entity, broadcast)),
        store: (entity, body, broadcast) => dispatch(store(entity, body, broadcast)),
        update: (entity, id, body, broadcast) => dispatch(update(entity, id, body, broadcast)),
        destroy: (entity, id, broadcast) => dispatch(destroy(entity, id, broadcast))
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(Employees)
