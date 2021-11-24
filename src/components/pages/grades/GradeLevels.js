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
import { Grid, Button, TextField, ButtonGroup } from '@material-ui/core'
import TableComponent from '../../../widgets/components/TableComponent'

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

    const columns = [
        {
            name: 'Name',
            label: 'name'
        },
        {
            name: 'Code',
            label: 'code'
        }
    ]

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
            <Button 
                variant="contained"
                color="primary"
                style={{ marginBottom: 30 }}
                onClick={() => setState({...state, showForm: true})}
            >
                <FiPlus style={{ marginRight: 8 }} />
                Add Grade Level
            </Button>

            {state.showForm ? 
            <div className="mb-5">
                <form onSubmit={state.id !== 0 ? handleUpdateSubmit : handleSubmit}>
                    <Grid container spacing={3} className="mb-3">
                        <Grid item md={8}>
                            <TextField 
                                label="Grade Level Name"
                                variant="outlined"
                                value={state.name} 
                                onChange={(e) => setState({...state, name: e.target.value})}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item md={4}>
                            <TextField 
                                label="Grade Level Code"
                                variant="outlined"
                                value={state.code} 
                                onChange={(e) => setState({...state, code: e.target.value})}
                                fullWidth
                                required
                            />
                        </Grid>

                    </Grid>
                    <Grid container spacing={3}>

                        <Grid item md={12}>
                            <ButtonGroup>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    <FiSend style={{ marginRight: 10 }} />
                                    {state.id !== 0 ? 'Update' : 'Add'} Grade Level
                                </Button>
                                <Button
                                    type="button"
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => setState({...state, showForm: false})}
                                >
                                    <FiX style={{ marginRight: 10 }} />
                                    Close
                                </Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                </form>
            </div>
            : null}
            
            <Grid container spacing={3}>
                <Grid item md={12}>
                    <TableComponent 
                        columns={columns}
                        rows={props.gradeLevels.collection}
                        callToAction={handleUpdate}
                        callToDelete={handleDestroy}
                    />
                </Grid>
            </Grid>
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
