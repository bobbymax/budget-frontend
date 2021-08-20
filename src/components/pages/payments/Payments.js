/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { connect, useSelector } from 'react-redux'
import { index } from '../../../redux/actions'
import * as broadcast from '../../../redux/accessControl/types'
import { FiPrinter } from 'react-icons/fi'
import BatchPrintOut from './BatchPrintOut'

const Payments = (props) => {

    const initialState = {
        batch: null,
        isPrinting: false
    }

    const stats = [
        {
            value: 'pending',
            label: 'warning'
        },
        {
            value: 'registered',
            label: 'info'
        },
        {
            value: 'queried',
            label: 'danger'
        },
        {
            value: 'paid',
            label: 'success'
        },
        {
            value: 'archived',
            label: 'secondary'
        }
    ]

    const [state, setState] = useState(initialState)
    const auth = useSelector(state => state.access.staff.authenticatedUser)

    const currentStat = (stat) => {
        const curr = stats.filter(s => stat === s.value)
        return curr[0].label
    }

    const handleBatchPrint = batch => {
        setState({
            ...state,
            batch,
            isPrinting: ! state.isPrinting
        })
    }

    const printingDone = () => {
        setState({
            ...state,
            batch: null,
            isPrinting: ! state.isPrinting
        })
    }

    useEffect(() => {
        props.index('batches', {
            success: broadcast.FETCHED_BATCHES,
            failed: broadcast.FETCHED_BATCHES_FAILED
        })
    }, [])

    return (
        <>
            {! state.isPrinting ? 
            <>
            <h4 className="mb-4">Payments</h4>
            <Row>
                <Col>
                    <Table striped hover>
                        <thead>
                            <tr>
                                <td></td>
                                <td>Budget Code</td>
                                <td>Amount</td>
                                <td>Status</td>
                            </tr>
                        </thead>
                        <tbody>
                            {props.batches.length !== 0 ? props.batches.map(batch => {
                                return (
                                    <tr key={batch.id}>
                                        <td>
                                            <Button
                                                variant="success"
                                                className="btn-sm"
                                                onClick={() => handleBatchPrint(batch)}
                                            >
                                                <FiPrinter />
                                            </Button>
                                        </td>
                                        <td>{batch.batch_no}</td>
                                        <td>{`NGN ${new Intl.NumberFormat().format(batch.amount)}`}</td>
                                        <td>
                                            <span className={'badge badge-' + currentStat(batch.status)}>
                                                {batch.status}
                                            </span>
                                        </td>
                                    </tr>
                                )
                            }) : null}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            </>
            :
                <BatchPrintOut 
                    batch={state.batch}
                    onClose={printingDone}
                    auth={auth}
                />            
            }
        </>
    )
}

const mapStateToProps = state => ({
    batches: state.budgetting.batches.collection
})

const mapDispatchToProps = dispatch => {
    return {
        index: (entity, broadcast) => dispatch(index(entity, broadcast))
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(Payments)

