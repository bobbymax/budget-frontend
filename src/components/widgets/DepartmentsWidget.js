import React from 'react'
import {
    FiTrash2,
    FiEdit,
} from 'react-icons/fi'
import {
    Button
} from 'react-bootstrap'

function DepartmentsWidget({department, onEdit, onDestroy}) {
    return (
        <tr>
            <td>{department.name}</td>
            <td>{department.code}</td>
            <td>{ department.type }</td>
            <td>{ department.parentId }</td>
            <td>
                <Button 
                    onClick={() => onEdit(department)}
                    className="btn btn-warning btn-sm"
                >
                    <FiEdit />
                </Button>
                
                <Button type="button" className="btn btn-danger btn-sm" 
                    onClick={() => onDestroy(department)}>
                    <FiTrash2 />
                </Button>
            </td>
        </tr>
    )
}

export default DepartmentsWidget
