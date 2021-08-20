/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {Col, Row, Table, Button} from 'react-bootstrap'
import { amountToWords } from '../../../services/helpers/functions'
import { FiPrinter } from 'react-icons/fi'
import ExportClaim from './ExportClaim'
import ClaimDetails from '../../widgets/ClaimDetails'

export const Claim = (props) => {

    const initialState = {
        claim: null,
        printed: false
    }

    const [state, setState] = useState(initialState)
    const auth = useSelector(state => state.access.staff.authenticatedUser)

    const handleDownload = () => {
        setState({
            ...state,
            printed: false
        })

        props.history.push('/claims')
    }


    useEffect(() => {
        if (props.location && props.location.state) {
            const claim = props.location.state.claim
            setState({
                ...state,
                claim
            })
        }
    }, [])

    return (
        <>
            {!state.printed ? 
                <>
                    <h5>PURPOSE OF EXPENDITURE:</h5>
                    <h4><strong>{state.claim ? state.claim.title.toUpperCase() : null}</strong></h4>

                    <Button
                        className="mt-3"
                        variant="success"
                        onClick={() => setState({
                            ...state,
                            printed: true
                        })}
                    >
                        <FiPrinter style={{ marginRight: 13 }} />
                        PRINT CLAIM
                    </Button>

                    <div className="card mt-5">
                        <Table bordered striped hover>
                            <thead>
                                <tr>
                                    <th>DATE</th>
                                    <th>DESCRIPTION</th>
                                    <th>AMOUNT</th>
                                </tr>
                            </thead>
                            <tbody>
                                {state.claim && state.claim.instructions.length !== 0 ? state.claim.instructions.map(instruction => (
                                    <ClaimDetails 
                                        key={instruction.id}
                                        instruction={instruction}
                                    />
                                )) : null}
                                <tr>
                                    <td colSpan="2" style={{ textAlign: 'center' }}><strong>TOTAL:</strong></td>
                                    <td><strong>{state.claim ? new Intl.NumberFormat().format(state.claim.total_amount) : null}</strong></td>
                                </tr>
                            </tbody>
                        </Table>
                        <Row>
                            <Col className="mt-4">
                                <p style={{ padding: 15, textDecoration: 'underline' }}><strong>Amount in Words:  {state.claim ? amountToWords(state.claim.total_amount).toUpperCase() : null }</strong></p>
                            </Col>
                        </Row>
                    </div>
                </>
            :   
                <ExportClaim 
                    claim={state.claim} 
                    auth={auth} 
                    onClose={handleDownload} 
                /> 
            }
        </>
    )
}

export default Claim
