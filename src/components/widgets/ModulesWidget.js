import React from 'react'
import {
    FiTrash2,
    FiEdit,
    FiEye
} from 'react-icons/fi'
import {Button} from 'react-bootstrap'

const ModulesWidget = ({module, onEdit, onDestroy}) => {
    return (
        <tr>
            <td>{module.name}</td>
            <td>{module.path}</td>
            <td>
                <Button
                    className="btn btn-primary btn-sm"
                >
                    <FiEye />
                </Button>
                <Button 
                    onClick={() => onEdit(module)}
                    className="btn btn-warning btn-sm"
                >
                    <FiEdit />
                </Button>
                
                <Button type="button" className="btn btn-danger btn-sm" 
                    onClick={() => onDestroy(module)}>
                    <FiTrash2 />
                </Button>
            </td>
        </tr>
    )
}

export default ModulesWidget
