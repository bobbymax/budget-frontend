import React from 'react'
import {
    FiTrash2,
    FiEdit,
} from 'react-icons/fi'
import {
    Button
} from 'react-bootstrap'

const RolesWidget = ({role, onDestroy, onEdit}) => {
    return (
        <tr>
            <td>{role.name}</td>
            <td>{role.max_slots}</td>
            <td>{ role.cannot_expire }</td>
            <td>{ role.isSuper }</td>
            <td>
                <Button 
                    onClick={() => onEdit(role)}
                    className="btn btn-warning btn-sm"
                >
                    <FiEdit />
                </Button>
                
                <Button type="button" className="btn btn-danger btn-sm" 
                    onClick={() => onDestroy(role)}>
                    <FiTrash2 />
                </Button>
            </td>
        </tr>
    )
}

export default RolesWidget
