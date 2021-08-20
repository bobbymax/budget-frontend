/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import * as broadcast from '../../../redux/accessControl/types'
import { connect } from 'react-redux'
import { index } from "../../../redux/actions"
import {
    FiUpload
} from 'react-icons/fi'
import {
    Container,
    Row,
    Col,
    Table,
} from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import BudgetHeadsWidget from '../../widgets/BudgetHeadsWidget'

const BudgetHeads = (props) => {


    const handleUpdate = (budgetHead) => {
        props.history.push({
            pathname: `budget-heads/${budgetHead.label}/update`,
            state: {
                budgetHead: budgetHead
            }
        })
    }


    useEffect(() => {
        props.index('budgetHeads', {
            success: broadcast.FETCH_BUDGET_HEADS,
            failed: broadcast.FETCH_BUDGET_HEADS_FAILED
        })
    }, [])

    return (
        <>
            <h1 className="mb-3">Budget Heads</h1>
            <NavLink to="/budget-heads/import" className="btn btn-success mb-5" style={{ marginBottom: 30 }}>
                <FiUpload style={{ marginRight: 8 }} />
                Import Budget Heads
            </NavLink>

            <div className="card form-portal-card">
                <Container fluid>
                    <Row>
                        <Col>
                            <Table striped hover>
                                <thead>
                                    <tr>
                                        <th>Code</th>
                                        <th>Description</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.budgetHeads.collection.length !== 0 ? props.budgetHeads.collection.map(budgetHead => {
                                        return (
                                            <BudgetHeadsWidget 
                                                key={budgetHead.id}
                                                budgetHead={budgetHead}
                                                onEdit={handleUpdate}
                                            />
                                        )
                                    }) : (<tr><td colSpan="3" className="text-danger">{'No Data Found!!!'}</td></tr>)}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        budgetHeads: state.budgetting.budgetHeads
    }
}

const mapDispatchToProps = dispatch => {
    return {
        index: (entity, broadcast) => dispatch(index(entity, broadcast)),
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(BudgetHeads)
