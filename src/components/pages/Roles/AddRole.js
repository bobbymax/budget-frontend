import React, { useState } from 'react'
import { Modal, Form } from 'react-bootstrap'
import { 
    FormControl, 
    Grid, 
    InputLabel, 
    Select, 
    TextField, 
    Typography, 
    MenuItem,
    ButtonGroup,
    Button
} from '@material-ui/core'

const AddRole = (props) => {

    const adminOptions = [
        { label: 'Super', value: 1 },
        { label: 'Basic', value: 0 }
    ]
 
    const initialState =  {
        name: "",
        max_slots:  "",
        isSuper: "",
        start_date: "",
        expiry_date: "",
        cannot_expire: false,
    }

    const [state, setState] = useState(initialState)

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            name: state.name,
            max_slots: state.max_slots,
            start_date: state.start_date,
            expiry_date: state.expiry_date,
            isSuper: state.isSuper,
            cannot_expire: state.cannot_expire ? 1 : 0
        }

        props.onSubmit(data)
        setState(initialState)
        props.onHide()
    }

    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Form onSubmit={handleSubmit}>
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            <Typography
                                variant="h5"
                                component="h2"
                                color="primary"
                            >
                                Add Role
                            </Typography>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Grid container spacing={3}>
                            <Grid item md={4}>
                                <TextField 
                                    variant="outlined"
                                    value={state.name}
                                    onChange={(e) => setState({...state, name: e.target.value})}
                                    label="Role Name"
                                    // helperText="Enter Role Name Here"
                                    fullWidth
                                    required
                                    // error
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

                            <Grid item md={6}>
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

                            <Grid item md={6}>
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
                            <Grid item md={12} style={{ marginTop: 10 }}>
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
                                        <MenuItem value="0" disabled>
                                            <em>Can Role Expire?</em>
                                        </MenuItem>
                                        <MenuItem value={true}><em>Yes</em></MenuItem>
                                        <MenuItem value={false}><em>No</em></MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Modal.Body>
                    <Modal.Footer>
                        <ButtonGroup>
                            <Button 
                                variant="contained" 
                                type="submit" 
                                color="primary"
                                disabled={state.name === "" || state.max_slots === "" || state.isSuper === "" || state.start_date === "" }
                            >
                                Submit
                            </Button>
                            <Button 
                                variant="contained" 
                                color="secondary" 
                                onClick={props.onHide}
                            >
                                Close
                            </Button>
                        </ButtonGroup>
                    </Modal.Footer>
                </Form>
            </Modal>
      
        </>
    )
}

export default AddRole
