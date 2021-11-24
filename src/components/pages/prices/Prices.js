/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { FiPlus } from 'react-icons/fi'
import { destroy, index, store, update } from '../../../redux/actions'
import * as broadcast from '../../../redux/entitlements/types'
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField, Button, ButtonGroup, makeStyles } from '@material-ui/core'
import TableComponent from '../../../widgets/components/TableComponent'


const useStyles = makeStyles(theme => ({
    formControl: {
        minWidth: '100%',
    }
}))

export const Prices = (props) => {

    const initialState = {
        id: 0,
        benefit_id: 0,
        amount: 0,
        showForm: false,
        isUpdating: false,
        dependencies: []
    }

    const [state, setState] = useState(initialState)
    const classes = useStyles()

    const columns = [
        {
            name: 'Benefit',
            label: 'benefit_name'
        },
        {
            name: 'Amount',
            label: 'amount'
        }
    ]

    const handleSubmit = e => {
        e.preventDefault()

        const data = {
            benefit_id: state.benefit_id,
            amount: state.amount
        }

        props.store('priceLists', data, {
            success: broadcast.CREATE_WAGE_RECORD,
            failed: broadcast.CREATE_WAGE_RECORD_FAILED
        })

        setState({
            ...state,
            id: 0,
            benefit_id: 0,
            amount: 0,
            showForm: false,
        })
    }

    const handleUpdateState = data => {
        setState({
            ...state,
            id: data.id,
            benefit_id: data.benefit_id,
            amount: data.amount,
            showForm: true,
            isUpdating: true
        })
    }

    const handleUpdate = e => {
        e.preventDefault()

        const data = {
            benefit_id: state.benefit_id,
            amount: state.amount
        }

        props.update('priceLists', state.id, data, {
            success: broadcast.UPDATE_WAGE_RECORD,
            failed: broadcast.UPDATE_WAGE_RECORD_FAILED
        })

        setState({
            ...state,
            id: 0,
            benefit_id: 0,
            amount: 0,
            showForm: false,
            isUpdating: false
        })
    }

    const handleDestroy = data => {
        props.destroy('priceLists', data.id, {
            success: broadcast.DELETE_WAGE_RECORD,
            failed: broadcast.DELETE_WAGE_RECORD_FAILED
        })
    }


    useEffect(() => {
        props.index('priceLists', {
            success: broadcast.FETCH_WAGES,
            failed: broadcast.FETCH_WAGES_FAILED
        })
    }, [])

    useEffect(() => {
        if (props.wages.wages.collection !== 0) {

            props.index('benefits', {
                success: broadcast.FETCH_BENEFITS,
                failed: broadcast.FETCH_BENEFITS_FAILED
            })
        }
    }, [])

    return (
        <>
            <h1>Price Listing</h1>
            <Button 
                type="button" 
                variant="contained" 
                color="primary"
                style={{ marginBottom: 30 }}
                onClick={() => setState({...state, showForm: true})}
                disabled={state.isUpdating ? true : false}
            >
                <FiPlus style={{ marginRight: 8 }} />
                Add Price
            </Button>

            {state.showForm ? 
                <div>
                    <form onSubmit={state.isUpdating ? handleUpdate : handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item md={6}>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-outlined-label">Benefit</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={state.benefit_id}
                                        onChange={e => setState({...state, benefit_id: e.target.value})}
                                        label="Benefit"
                                    >
                                        <MenuItem value="0">
                                            <em>Select Benefit</em>
                                        </MenuItem>
                                        {props.wages.benefits.collection.length !== 0 ? props.wages.benefits.collection.map(benefit => (
                                            <MenuItem key={benefit.id} value={benefit.id}>{benefit.name}</MenuItem>
                                        )) : null}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item md={6}>
                                <TextField 
                                    label="Amount"
                                    variant="outlined"
                                    value={state.amount} 
                                    onChange={(e) => setState({...state, amount: e.target.value})}
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
                                        {state.isUpdating ? 'Update' : 'Add'} Price
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => setState({
                                            ...state,
                                            id: 0,
                                            benefit_id: 0,
                                            amount: 0,
                                            showForm: false,
                                            isUpdating: false
                                        })}
                                    >
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
                        rows={props.wages.wages.collection}
                        callToAction={handleUpdateState}
                        callToDelete={handleDestroy}
                    />
                </Grid>
            </Grid>
        </>
    )
}

const mapStateToProps = state => {
    return {
        wages: state.entitlements,
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
)(Prices)
