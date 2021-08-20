import { Button } from 'react-bootstrap'
import React from 'react'
import { FiEdit3 } from 'react-icons/fi'

const FundCard = ({fund, onEdit}) => {
    return (
        <tr>
           <th>
                <Button 
                    size="sm"
                    variant="white"
                    onClick={() => onEdit(fund)}
                >
                    <FiEdit3 />
                </Button>
           </th>
           <th>{ fund.subBudgetHead.budgetCode }</th>
           <th>{ fund.subBudgetHead.name }</th>
           <th>{ fund.subBudgetHead.department.code }</th>
           <th>{ fund.approved_amount }</th>
        </tr>
    )
}

export default FundCard
