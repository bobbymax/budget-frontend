/* eslint-disable react-hooks/exhaustive-deps */
import { Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import Requests from '../../../services/classes/Requests'
import { formatCurrency } from '../../../services/helpers/functions'
import TableComponent from '../../../widgets/components/TableComponent'


const columns = [
    {
        name: 'Budget Code',
        label: 'budgetCode',
        type: 'string'
    },
    {
        name: 'Budget Name',
        label: 'name',
        type: 'string'
    },
    {
        name: 'Approved Amount',
        label: 'approved_amount',
        type: 'currency'
    },
    {
        name: 'Booked Expenditure',
        label: 'booked_expenditure',
        type: 'currency'
    },
    {
        name: 'Actual Expenditure',
        label: 'actual_expenditure',
        type: 'currency'
    },
    {
        name: 'Booked Balance',
        label: 'booked_balance',
        type: 'currency'
    },
    {
        name: 'Actual Balance',
        label: 'actual_balance',
        type: 'currency'
    },
    {
        name: 'Expected Performace',
        label: 'expected_performance',
        type: 'string'
    },
    {
        name: 'Actual Performance',
        label: 'actual_performance',
        type: 'string'
    },
]


const Overview = props => {

    const [data, setData] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [results, setResults] = useState([])
    const [departments, setDepartments] = useState([])
    const [department, setDepartment] = useState(0)

    const searchHandler = term => {
        setSearchTerm(term)

        if (term !== "") {
            const newFiltered = data.filter(row => {
                return Object.values(row)
                .join(" ")
                .toLowerCase()
                .includes(term.toLowerCase())
            })

            setResults(newFiltered)
        } else {
            setResults(data)
        }
    }

    // console.log(data)

    const handleChange = value => {
        if (value > 0) {
            // console.log(value)

            Requests.custom('departments', value, 'budget/summary')
            .then(res => {
                setData(res.data.data)
            })
            .catch(err => console.log(err))
        } 
    }

    useEffect(() => {
        if(props.location && props.location.state) {
            const budgetHeads = props.location.state.budgetHeads
            setData(budgetHeads)
        }
    }, [props.location])

    useEffect(() => {
        Requests.index('departments')
        .then(res => {
            setDepartments(res.data.data)
        })
        .catch(err => console.log(err))
    }, [])

    // console.log(data)

    return (
        <>
            <Typography
                variant="h4"
                component="h2"
                style={{ marginBottom: 40}}
            >
                Budget Summary
            </Typography>

            <Grid container spacing={3}>
                <Grid item md={6}>
                    <FormControl variant="outlined" style={{ width: '100%', marginBottom: 40 }}>
                        <InputLabel id="department">Departments</InputLabel>
                        <Select
                            labelId="departmentLabel"
                            id="department"
                            label="Departments"
                            value={department}
                            onChange={e => {
                                setDepartment(e.target.value)
                                handleChange(e.target.value)
                            }}
                            required
                        >
                            <MenuItem value="0" disabled><em>Select Department</em></MenuItem>
                            {departments.map(dept => (
                                <MenuItem key={dept.id} value={dept.id}><em>{dept.name}</em></MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item md={6}>
                    <Grid container spacing={2}>
                        <Grid item md={4}>
                            <Card component={Paper}>
                                <CardContent>
                                    <Typography
                                        variant="body2"
                                        style={{ fontSize: 10, textTransform: 'uppercase' }}
                                        color="primary"
                                    >
                                        Approved Amount
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        component="h2"
                                        style={{ fontSize: 18 }}
                                    >
                                        {data.length > 0 ? formatCurrency(data[0].totals.appAmount) : 'N ' + 0}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item md={4}>
                        <Card component={Paper}>
                                <CardContent>
                                    <Typography
                                        variant="body2"
                                        style={{ fontSize: 10, textTransform: 'uppercase' }}
                                        color="primary"
                                    >
                                        Actual Expenditure
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        component="h2"
                                        style={{ fontSize: 18 }}
                                    >
                                        {data.length > 0 ? formatCurrency(data[0].totals.actExp) : 'N ' + 0}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item md={4}>
                        <Card component={Paper}>
                                <CardContent>
                                    <Typography
                                        variant="body2"
                                        style={{ fontSize: 10, textTransform: 'uppercase' }}
                                        color="primary"
                                    >
                                        Actual Balance
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        component="h2"
                                        style={{ fontSize: 18 }}
                                    >
                                        {data.length > 0 ? formatCurrency(data[0].totals.actBal) : 'N ' + 0}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <TableComponent 
                columns={columns} 
                rows={searchTerm.length < 1 ? data : results} 
                term={searchTerm} 
                searchKeyword={searchHandler}
                exportable
            />
        </>
    )
}

export default Overview
