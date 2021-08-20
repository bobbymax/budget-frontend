/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { FiPlus } from 'react-icons/fi'
import {
    Row,
    Col,
    Table
} from 'react-bootstrap'
import { destroy, index, store, update } from '../../../redux/actions'
import * as broadcast from '../../../redux/entitlements/types'
import PriceWidget from '../../widgets/PriceWidget'

export const Prices = (props) => {

    const initialState = {
        id: 0,
        benefit_id: 0,
        amount: 0,
        showForm: false,
        isUpdating: false,
        dependencies: []
    }

    const [state, setState] = useState(initialState)

    const handleSubmit = e => {
        e.preventDefault()

        const data = {
            benefit_id: state.benefit_id,
            amount: state.amount
        }

        props.store('priceLists', data, {
            success: broadcast.CREATE_WAGE_RECORD,
            failed: broadcast.CREATE_WAGE_RECORD_FAILED
        })

        setState({
            ...state,
            id: 0,
            benefit_id: 0,
            amount: 0,
            showForm: false,
        })
    }

    const handleUpdateState = data => {
        setState({
            ...state,
            id: data.id,
            benefit_id: data.benefit_id,
            amount: data.amount,
            showForm: true,
            isUpdating: true
        })
    }

    const handleUpdate = e => {
        e.preventDefault()

        const data = {
            benefit_id: state.benefit_id,
            amount: state.amount
        }

        props.update('priceLists', state.id, data, {
            success: broadcast.UPDATE_WAGE_RECORD,
            failed: broadcast.UPDATE_WAGE_RECORD_FAILED
        })

        setState({
            ...state,
            id: 0,
            benefit_id: 0,
            amount: 0,
            showForm: false,
            isUpdating: false
        })
    }

    const handleDestroy = data => {
        props.destroy('priceLists', data.id, {
            success: broadcast.DELETE_WAGE_RECORD,
            failed: broadcast.DELETE_WAGE_RECORD_FAILED
        })
    }


    useEffect(() => {
        props.index('priceLists', {
            success: broadcast.FETCH_WAGES,
            failed: broadcast.FETCH_WAGES_FAILED
        })
    }, [])

    useEffect(() => {
        if (props.wages.wages.collection !== 0) {

            props.index('benefits', {
                success: broadcast.FETCH_BENEFITS,
                failed: broadcast.FETCH_BENEFITS_FAILED
            })
        }
    }, [])

    return (
        <>
            <h1>Price Listing</h1>
            <button 
                type="button" 
                className="btn btn-success" 
                style={{ marginBottom: 30 }}
                onClick={() => setState({...state, showForm: true})}
                disabled={state.isUpdating ? true : false}
            >
                <FiPlus style={{ marginRight: 8 }} />
                Add Price
            </button>

            {state.showForm ? 
                <div className="card form-portal-card mb-5">
                    <form onSubmit={state.isUpdating ? handleUpdate : handleSubmit}>
                        <div className="row mb-5">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Benefit</label>

                                    <select 
                                        name="benefit_id"
                                        className="form-control"
                                        value={state.benefit_id}
                                        onChange={e => setState({...state, benefit_id: e.target.value})}
                                    >
                                        <option value="">Select Benefit</option> 
                                        {props.wages.benefits.collection.length !== 0 ? props.wages.benefits.collection.map(benefit => (<option key={benefit.id} value={benefit.id}>{benefit.name}</option>)) : null}
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Amount</label>

                                    <input
                                        type="number"
                                        name="amount"
                                        className="form-control"
                                        value={state.amount}
                                        onChange={e => setState({...state, amount: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <button
                                    type="submit"
                                    className="btn btn-sm btn-success mr-5"
                                >
                                    {state.isUpdating ? 'Update' : 'Add'} Price
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-sm btn-danger"
                                    onClick={() => setState({
                                        ...state,
                                        id: 0,
                                        benefit_id: 0,
                                        amount: 0,
                                        showForm: false,
                                        isUpdating: false
                                    })}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </form>
                </div> 
            : null}

            <div className="card form-portal-card mb-5">
                <Row>
                    <Col>
                        <Table striped hover>
                            <thead>
                                <tr>
                                    <th>Benefit</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.wages.wages.collection.length !== 0 ? props.wages.wages.collection.map(price => {
                                    return (
                                        <PriceWidget 
                                            key={price.id} 
                                            price={price} 
                                            onEdit={handleUpdateState} 
                                            onDestroy={handleDestroy} 
                                        />
                                    )
                                }) : <tr><td colSpan="3" className="text-danger">{'No Data Found!!'}</td></tr>}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        wages: state.entitlements,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        index: (entity, broadcast) => dispatch(index(entity, broadcast)),
        store: (entity, data, broadcast) => dispatch(store(entity, data, broadcast)),
        update: (entity, id, data, broadcast) => dispatch(update(entity, id, data, broadcast)),
        destroy: (entity, id, broadcast) => dispatch(destroy(entity, id, broadcast))
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(Prices)
