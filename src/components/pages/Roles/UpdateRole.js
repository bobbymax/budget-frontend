/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react'
import { 
    Grid, 
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    ButtonGroup,
    Button
} from '@material-ui/core'
import Requests from '../../../services/classes/Requests'

const UpdateRole = (props) => {

    const adminOptions = [
        { label: 'Super', value: 1 },
        { label: 'Basic', value: 0 }
    ]

    const expiryDates = [
        {label: 'Yes', value: 1},
        {label: 'No', value: 0}
    ]


    const initialState =  {
        id: 0,
        label: "",
        name: "",
        max_slots: 0,
        isSuper: 0,
        start_date: "",
        expiry_date: "",
        cannot_expire: 0,
    }

    const [state, setState] = useState(initialState)

    const handleUpdate = (e) => {
        e.preventDefault()

        const data = {
            name: state.name,
            max_slots: state.max_slots,
            start_date: state.start_date,
            expiry_date: state.expiry_date,
            isSuper: state.isSuper,
            cannot_expire: state.cannot_expire
        }

        Requests.update('roles', state.id, data)
        .then(res => {
            props.history.push({
                pathname: '/roles',
                state: {
                    role: res.data.data,
                }
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        if(props.location && props.location.state) {
            const role = props.location.state.role
            setState({
                ...state,
                id: role.id,
                label: role.label,
                name: role.name,
                max_slots: role.max_slots,
                isSuper: role.isSuper,
                start_date: role.start_date,
                expiry_date: role.expiry_date ?? "",
                cannot_expire: role.cannot_expire
            })
        }
    }, [props.location])

    return (
        <>
            <form onSubmit={handleUpdate}>
                <Grid container spacing={3}>
                    <Grid item md={4}>
                        <TextField 
                            variant="outlined"
                            value={state.name}
                            onChange={(e) => setState({...state, name: e.target.value})}
                            label="Role Name"
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item md={4}>
                        <TextField 
                            variant="outlined"
                            value={state.max_slots}
                            onChange={(e) => setState({...state, max_slots: e.target.value})}
                            label="Maximum Slots"
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item md={4}>
                        <FormControl variant="outlined" style={{ minWidth: '100%' }}>
                            <InputLabel id="authorization">Authorization</InputLabel>
                            <Select
                                labelId="authorizationLabel"
                                id="authorization"
                                value={state.isSuper}
                                onChange={(e) => setState({ ...state, isSuper: e.target.value })}
                                label="Authorization"
                                required
                            >
                                <MenuItem value="0">
                                    <em>Select Role Level</em>
                                </MenuItem>
                                {adminOptions.map((option, i) => (
                                    <MenuItem key={i} value={option.value}>{option.label}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item md={4}>
                        <TextField 
                            variant="outlined"
                            id="start-date"
                            label="Start Date"
                            type="date"
                            value={state.start_date}
                            onChange={(e) => setState({...state, start_date: e.target.value})}
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
                            id="expiry-date"
                            label="Expiry Date"
                            type="date"
                            value={state.expiry_date}
                            onChange={(e) => setState({...state, expiry_date: e.target.value})}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item md={4}>
                        <FormControl variant="outlined" style={{ minWidth: '100%' }}>
                            <InputLabel id="authorization">Can Role Expire</InputLabel>
                            <Select
                                labelId="cannotExpireLabel"
                                id="cannot-expire"
                                value={state.cannot_expire}
                                onChange={(e) => setState({...state, cannot_expire: e.target.value})}
                                label="Cannot Expire"
                                required
                            >
                                <MenuItem value="9" disabled>
                                    <em>Can Role Expire?</em>
                                </MenuItem>
                                {expiryDates.map((option, i) => (
                                    <MenuItem key={i} value={option.value}>{option.label}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item md={12}>
                        <ButtonGroup>
                            <Button variant="contained" color="primary" type="submit">
                                Update Role
                            </Button>
                            <Button variant="contained" color="secondary">
                                Cancel
                            </Button>
                        </ButtonGroup>
                    </Grid>
                </Grid>
            </form>
        </>
    )
}

export default UpdateRole
