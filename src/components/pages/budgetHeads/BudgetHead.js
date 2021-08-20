/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { FiSend } from 'react-icons/fi'
import * as broadcast from '../../../redux/accessControl/types'
import { connect } from 'react-redux'
import { update } from '../../../redux/actions'

export const BudgetHead = (props) => {

    const defaultState = {
        id: 0,
        budgetId: 0,
        name: "",
        label: ""
    }

    const [state, setState] = useState(defaultState)

    useEffect(() => {
        if(props.location && props.location.state) {
            const budgetHead = props.location.state.budgetHead
            setState({
                ...state,
                id: budgetHead.id,
                budgetId: budgetHead.budgetId,
                name: budgetHead.name,
                label: budgetHead.label
            })
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = {
            name: state.name,
            budgetId: state.budgetId
        }

        props.update("budgetHeads", state.id, data, {
            success: broadcast.UPDATE_BUDGET_HEAD_RECORD,
            failed: broadcast.UPDATE_BUDGET_HEAD_RECORD_FAILED
        })
        props.history.push('/budget-heads')
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                <h1 className="mb-5">Update Budget Head Details</h1>
                <form onSubmit={handleSubmit}>
                    <div className="row mb-5">
                        <div className="col-md-3">
                            <div className="form-group">
                                <label htmlFor="budgetId" className="mb-3">Budget ID</label>
                                <input 
                                    type="text" 
                                    name="budgetId" 
                                    className="form-control" 
                                    id="budgetId" 
                                    value={state.budgetId} 
                                    onChange={(e) => setState({...state, budgetId: e.target.value})} 
                                />
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div className="form-group">
                                <label htmlFor="name" className="mb-3">Budget Head</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    className="form-control" 
                                    id="name" 
                                    value={state.name} 
                                    onChange={(e) => setState({...state, name: e.target.value})} 
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3">
                            <button type="submit" className="btn btn-success">
                                <FiSend />
                                <span style={{ marginLeft: 10 }}>Update Budget Head</span>
                            </button>
                        </div>
                    </div>
                </form>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        budgetHeads: state.budgetting.budgetHeads
    }
}

const mapDispatchToProps = dispatch => {
    return {
        update: (entity, id, data, broadcast) => dispatch(update(entity, id, data, broadcast))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BudgetHead)
