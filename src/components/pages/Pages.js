/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Grid, makeStyles } from "@material-ui/core"
import { connect, useSelector } from 'react-redux'
import {fetch} from '../../redux/actions'
import * as broadcast from '../../redux/accessControl/types'
import CardComponent from '../../widgets/components/CardComponent'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}))

const Pages = props => {

    const param = props.match.params.id
    const auth = useSelector(state => state.access.staff.authenticatedUser)
    const classes = useStyles()
    const history = useHistory()

    const goToPage = slug => {
        // console.log(slug)
        history.push(slug)
    }

    useEffect(() => {
        if (param) {
            props.fetch('modules', param, {
                success: broadcast.FETCH_MODULE_RECORD,
                failed: broadcast.FETCH_MODULE_RECORD_FAILED
            })
        }
    }, [param])

    return (
        <>
            <h4 className="mb-5">Pages</h4>
            <div className={classes.root}>
                <Grid container spacing={3}>
                    {props.module && props.module.children.length !== 0 ? props.module.children.map(child => {
                            return (
                                <Grid
                                    item
                                    sm={12}
                                    md={4}
                                    lg={3}
                                    key={child.id}
                                    
                                >
                                    <CardComponent 
                                        auth={auth}
                                        module={child}
                                        parent={param}
                                        pageLink={goToPage}
                                    />
                                </Grid>
                            )
                    }) : null}
                </Grid>
            </div> 
        </>
    )
}

const mapStateToProps = state => ({
    module: state.access.modules.module
})

const mapDispatchToProps = dispatch => {
    return {
        fetch: (entity, id, broadcast) => dispatch(fetch(entity, id, broadcast))
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(Pages)

