import React from 'react'
import {
    FiTrash2,
    FiEdit,
    FiWind
} from 'react-icons/fi'
import {
    Button
} from 'react-bootstrap'

const BenefitsWidget = ({benefit, onEdit, onDestroy, modalControl}) => {
    return (
        <tr>
            <td>{benefit.name}</td>
            <td>{benefit.parent}</td>
            <td>
                <Button 
                    variant="success" 
                    className="btn btn-sm"
                    onClick={() => modalControl(benefit)}
                    disabled={! benefit.canAddEntitlement}
                >
                    <FiWind style={{ marginRight: 8 }} />
                    Add Entitlement
                </Button>
                <Button 
                    onClick={() => onEdit(benefit)}
                    className="btn btn-warning btn-sm"
                >
                    <FiEdit />
                </Button>
                
                <Button type="button" className="btn btn-danger btn-sm" 
                    onClick={() => onDestroy(benefit)}>
                    <FiTrash2 />
                </Button>
            </td>    
        </tr>
    )
}

export default BenefitsWidget
