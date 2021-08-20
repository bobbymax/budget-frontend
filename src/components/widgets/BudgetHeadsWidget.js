import React from 'react'
import {
    FiEdit
} from 'react-icons/fi'
import {
    Button
} from 'react-bootstrap'

function BudgetHeadsWidget({budgetHead, onEdit}) {
    return (
        <tr>
            <td>{ budgetHead.budgetId }</td>
            <td>{ budgetHead.name }</td>
            <td>
                <Button 
                    onClick={() => onEdit(budgetHead)}
                    className="btn btn-warning btn-sm"
                >
                    <FiEdit />
                </Button>
            </td>
        </tr>
    )
}

export default BudgetHeadsWidget
