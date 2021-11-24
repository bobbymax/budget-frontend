/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { connect } from 'react-redux'
import {destroy, index, store, update} from '../../redux/actions'
import * as broadcast from '../../redux/accessControl/types'
import { 
    Card, 
    CardContent, 
    Grid, 
    makeStyles, 
    Typography, 
    ButtonGroup, 
    Button, 
    Paper, 
    CardActionArea, 
    CardHeader, 
    Avatar, 
    IconButton,
    CardActions
} from "@material-ui/core"
import LineChart from "../../widgets/charts/LineChart"
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import CardComponent from "../../widgets/components/CardComponent"
import { useHistory } from "react-router-dom"
import AccountBalanceIcon from '@material-ui/icons/AccountBalance'
import Requests from "../../services/classes/Requests"

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    title: {
        fontSize: 10,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    pos: {
        marginBottom: 20,
    },
    strToUpper: {
        textTransform: 'uppercase'
    },
    textColor: {
        color: theme.palette.primary.main
    },
    centralise: {
        textAlign: 'center'
    },
    cardBackgrounds: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.getContrastText(theme.palette.primary.main)
    }
}))


const Dashboard = (props) => {

    const auth = useSelector(state => state.access.staff.authenticatedUser)
    const classes = useStyles()
    const history = useHistory()

    const [summary, setSummary] = useState({})
    const [displayChart, setDisplayChart] = useState({})

    const goToPage = slug => {
        // console.log(slug)
        history.push(slug)
    }

    useEffect(() => {
        props.index('modules', {
            success: broadcast.FETCH_MODULES,
            failed: broadcast.FETCH_MODULES_FAILED
        })
    }, [])

    useEffect(() => {
        Requests.index('budgetSummary')
        .then(res => {
            setSummary(res.data.data)
        })
        .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        Requests.store('getPerformance', {report: 'month'})
        .then(res => {
            // console.log(res.data.data)
            setDisplayChart(res.data.data)
        })
        .catch(err => console.log(err))
    }, [])

    return (
        <>
            <Grid container spacing={3} className={classes.pos}>
                <Grid item md={9}>
                    <Typography
                        variant="h5"
                        component="h1"
                        color="textSecondary"
                    >
                        Welcome back - {auth.name}
                    </Typography>
                </Grid>
                <Grid item md={3}>
                    <Button
                        onClick={() => history.push('/import/dependencies')}
                        variant="contained"
                        color="primary"
                        style={{ float: 'right' }}
                    >
                        <CloudUploadIcon style={{ marginRight: 8 }} />
                        Import Dependencies
                    </Button>
                </Grid>
            </Grid>

            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item md={6}>
                        <Card
                            color="primary"
                        >
                            <CardContent>
                                <Grid container spacing={3}>
                                    <Grid item md={8}>
                                        <Typography className={`${classes.title} ${classes.strToUpper}`} variant="body2" component="p" color="textSecondary" gutterBottom>
                                            Approved Budget
                                        </Typography>
                                        <Typography variant="h4" component="h1" className={classes.textColor} style={{ marginBottom: 20 }}>
                                            NGN {summary && summary.approved ? new Intl.NumberFormat().format(summary.approved) : null}
                                        </Typography>
                                    </Grid>
                                    <ButtonGroup></ButtonGroup>
                                    {/* <Grid item md={4}>
                                        <ButtonGroup
                                            variant="outlined"
                                            color="primary"
                                            size="small"
                                            style={{ float: 'right' }}
                                        >
                                            <Button>MONTHLY</Button>
                                            <Button>YEARLY</Button>
                                        </ButtonGroup>
                                    </Grid> */}
                                </Grid>
                                <LineChart paramss={displayChart} />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item md={6}>
                        <Grid container spacing={3} style={{ marginBottom: 1 }}>
                            <Grid item md={3}>
                                <Card component={Paper} className={`${classes.centralise} ${classes.cardBackgrounds}`}>
                                    <CardActionArea>
                                        <CardContent>
                                            <Typography variant="body2" className={`${classes.title}`}>
                                                TOTAL NUMBER OF PAYMENT FORM
                                            </Typography>
                                            <Typography variant="h3">
                                                -45-
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                            <Grid item md={3}>
                                <Card component={Paper} className={classes.centralise}>
                                    <CardActionArea>
                                        <CardContent>
                                            <Typography variant="body2" color="textSecondary" className={`${classes.title}`}>
                                                NO OF THIRD PARTY FORM
                                            </Typography>
                                            <Typography variant="h3" color="primary">
                                                31
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                            <Grid item md={3}>
                                <Card component={Paper} className={classes.centralise}>
                                    <CardActionArea>
                                        <CardContent>
                                            <Typography variant="body2" color="textSecondary" className={`${classes.title}`}>
                                                NO OF STAFF PARTY FORM
                                            </Typography>
                                            <Typography variant="h3" color="primary">
                                                -199-
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                            <Grid item md={3}>
                                <Card component={Paper} className={classes.centralise}>
                                    <CardActionArea>
                                        <CardContent>
                                            <Typography variant="body2" color="textSecondary" className={`${classes.title}`}>
                                                NO. OF PENDING TRANSACTION
                                            </Typography>
                                            <Typography variant="h3" color="primary">
                                                62
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        </Grid>
                        <Card>
                            <CardHeader 
                                avatar={
                                    <Avatar aria-label="budget-summary" className={classes.cardBackgrounds}>
                                        BS
                                    </Avatar>
                                }
                                action={
                                    <IconButton aria-label="settings">
                                        <AccountBalanceIcon />
                                    </IconButton>
                                }
                                title="Budget Summary"
                                subheader="September 28, 2021"
                            />
                            <CardContent>
                                <Grid container spacing={3}>
                                    <Grid item md={6}>
                                        <Typography variant="body1" color="primary" style={{ fontWeight: 'bolder' }}>Approved Amount</Typography>
                                        <Typography variant="body2" color="textSecondary">NGN {summary && summary.approved ? new Intl.NumberFormat().format(summary.approved) : null}</Typography>
                                        <Typography variant="body1" color="primary" style={{ fontWeight: 'bolder' }}>Booked Expenditure</Typography>
                                        <Typography variant="body2" color="textSecondary">NGN {summary && summary.bookedExpenditure ? new Intl.NumberFormat().format(summary.bookedExpenditure) : null}</Typography>
                                        <Typography variant="body1" color="primary" style={{ fontWeight: 'bolder' }}>Actual Expenditure</Typography>
                                        <Typography variant="body2" color="textSecondary">NGN {summary && summary.actualExpenditure ? new Intl.NumberFormat().format(summary.actualExpenditure) : null}</Typography>
                                    </Grid>
                                    <Grid item md={6}>
                                        <Typography variant="body1" color="primary" style={{ fontWeight: 'bolder' }}>Booked Balance</Typography>
                                        <Typography variant="body2" color="textSecondary">NGN {summary && summary.bookedBalance ? new Intl.NumberFormat().format(summary.bookedBalance) : null}</Typography>
                                        <Typography variant="body1" color="primary" style={{ fontWeight: 'bolder' }}>Actual Balance</Typography>
                                        <Typography variant="body2" color="textSecondary">NGN {summary && summary.actualBalance ? new Intl.NumberFormat().format(summary.actualBalance) : null}</Typography>
                                        <Typography variant="body1" color="primary" style={{ fontWeight: 'bolder' }}>Expected Performance</Typography>
                                        <Typography variant="body2" color="textSecondary">{summary && summary.expectedPerf ? summary.expectedPerf : 0}%</Typography>
                                        <Typography variant="body1" color="primary" style={{ fontWeight: 'bolder' }}>Actual Performance</Typography>
                                        <Typography variant="body2" color="textSecondary">{summary && summary.actualPerf ? summary.actualPerf : 0}%</Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <CardActions>
                                <Button
                                    size="small"
                                    color="primary"
                                    style={{ margin: '0 auto' }}
                                    variant="outlined"
                                    onClick={() => {
                                        history.push({
                                            pathname: '/overview',
                                            state: {
                                                budgetHeads: summary.budgetHeads
                                            }
                                        })
                                    }}
                                    fullWidth
                                >
                                    CLICK TO VIEW
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>


                <Grid container spacing={3}>
                    {props.modules.collection.length !== 0 ? props.modules.collection.map(module => {
                        if (module.parentId === 0) {
                            return (
                                <Grid 
                                    item 
                                    xs={12} 
                                    md={4} 
                                    lg={3}
                                    key={module.id}
                                >
                                    <CardComponent 
                                        auth={auth}
                                        module={module}
                                        pageLink={goToPage}
                                    />
                                </Grid>
                            )
                        } else {
                            return null
                        }
                    }) : null}
                </Grid>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        modules: state.access.modules
    }
}

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
)(Dashboard)