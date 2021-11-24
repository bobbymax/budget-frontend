/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core'
import * as broadcast from '../../../redux/accessControl/types'
import { connect } from 'react-redux'
import { update } from '../../../redux/actions'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    gaps: {
        marginBottom: theme.spacing(3)
    }
}))

export const BudgetHead = (props) => {

    const defaultState = {
        id: 0,
        budgetId: 0,
        name: "",
        label: ""
    }

    const [state, setState] = useState(defaultState)
    const classes = useStyles()

    useEffect(() => {
        if(props.location && props.location.state) {
            const budgetHead = props.location.state.budgetHead
            setState({
                ...state,
                id: budgetHead.id,
                budgetId: budgetHead.budgetId,
                name: budgetHead.name,
                label: budgetHead.label
            })
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = {
            name: state.name,
            budgetId: state.budgetId
        }

        props.update("budgetHeads", state.id, data, {
            success: broadcast.UPDATE_BUDGET_HEAD_RECORD,
            failed: broadcast.UPDATE_BUDGET_HEAD_RECORD_FAILED
        })
        props.history.push('/budget-heads')
    }

    return (
        <>
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={12} lg={12} className={classes.gaps}>
                        <Typography
                            variant="h5"
                            component="h2"
                            color="textSecondary"
                        >
                            Update Budget Head Details
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <form onSubmit={handleSubmit}>

                            <Grid container spacing={3}>
                                <Grid item md={3}>
                                    <TextField 
                                        label="Budget ID"
                                        variant="outlined"
                                        value={state.budgetId} 
                                        onChange={(e) => setState({...state, budgetId: e.target.value})} 
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item md={9}>
                                    <TextField 
                                        label="Budget Head"
                                        variant="outlined"
                                        value={state.name} 
                                        onChange={(e) => setState({...state, name: e.target.value})} 
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item md={12}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                    >
                                        Update BH
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        budgetHeads: state.budgetting.budgetHeads
    }
}

const mapDispatchToProps = dispatch => {
    return {
        update: (entity, id, data, broadcast) => dispatch(update(entity, id, data, broadcast))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BudgetHead)
