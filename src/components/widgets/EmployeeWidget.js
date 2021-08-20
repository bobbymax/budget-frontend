import React from 'react'
import {
    FiTrash2,
    FiEdit
} from 'react-icons/fi'
import {
    Button
} from 'react-bootstrap'
import { useSelector } from 'react-redux'

const EmployeeWidget = ({employee, onEdit, onDestroy}) => {

    const auth = useSelector(state => state.access.staff.authenticatedUser)

    return (
        <tr>
            <td>{employee.name}</td>
            <td>{employee.staff_no}</td>
            <td>{employee.email}</td>
            <td>
                <Button 
                    onClick={() => onEdit(employee)}
                    className="btn btn-warning btn-sm"
                >
                    <FiEdit />
                </Button>
                
                <Button 
                    type="button" 
                    className="btn btn-danger btn-sm" 
                    onClick={() => onDestroy(employee)}
                    disabled={employee.id === auth.id}
                >
                    <FiTrash2 />
                </Button>
            </td>
        </tr>
    )
}

export default EmployeeWidget
