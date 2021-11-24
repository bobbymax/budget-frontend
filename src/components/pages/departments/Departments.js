/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Grid, Button, Typography } from '@material-ui/core'
import TableComponent from '../../../widgets/components/TableComponent'
import { ApartmentRounded } from '@material-ui/icons'
import Requests from '../../../services/classes/Requests'
import Alerts from '../../../services/classes/Alerts'

const Departments = (props) => {

    const history = useHistory()
    const [data, setData] = useState([])

    const columns = [
        {
            name: 'Name',
            label: 'name'
        },
        {
            name: 'Code',
            label: 'code'
        },
        {
            name: 'Type',
            label: 'type'
        },
        {
            name: 'Parent',
            label: 'parentId'
        }
    ]

    const handleUpdate = (department) => {
        props.history.push({
            pathname: `departments/${department.label}/update`,
            state: {
                department: department,
                actionType: "update"
            }
        })

    }

    const handleDestroy = (dept) => {
        Alerts.flash('Are you sure?', 'warning', "You won't be able to revert this!")
        .then(result => {
            if (result.isConfirmed) {
                Requests.destroy('departments', dept.id)
                .then(res => {
                    setData([...data.filter(department => department.id !== res.data.data.id)])
                    Alerts.success('Deleted!', res.data.message)
                })
                .catch(err => console.log(err))
            }
        })
    }

    useEffect(() => {
        Requests.index('departments')
        .then(res => {
            setData(res.data.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    useEffect(() => {
        if(props.location && props.location.state) {
            const department = props.location.state.department
            const status = props.location.state.status

            if (status === 'created') {
                setData([department, ...data])
                Alerts.success('Created', 'Department Created Successfully!!')
            } else {
                setData(data.map(el => {
                    if (department.id === el.id) {
                        return department
                    }
    
                    return department
                }))
                Alerts.success('Updated', 'Department Updated Successfully!!')
            }
        }
    }, [props.location])

    return (
        <>
            <Typography
                variant="h4"
                component="h2"
                style={{ marginBottom: 10 }}
            >
                    Departments
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => history.push('/departments/create')}
                style={{ marginBottom: 30 }}
            >
                <ApartmentRounded style={{ fontSize: 'medium' }} />
                <Typography
                    variant="body2"
                    style={{ marginLeft: 6 }}
                >
                    Add Department
                </Typography>
            </Button>

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

export default Departments
