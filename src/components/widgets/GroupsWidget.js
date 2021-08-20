import React from 'react'
import {
    FiTrash2,
    FiEdit,
} from 'react-icons/fi'
import {
    Button
} from 'react-bootstrap'

function GroupsWidget({group, onEdit, onDestroy}) {
    return (
        <tr>
            <td>{group.name}</td>
            <td>{group.max_slots}</td>
            <td>{ group.cannot_expire ? 'No' : 'Yes' }</td>
            <td>
                <Button 
                    onClick={() => onEdit(group)}
                    className="btn btn-warning btn-sm"
                >
                    <FiEdit />
                </Button>
                
                <Button type="button" className="btn btn-danger btn-sm" 
                    onClick={() => onDestroy(group)}>
                    <FiTrash2 />
                </Button>
            </td>
        </tr>
    )
}

export default GroupsWidget
