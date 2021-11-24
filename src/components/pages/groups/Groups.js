/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Requests from '../../../services/classes/Requests'
import Alerts from '../../../services/classes/Alerts'
import { Button, Grid, Typography } from '@material-ui/core'
import TableComponent from '../../../widgets/components/TableComponent'
import GroupAddIcon from '@material-ui/icons/GroupAdd';

export const Groups = (props) => {

    const [data, setData] = useState([])

    const columns = [
        {
            name: 'Name',
            label: 'name'
        },
        {
            name: 'Slots',
            label: 'max_slots'
        }
    ]

    const handleUpdate = (group) => {
        props.history.push({
            pathname: `groups/${group.label}/update`,
            state: {
                group: group,
                actionType: "update"
            }
        })

    }

    const handleDestroy = (group) => {
        Alerts.flash('Are you sure?', 'warning', "You won't be able to revert this!")
        .then(result => {
            if (result.isConfirmed) {
                Requests.destroy('groups', group.id)
                .then(res => {
                    setData([...data.filter(group => group.id !== res.data.data.id)])
                    Alerts.success('Deleted!', res.data.message)
                })
                .catch(err => {
                    console.log(err)
                })
            }
        })
    }

    useEffect(() => {
        Requests.index('groups')
        .then(res => {
            setData(res.data.data)
        })
        .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        if(props.location && props.location.state) {
            const group = props.location.state.group
            const status = props.location.state.status

            if (status === 'created') {
                setData([group, ...data])
                Alerts.success('Created', 'Group Created Successfully!!')
            } else {
                setData(data.map(el => {
                    if (group.id === el.id) {
                        return group
                    }
    
                    return group
                }))
                Alerts.success('Updated', 'Group Updated Successfully!!')
            }
        }
    }, [props.location])

    return (
        <>
            <Typography
                variant="h5"
                component="h2"
                color="primary"
                style={{ marginBottom: 10 }}
            >
                Groups
            </Typography>

            <Button
                variant="contained"
                color="primary"
                onClick={() => props.history.push('/groups/create')}
                style={{ marginBottom: 20 }}
            >
                <GroupAddIcon style={{ marginRight: 8 }} />
                Add Group
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

export default Groups
