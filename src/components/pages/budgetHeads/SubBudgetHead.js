/* eslint-disable react-hooks/exhaustive-deps */
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField, Button, ButtonGroup, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { FiSend } from 'react-icons/fi'
import { connect } from 'react-redux'
import * as broadcast from '../../../redux/accessControl/types'
import { index, store, update } from '../../../redux/actions'

const useStyles = makeStyles(theme => ({
    formControl: {
        minWidth: '100%',
    },
    marginGutter: {
        marginBottom: theme.spacing(3)
    }
}))

const SubBudgetHead = (props) => {

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
    const classes = useStyles()

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

            <div>
                <form onSubmit={actionType !== "" ? handleUpdate : handleSubmit}>
                    <Grid container spacing={3} className={classes.marginGutter}>
                        <Grid item md={4}>
                            <TextField
                                label="Budget Code"
                                variant="outlined" 
                                value={state.budgetCode}
                                onChange={e => setState({...state, budgetCode: e.target.value})}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item md={4}>
                            <TextField
                                label="Name"
                                variant="outlined"
                                value={state.name}
                                onChange={e => setState({...state, name: e.target.value})}
                                fullWidth
                                required
                            />
                        </Grid>

                        <Grid item md={4}>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Budget Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={state.type}
                                    onChange={e => setState({...state, type: e.target.value})}
                                    label="Budget Type"
                                >
                                    <MenuItem value="0" disabled>
                                        <em>Select Budget Type</em>
                                    </MenuItem>
                                    {defaults.budgetTypes.map((btype, i) => (
                                        <MenuItem key={i} value={btype}>{btype}</MenuItem>
                                    ))}

                                </Select>
                            </FormControl>
                        </Grid>

                    </Grid>
                    <Grid container spacing={3} className={classes.marginGutter}>
                        <Grid item md={8}>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label-2">Department</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label-2"
                                    id="demo-simple-select-outlined-2"
                                    value={state.department_id}
                                    onChange={e => setState({...state, department_id: e.target.value})}
                                    label="Department"
                                >
                                    <MenuItem value="0" disabled>
                                        <em>Select Department</em>
                                    </MenuItem>
                                    {props.departments.length !== 0 ? props.departments.map(department => (
                                        <MenuItem key={department.id} value={department.id}>{department.name}</MenuItem>
                                    )) : null}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item md={4}>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label-3">Logistics Budget</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label-3"
                                    id="demo-simple-select-outlined-3"
                                    value={state.logisticsBudget}
                                    onChange={e => setState({...state, logisticsBudget: e.target.value})}
                                    label="Logistics Budget"
                                >
                                    <MenuItem value="0" disabled><em>Is Logistics Budget?</em></MenuItem>
                                    {defaults.logistics.map((logist, i) => (<MenuItem key={i} value={logist.value}>{logist.label}</MenuItem>))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item md={12} className={classes.marginGutter}>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label-4">Budget Head</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label-4"
                                    id="demo-simple-select-outlined-4"
                                    value={state.budget_head_id}
                                    onChange={e => setState({...state, budget_head_id: e.target.value})}
                                    label="Budget Head"
                                >
                                    <MenuItem value="0" disabled><em>Select Budget Head</em></MenuItem>
                                    { props.budgetHeads.length !== 0 ? props.budgetHeads.map(budgetHead => (<MenuItem key={budgetHead.id} value={budgetHead.id}>{budgetHead.name}</MenuItem>)) : null}

                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item md={12}>
                            <TextField
                                id="outlined-textarea"
                                label="Description"
                                multiline
                                rows={5}
                                variant="outlined"
                                value={state.description}
                                onChange={e => setState({...state, description: e.target.value})}
                                required
                                fullWidth
                            />
                        </Grid>

                        <Grid item md={12}>
                            <ButtonGroup>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    <FiSend style={{ marginRight: 15 }} />
                                    { actionType !== "" ? 'Update' : 'Create'} Sub Budget Head
                                </Button>
                                <Button
                                    type="button"
                                    variant="contained"
                                    color="secondary"
                                >
                                    <FiSend style={{ marginRight: 15 }} />
                                    Cancel
                                </Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
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
