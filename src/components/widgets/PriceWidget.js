import React from 'react'
import {Button} from 'react-bootstrap'
import {FiEdit, FiTrash2} from 'react-icons/fi'

const PriceWidget = ({price, onEdit, onDestroy}) => {
    return (
        <tr>
            <td>{typeof price.benefit !== 'undefined' ? price.benefit.name : price.benefit_id}</td>
            <td>{price.amount}</td>
            <td>
                <Button 
                    onClick={() => onEdit(price)}
                    className="btn btn-warning btn-sm"
                >
                    <FiEdit />
                </Button>
                
                <Button type="button" className="btn btn-danger btn-sm" 
                    onClick={() => onDestroy(price)}>
                    <FiTrash2 />
                </Button>
            </td>
        </tr>
    )
}

export default PriceWidget
