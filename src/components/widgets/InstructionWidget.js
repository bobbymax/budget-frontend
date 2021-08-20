import React from 'react'
import {Button} from 'react-bootstrap'
import { FiX } from 'react-icons/fi'

const InstructionWidget = ({instruction, onDestroy}) => {
    return (
        <tr>
            <td>{instruction.from}</td>
            <td>{instruction.to}</td>
            <td>{instruction.benefit}</td>
            <td>{instruction.amount}</td>
            <td>
                <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => onDestroy(instruction)}
                >
                    <FiX />
                </Button>
            </td>
        </tr>
    )
}

export default InstructionWidget
