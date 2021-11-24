/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'
import { Col, Container, Row } from 'react-bootstrap'
import * as broadcast from '../../../redux/accessControl/types'
import { connect } from 'react-redux'
import { index, destroy } from "../../../redux/actions"
import Grid from '@material-ui/core/Grid'
import TableComponent from '../../../widgets/components/TableComponent'
// import SubBudgetHeadsWidget from '../../widgets/SubBudgetHeadsWidget'

export const SubBudgetHeads = (props) => {

    const [state, setState] = useState([])

    const columns = [
        {
            name: 'Budget Code',
            label: 'budgetCode'
        },
        {
            name: 'Name',
            label: 'name'
        },
        {
            name: 'Type',
            label: 'type'
        }
    ]

    const handleUpdate = (subBudgetHead, action = "update") => {
        props.history.push({
            pathname: `sub-budget-heads/${subBudgetHead.budgetCode}/update`,
            state: {
                subBudgetHead: subBudgetHead,
                actionType: action
            }
        })
    }

    const handleDestroy = (data) => {
        props.destroy('subBudgetHeads', data.id, {
            success: broadcast.DELETE_SUB_BUDGET_HEAD_RECORD,
            failed: broadcast.DELETE_SUB_BUDGET_HEAD_RECORD_FAILED
        })
    }

    useEffect(() => {
        props.index('subBudgetHeads', {
            success: broadcast.FETCH_SUB_BUDGET_HEADS,
            failed: broadcast.FETCH_SUB_BUDGET_HEADS_FAILED
        })
    }, [])

    useEffect(() => {
        if (props.subBudgetHeads.collection.length > 0) {
            setState(props.subBudgetHeads.collection)
        }
    }, [props.subBudgetHeads])

    return (
        <>
            <h1 className="mb-3">Sub Budget Heads</h1>

            <Container fluid>
                <Row>
                    <Col md={4}>
                        <NavLink to="/sub-budget-heads/create" className="btn btn-success mb-5">
                            <FiPlus style={{ marginRight: 8 }} />
                            Add Sub Budget Head
                        </NavLink>
                    </Col>
                </Row>
            </Container>


            <div>
                <Grid container spacing={3}>
                    <Grid item md={12}>
                        <TableComponent 
                            columns={columns}
                            rows={state}
                            callToAction={handleUpdate}
                            callToDelete={handleDestroy}
                        />
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        subBudgetHeads: state.budgetting.subBudgetHeads
    }
}

const mapDispatchToProps = dispatch => {
    return {
        index: (entity, broadcast) => dispatch(index(entity, broadcast)),
        destroy: (entity, id, broadcast) => dispatch(destroy(entity, id, broadcast)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubBudgetHeads)
