import { Button } from "react-bootstrap"
import { FiFilePlus } from "react-icons/fi"


const ExpenditureCard = ({ expenditure, addToBatch, isButtonOff, paymentType, maxed }) => {
    return (
        <tr>
            <td>
                <Button
                    variant="warning"
                    size="sm"
                    type="button"
                    onClick={() => addToBatch(expenditure)}
                    disabled={(isButtonOff && expenditure.payment_type !== paymentType) || maxed}
                >
                    <FiFilePlus />
                </Button>
            </td>
            <td>{expenditure.subBudgetHead ? expenditure.subBudgetHead.budgetCode : expenditure.sub_budget_head_id}</td>
            <td>{expenditure.payment_type.toUpperCase()}</td>
            <td>{expenditure.description}</td>
            <td>{expenditure.amount}</td>
        </tr>
    )
}

export default ExpenditureCard
