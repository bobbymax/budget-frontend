import React from 'react'
import {
    FiTrash2,
    FiEdit,
} from 'react-icons/fi'
import {
    Button
} from 'react-bootstrap'

const GradeLevelWidget = ({grade, onEdit, onDestroy}) => {
    return (
        <tr>
            <td>{grade.name}</td>
            <td>{grade.code}</td>
            <td>
                <Button 
                    onClick={() => onEdit(grade)}
                    className="btn btn-warning btn-sm"
                >
                    <FiEdit />
                </Button>
                
                <Button type="button" className="btn btn-danger btn-sm" 
                    onClick={() => onDestroy(grade)}>
                    <FiTrash2 />
                </Button>
            </td>
        </tr>
    )
}

export default GradeLevelWidget
