import React from 'react'
import {Button} from 'react-bootstrap'
import {FiEdit, FiTrash2} from 'react-icons/fi'

const SubBudgetHeadsWidget = ({subBudgetHead, onEdit, onDestroy}) => {
    return (
        <tr>
            <td>{subBudgetHead.budgetCode}</td>
            <td>{subBudgetHead.name}</td>
            <td>{subBudgetHead.budgetHead ? subBudgetHead.budgetHead.name : subBudgetHead.budget_head_id}</td>
            <td>{subBudgetHead.department ? subBudgetHead.department.code : subBudgetHead.department_id}</td>
            <td>{subBudgetHead.type}</td>
            <td>
                <Button 
                    onClick={() => onEdit(subBudgetHead)}
                    className="btn btn-warning btn-sm"
                >
                    <FiEdit />
                </Button>
                
                <Button 
                    type="button" 
                    className="btn btn-danger btn-sm" 
                    onClick={() => onDestroy(subBudgetHead)}
                >
                    <FiTrash2 />
                </Button>
            </td>
        </tr>
    )
}

export default SubBudgetHeadsWidget
