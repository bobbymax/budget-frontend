/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react'
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField, ButtonGroup, Button, Typography } from '@material-ui/core'
import Requests from '../../../services/classes/Requests'

const Group = (props) => {

    const expiryDates = [
        {label: 'Yes', value: 1},
        {label: 'No', value: 0}
    ]


    const initialState =  {
        id: 0,
        label: "",
        name: "",
        max_slots: 0,
        start_date: "",
        expiry_date: "",
        cannot_expire: 0,
    }

    const [state, setState] = useState(initialState)
    const [actionType, setActionType] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = {
            name: state.name,
            max_slots: state.max_slots,
            start_date: state.start_date,
            expiry_date: state.expiry_date,
            cannot_expire: state.cannot_expire
        }

        Requests.store('groups', data)
        .then(res => {
            props.history.push({
                pathname: '/groups',
                state: {
                    group: res.data.data,
                    status: "created"
                }
            })
        })
        .catch(err => console.log(err))
    }

    const handleUpdate = (e) => {
        e.preventDefault()

        const data = {
            name: state.name,
            max_slots: state.max_slots,
            start_date: state.start_date,
            expiry_date: state.expiry_date,
            cannot_expire: state.cannot_expire
        }

        Requests.update('groups', state.id, data)
        .then(res => {
            props.history.push({
                pathname: '/groups',
                state: {
                    group: res.data.data,
                    status: "updated"
                }
            })
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {

        if(props.location && props.location.state) {
            const group = props.location.state.group
            const typer = props.location.state.actionType
            setState({
                ...state,
                id: group.id,
                label: group.label,
                name: group.name,
                max_slots: group.max_slots,
                start_date: group.start_date,
                expiry_date: group.expiry_date ?? "",
                cannot_expire: group.cannot_expire
            })

            setActionType(typer)
        }
    }, [props.location])

    return (
        <>
            <Typography
                variant="h4"
                component="h2"
                style={{ marginBottom: 30 }}
            >
                { actionType ? 'Update' : 'Create' } Group
            </Typography>
            <form onSubmit={ actionType ? handleUpdate : handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item md={8}>
                        <TextField
                            variant="outlined"
                            label="Group Name"
                            value={state.name}
                            onChange={(e) => { setState({...state, name: e.target.value}) } }
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item md={4}>
                        <TextField
                            variant="outlined"
                            label="Enter Max Slots"
                            value={state.max_slots}
                            onChange={(e) => { setState({...state, max_slots: e.target.value}) } }
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item md={4}>
                        <TextField
                            variant="outlined"
                            type="date"
                            label="Start Date"
                            value={state.start_date}
                            onChange={(e) => { setState({...state, start_date: e.target.value}) } }
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item md={4}>
                        <TextField
                            variant="outlined"
                            type="date"
                            label="Expiry Date"
                            value={state.expiry_date}
                            onChange={(e) => { setState({...state, expiry_date: e.target.value}) } }
                            InputLabelProps={{
                                shrink: true,
                            }}
                            disabled={state.cannot_expire === 1}
                            fullWidth
                            required
                        />
                    </Grid>

                    <Grid item md={4}>
                        <FormControl variant="outlined" style={{ minWidth: '100%' }}>
                            <InputLabel id="expiration">Cannot Expire?</InputLabel>
                            <Select
                                labelId="expirationLabel"
                                id="expiration"
                                value={state.cannot_expire}
                                onChange={(e) => { setState({...state, cannot_expire: e.target.value}) } }
                                label="Cannot Expire?"
                                required
                            >
                                <MenuItem value="" disabled><em>Group cannot Expire?</em></MenuItem>
                                {expiryDates.map((option, i) => (
                                    <MenuItem key={i} value={option.value}>{option.label}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item md={12}>
                        <ButtonGroup
                            variant="contained"
                        >
                            <Button color="primary" type="submit">
                                { actionType ? 'Update' : 'Create' } Group
                            </Button>
                            <Button 
                                color="secondary"
                                onClick={() => props.history.push('/groups')}
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

export default Group
