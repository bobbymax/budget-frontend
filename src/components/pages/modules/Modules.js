/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { customTheme, filterDepts } from '../../../services/helpers/functions'
import {
    FiX,
    FiSend
} from 'react-icons/fi'
import { 
    Select as MuiSelect,
    Grid, 
    Typography, 
    Button, 
    TextField, 
    FormControl, 
    InputLabel, 
    MenuItem,
    ButtonGroup
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import TableComponent from '../../../widgets/components/TableComponent'
import Requests from '../../../services/classes/Requests'
import Alerts from '../../../services/classes/Alerts'

export const Modules = (props) => {

    const initialState = {
        id: 0,
        name: "",
        path: "",
        component: "",
        parentId: 0,
        isMenu: 0,
        isAuthRequired: 0,
        isAdministration: 0,
        generatePermissions: 0,
        showForm: false,
        isUpdating: false,
        type: ""
    }

    const [state, setState] = useState(initialState)
    const [modules, setModules] = useState([])
    const [departments, setDepartments] = useState([])
    const [roles, setRoles] = useState([])
    const [fetchedDepartments, setFetchedDepartments] = useState([])
    const [fetchedRoles, setFetchedRoles] = useState([])

    const columns = [
        {
            name: 'Name',
            label: 'name'
        },
        {
            name: 'Path',
            label: 'path'
        }
    ]

    const moduleTypes = ['application', 'module', 'page']

    const handleSubmit = e => {
        e.preventDefault()

        const data = {
            name: state.name,
            path: state.path,
            component: state.component,
            parentId: state.parentId,
            isMenu: state.isMenu,
            isAuthRequired: state.isAuthRequired,
            isAdministration: state.isAdministration,
            generatePermissions: state.generatePermissions,
            type: state.type,
            departments: departments,
            roles: roles
        }

        if (state.isUpdating) {
            Requests.update('modules', state.id, data)
            .then(res => {
                setModules(modules.map(el => {
                    if (el.id === res.data.data.id) {
                        return res.data.data
                    }

                    return el
                }))
                Alerts.success('Updated', res.data.message)
            })
            .catch(err => console.log(err))
        } else {
            Requests.store('modules', data)
            .then(res => {
                setModules([res.data.data, ...modules])
                Alerts.success('Success', res.data.message)
            })
            .catch(err => console.log(err))
        }

        setState({
            ...state,
            id: 0,
            name: "",
            path: "",
            component: "",
            parentId: 0,
            isMenu: 0,
            isAuthRequired: 0,
            isAdministration: 0,
            generatePermissions: 0,
            showForm: false,
            isUpdating: false,
            type: ""
        })

        setDepartments([])
        setRoles([])
    }

    const handleUpdate = data => {
        setState({
            ...state,
            id: data.id,
            name: data.name,
            path: data.path,
            component: data.component,
            parentId: data.parentId,
            isMenu: data.isMenu,
            isAuthRequired: data.isAuthRequired,
            isAdministration: data.isAdministration,
            generatePermissions: data.generatePermissions,
            type: data.type,
            showForm: true,
            isUpdating: true
        })
        setDepartments(filterDepts(data.departments))
        setRoles(filterDepts(data.roles))
    }

    const handleDestroy = data => {

        Alerts.flash('Are you sure?', 'warning', "You won't be able to revert this!")
        .then(result => {
            if (result.isConfirmed) {
                Requests.destroy('modules', data.id)
                .then(res => {
                    setModules([...modules.filter(module => module.id !== res.data.data.id)])
                    Alerts.success('Deleted!', res.data.message)
                })
                .catch(err => {
                    console.log(err)
                })
            }
        })
    }
 
    // Fetch Modules
    useEffect(() => {
        Requests.index('modules')
        .then(res => {
            setModules(res.data.data)
        })
        .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        Requests.index('departments')
        .then(res => {
            setFetchedDepartments(res.data.data)
        })
        .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        Requests.index('roles')
        .then(res => {
            setFetchedRoles(res.data.data)
        })
        .catch(err => console.log(err))
    }, [])

    return (
        <>
            <Typography
                variant="h4"
                component="h2"
                style={{ marginBottom: 10 }}
            >
                Modules
            </Typography>
            <Button
                variant="contained" 
                color="primary"
                style={{ marginBottom: 30 }}
                onClick={() => setState({...state, showForm: true})}
                disabled={state.isUpdating || state.showForm}
            >
                <AddIcon style={{ marginRight: 8 }} />
                Add Module
            </Button>

            {state.showForm ? 
                <form onSubmit={handleSubmit} style={{ marginBottom: 30 }}>
                    <Grid container spacing={3} style={{ marginBottom: 20 }}>
                        <Grid item md={4}>
                            <TextField 
                                variant="outlined"
                                label="Module Name"
                                value={state.name}
                                onChange={e => setState({...state, name: e.target.value})}
                                fullWidth
                                required

                            />
                        </Grid>
                        <Grid item md={4}>
                            <TextField 
                                variant="outlined"
                                label="Pathname"
                                value={state.path}
                                onChange={e => setState({...state, path: e.target.value})}
                                fullWidth
                                required

                            />
                        </Grid>
                        <Grid item md={4}>
                            <TextField 
                                variant="outlined"
                                label="Module Component"
                                value={state.component}
                                onChange={e => setState({...state, component: e.target.value})}
                                fullWidth
                                required

                            />
                        </Grid>
                        <Grid item md={4}>
                            <FormControl variant="outlined" style={{ minWidth: '100%' }}>
                                <InputLabel id="permissions">Generate Permissions?</InputLabel>
                                <MuiSelect
                                    labelId="permissionsLabel"
                                    id="permissions"
                                    value={state.generatePermissions}
                                    onChange={e => setState({...state, generatePermissions: e.target.value})}
                                    label="Generate Permissions"
                                    required
                                >
                                    <MenuItem value="" disabled><em>Generate Module Permissions?</em></MenuItem>
                                    <MenuItem value="0"><em>No</em></MenuItem>
                                    <MenuItem value="1"><em>Yes</em></MenuItem>
                                </MuiSelect>
                            </FormControl>
                        </Grid>
                        <Grid item md={4}>
                            <FormControl variant="outlined" style={{ minWidth: '100%' }}>
                                <InputLabel id="parentId">Parent</InputLabel>
                                <MuiSelect
                                    labelId="parentIdLabel"
                                    id="parentId"
                                    value={state.parentId}
                                    onChange={e => setState({...state, parentId: e.target.value})}
                                    label="Parent"
                                    required
                                >
                                    <MenuItem value="" disabled><em>Select Module Parent</em></MenuItem>
                                    <MenuItem value="0"><em>None</em></MenuItem>
                                    {modules.map(module => (
                                        <MenuItem key={module.id} value={module.id}>{module.name}</MenuItem>
                                    ))}
                                </MuiSelect>
                            </FormControl>
                        </Grid>
                        <Grid item md={4}>
                            <FormControl variant="outlined" style={{ minWidth: '100%' }}>
                                <InputLabel id="isMenu">Quick Access</InputLabel>
                                <MuiSelect
                                    labelId="isMenuLabel"
                                    id="isMenu"
                                    value={state.isMenu}
                                    onChange={e => setState({...state, isMenu: e.target.value})}
                                    label="Quick Access"
                                    required
                                >
                                    <MenuItem value="" disabled><em>Add to Quick Menu?</em></MenuItem>
                                    <MenuItem value="0"><em>No</em></MenuItem>
                                    <MenuItem value="1"><em>Yes</em></MenuItem>
                                </MuiSelect>
                            </FormControl>
                        </Grid>
                        <Grid item md={4}>
                            <FormControl variant="outlined" style={{ minWidth: '100%' }}>
                                <InputLabel id="access">Access Level</InputLabel>
                                <MuiSelect
                                    labelId="accessLabel"
                                    id="access"
                                    value={state.isAdministration}
                                    onChange={e => setState({...state, isAdministration: e.target.value})}
                                    label="Access Level"
                                    required
                                >
                                    <MenuItem value="" disabled><em>Choose Access Level</em></MenuItem>
                                    <MenuItem value="0"><em>General</em></MenuItem>
                                    <MenuItem value="1"><em>Administrator</em></MenuItem>
                                </MuiSelect>
                            </FormControl>
                        </Grid>
                        <Grid item md={4}>
                            <FormControl variant="outlined" style={{ minWidth: '100%' }}>
                                <InputLabel id="authorization">Authentication</InputLabel>
                                <MuiSelect
                                    labelId="authorizationLabel"
                                    id="authorization"
                                    value={state.isAuthRequired}
                                    onChange={e => setState({...state, isAuthRequired: e.target.value})}
                                    label="Authentication"
                                    required
                                >
                                    <MenuItem value="" disabled><em>Authentication</em></MenuItem>
                                    <MenuItem value="0"><em>Public</em></MenuItem>
                                    <MenuItem value="1"><em>Staff</em></MenuItem>
                                </MuiSelect>
                            </FormControl>
                        </Grid>

                        <Grid item md={4}>
                            <FormControl variant="outlined" style={{ minWidth: '100%' }}>
                                <InputLabel id="moduleType">Module Type</InputLabel>
                                <MuiSelect
                                    labelId="moduleTypeLabel"
                                    id="moduleType"
                                    value={state.type}
                                    onChange={e => setState({...state, type: e.target.value})}
                                    label="Module Type"
                                    required
                                >
                                    <MenuItem value="" disabled><em>Choose Module Type</em></MenuItem>
                                    
                                    {moduleTypes.map((mtyp, index) => (
                                        <MenuItem key={index} value={mtyp}><em>{mtyp.toUpperCase()}</em></MenuItem>
                                    ))}
                                </MuiSelect>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        {state.type !== "" && state.type !== "page" ? 
                            <Grid item md={12}>
                                <Form.Group variant="outlined" style={{ minWidth: '100%' }}>
                                    <Form.Label>Departments</Form.Label>
                                    <Select 
                                        components={makeAnimated()}
                                        theme={customTheme}
                                        options={filterDepts(fetchedDepartments)}
                                        placeholder="Select Departments Access"
                                        onChange={setDepartments}
                                        value={departments}
                                        isSearchable
                                        isMulti
                                        autoFocus
                                    />
                                </Form.Group>
                            </Grid>
                        :
                            <Grid item md={12}>
                                <Form.Group>
                                    <Form.Label>Roles</Form.Label>
                                    <Select 
                                        components={makeAnimated()}
                                        theme={customTheme}
                                        options={filterDepts(fetchedRoles)}
                                        placeholder="Select Roles Access"
                                        onChange={setRoles}
                                        value={roles}
                                        isSearchable
                                        isMulti
                                        autoFocus
                                    />
                                </Form.Group>
                            </Grid>
                        }
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item md={12}>
                            <ButtonGroup
                                variant="contained"
                            >

                                <Button
                                    type="submit"
                                    color="primary"
                                >
                                    <FiSend style={{ marginRight: 10 }} />
                                    {state.isUpdating ? 'Update' : 'Create'} Module
                                </Button>
                                <Button
                                    type="button"
                                    color="secondary"
                                    onClick={() => setState({
                                        ...state, 
                                        id: 0,
                                        name: "",
                                        path: "",
                                        component: "",
                                        parentId: 0,
                                        isMenu: 0,
                                        isAuthRequired: 0,
                                        isAdministration: 0,
                                        generatePermissions: 0,
                                        showForm: false,
                                        isUpdating: false,
                                        type: ""
                                    })}
                                >
                                    <FiX style={{ marginRight: 10 }} />
                                    Close
                                </Button>

                            </ButtonGroup>
                        </Grid>
                    </Grid>
                </form>
            : null}

            <Grid container spacing={3}>
                <Grid item md={12}>
                    <TableComponent 
                        columns={columns}
                        rows={modules}
                        callToAction={handleUpdate}
                        callToDelete={handleDestroy}
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default Modules
