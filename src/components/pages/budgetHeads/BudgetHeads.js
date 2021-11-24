/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import * as broadcast from '../../../redux/accessControl/types'
import { connect } from 'react-redux'
import { index } from "../../../redux/actions"
import { makeStyles } from '@material-ui/core'
import {useHistory} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TableComponent from '../../../widgets/components/TableComponent'
import PublishIcon from '@material-ui/icons/Publish'
import Typography from '@material-ui/core/Typography'


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    gapsRight: {
        marginRight: theme.spacing(2),
    },
    gapsBottom: {
        marginBottom: theme.spacing(3)
    }
}))

const BudgetHeads = (props) => {

    const [data, setData] = useState([])
    const classes = useStyles()
    const history = useHistory()

    const columns = [
        {
            name: 'Code',
            label: 'budgetId'
        },
        {
            name: 'Description',
            label: 'name'
        }
    ]

    const handleUpdate = (budgetHead) => {
        props.history.push({
            pathname: `budget-heads/${budgetHead.label}/update`,
            state: {
                budgetHead: budgetHead
            }
        })
    }

    const handleDelete = data => {
        console.log(data)
    }


    useEffect(() => {
        props.index('budgetHeads', {
            success: broadcast.FETCH_BUDGET_HEADS,
            failed: broadcast.FETCH_BUDGET_HEADS_FAILED
        })
    }, [])

    useEffect(() => {
        if (props.budgetHeads.collection.length > 0) {
            setData(props.budgetHeads.collection)
        }
    }, [props.budgetHeads.collection])

    return (
        <>
            <Typography
                variant="h5"
                component="h2"
                className={classes.gapsBottom}
            >
                Budget Heads
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => history.push('/budget-heads/import')}
                className={classes.gapsBottom}
            >
                <PublishIcon className={classes.gapsRight} />
                Import BH
            </Button>

            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item md={12}>
                        <TableComponent 
                            columns={columns} 
                            rows={data} 
                            callToAction={handleUpdate}
                            callToDelete={handleDelete}
                        />
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        budgetHeads: state.budgetting.budgetHeads
    }
}

const mapDispatchToProps = dispatch => {
    return {
        index: (entity, broadcast) => dispatch(index(entity, broadcast)),
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(BudgetHeads)
