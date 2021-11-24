import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { connect } from 'react-redux'
import { fetch } from '../../../redux/actions'
import * as broadcast from '../../../redux/accessControl/types'

const Reversals = props => {

    const initialState = {
        batchCode: "",
        batches: null
    }

    const [state, setState] = useState(initialState)

    const fetchBatch = e => {
        e.preventDefault()

        if (state.batchCode !== "") {
            props.fetch('reverse/batches', state.batchCode, {
                success: broadcast.FETCHED_BATCH_RECORD,
                failed: broadcast.FETCHED_BATCH_RECORD_FAILED
            })
        }
    }

    return (
        <>
            <h4>Reversals</h4><br />

            <Form onSubmit={fetchBatch}>
                <Form.Control 
                    type="text"
                    placeholder="ENTER BATCH NUMBER"
                    value={state.batchCode}
                    onChange={e => setState({...state, batchCode: e.target.value})}
                />
            </Form>
        </>
    )
}

const mapStateToProps = state => ({
    batches: state.budgetting.batches
})

const mapDispatchToProps = dispatch => {
    return {
        fetch: (entity, id, broadcast) => dispatch(fetch(entity, id, broadcast))
    }
}

export default connect(
    mapStateToProps,   
    mapDispatchToProps
)(Reversals)
