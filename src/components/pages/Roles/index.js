/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import AddRole from "./AddRole"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import TableComponent from "../../../widgets/components/TableComponent"
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import Requests from "../../../services/classes/Requests"
import Alerts from "../../../services/classes/Alerts"

const Roles = (props) => {
    const [modalShow, setModalShow] = useState(false)
    const [data, setData] = useState([])
    const [errors, setErrors] = useState(null)

    const columns = [
        {
            name: 'Name',
            label: 'name'
        },
        {
            name: 'Slot',
            label: 'max_slots'
        }
    ]

    const handleSubmit = (value) => {
        Requests.store('roles', value)
        .then(res => {
            setData([res.data.data, ...data])
            Alerts.success('Success', res.data.message)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const handleDestroy = (role) => {
        Alerts.flash('Are you sure?', 'warning', "You won't be able to revert this!")
        .then(result => {
            if (result.isConfirmed) {
                Requests.destroy('roles', role.label)
                .then(res => {
                    setData([...data.filter(role => role.id !== res.data.data.id)])
                    Alerts.success('Deleted!', res.data.message)
                })
                .catch(err => {
                    console.log(err)
                })
            }
        })
    }

    const handleUpdate = (role) => {
        props.history.push({
            pathname: `roles/${role.label}/update`,
            state: {
                role: role,
            }
        })
    }

    useEffect(() => {
        Requests.index('roles')
        .then(res => {
            setData(res.data.data)
        })
        .catch(err => {
            setErrors(err)
        })
    }, [])

    useEffect(() => {
        if (props.location && props.location.state) {
            const role = props.location.state.role
            setData(data.map(el => {
                if (role.id === el.id) {
                    return role
                }

                return role
            }))
        }
    }, [props.location])

    console.log(errors)

    return (
        <>
            <h1>Roles Section</h1>
            <Button 
                variant="contained"
                color="primary"
                onClick={() => setModalShow(true)} 
                style={{ marginBottom: 30 }}
            >
                <PersonAddIcon style={{ marginRight: 8, fontSize: 'medium' }} />
                Add Role
            </Button>
            

            <AddRole
                onSubmit={handleSubmit}
                show={modalShow}
                onHide={() => {
                    setModalShow(false)
                }}
            />

            <Grid container spacing={3}>
                <Grid item md={12}>
                    <TableComponent 
                        columns={columns}
                        rows={data}
                        callToAction={handleUpdate}
                        callToDelete={handleDestroy}
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default Roles