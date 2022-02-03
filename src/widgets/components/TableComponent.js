import React, { useState } from 'react'
import { Grid, InputAdornment, makeStyles, TextField, Button } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Typography from '@material-ui/core/Typography'
import SearchIcon from '@material-ui/icons/Search'
import ImportExportIcon from '@material-ui/icons/ImportExport'
import { formatCurrency } from '../../services/helpers/functions'
import XLSX from 'xlsx'

const useStyles = makeStyles(theme => ({
    tableContainer: {
        borderRadius: 15,
        marginBottom: 40
    },
    tableHeaderCell: {
        fontWeight: '600',
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.getContrastText(theme.palette.primary.light)
    },
    values: {
        fontWeight: 'bolder',
        color: theme.palette.primary.dark
    }
}))

const TableComponent = ({
    columns, 
    rows, 
    callToAction=null, 
    callToDelete=null,
    term="",
    searchKeyword=null,
    exportable=false
}) => {

    const classes = useStyles()
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const getSearchTerm = e => {
        searchKeyword(e.target.value)
    }

    const exportToExcel = () => {

        const exportableData = rows.map(row => {
            delete row.id
            delete row.funds
            delete row.department
            delete row.budgetHead
            delete row.fund
            delete row.budget_head_id
            delete row.department_id
            delete row.totals

            return row
        })

        const workSheet = XLSX.utils.json_to_sheet(exportableData)
        const workBook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workBook, workSheet, "budget-overview")

        // Buffer
        // let buf = XLSX.write(workBook, {bookType: "xlsx", type: "buffer"})

        // Binary String
        XLSX.write(workBook, {bookType: "xlsx", type: "buffer"})

        // Download File
        XLSX.writeFile(workBook, "budgetOverview.xlsx")
    }

    return (
            <>

            <Grid container spacing={3}>
                <Grid item md={! exportable ? 12 : 10}>
                    <TextField 
                        variant="outlined"
                        label="Search"
                        size="small"
                        value={term}
                        onChange={getSearchTerm}
                        fullWidth
                        style={{ marginBottom: 15 }}
                        InputProps={{ 
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            )
                            }}
                    />
                </Grid>
                {exportable ? 
                    <Grid item md={2}>
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ float: 'right'}}
                            size="large"
                            onClick={() => exportToExcel()}
                            fullWidth
                        >
                            <ImportExportIcon style={{ marginRight: 5  }} />
                            EXPORT CSV
                        </Button>
                    </Grid>
                : null}
            </Grid>

            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {columns.map(column => (
                                <TableCell 
                                    key={column.label} 
                                    className={classes.tableHeaderCell}
                                >
                                    {column.name.toUpperCase()}
                                </TableCell>
                            ))}
                            {callToAction !== null ? (<TableCell className={classes.tableHeaderCell}>{'Action'.toUpperCase()}</TableCell>) : null}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <TableRow key={row.id}>
                                {columns.map(column => (
                                    <TableCell key={column.label}>
                                        <Typography variant="body2" className={classes.values}>
                                            {column.type && column.type === 'currency' ?  formatCurrency(row[column.label]) : row[column.label]}
                                        </Typography>
                                    </TableCell>))}
                                {callToAction !== null ? (
                                    <TableCell>
                                        <ButtonGroup>
                                            <IconButton
                                                onClick={() => callToAction(row)}
                                            >
                                                <EditRoundedIcon />
                                            </IconButton>
                                            <IconButton
                                                onClick={() => callToDelete(row)}
                                            >
                                                <DeleteRoundedIcon />
                                            </IconButton>
                                        </ButtonGroup>
                                    </TableCell>
                                ) : null}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination 
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
            </>
    )
}

export default TableComponent