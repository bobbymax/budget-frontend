/* eslint-disable no-unused-vars */
import React from 'react'
import { Form } from 'react-bootstrap'

const ExpenditureWidget = ({claim, handleChangeEvent}) => {
    
    return (
        <tr>
            <td>
                <Form.Check 
                    type="checkbox"
                    value={claim.id}
                    onChange={() => handleChangeEvent(claim.id)}
                />
            </td>
            <td>{claim.reference_no.toUpperCase()}</td>
            <td>{claim.owner.name.toUpperCase()}</td>
            <td>{claim.title}</td>
            <td>{`NGN ${new Intl.NumberFormat().format(claim.total_amount)}`}</td>
        </tr>
    )
}

export default ExpenditureWidget
