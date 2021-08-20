import React from 'react'
import {
    FiTrash2,
    FiEdit,
} from 'react-icons/fi'
import {
    Button
} from 'react-bootstrap'

const EntitlementsWidget = ({entitlement, onEdit, onDestroy}) => {
    return (
        <tr>
            <td>{entitlement.benefit}</td> 
            <td>{entitlement.grade}</td> 
            <td>{entitlement.amount}</td> 
            <td>
                <Button 
                    onClick={() => onEdit(entitlement)}
                    className="btn btn-warning btn-sm"
                >
                    <FiEdit />
                </Button>
                
                <Button type="button" className="btn btn-danger btn-sm" 
                    onClick={() => onDestroy(entitlement)}>
                    <FiTrash2 />
                </Button>
            </td> 
        </tr>
    )
}

export default EntitlementsWidget
