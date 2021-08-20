/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { FiPrinter, FiX } from 'react-icons/fi'
import Pdf from 'react-to-pdf'
import logo from '../../../assets/images/claim_logo.png'
import { formatDate, amountToWords } from '../../../services/helpers/functions'
import './Claim.css'

const ref = React.createRef()
const options = {
    orientation: 'potrait',
    unit: 'in',
    format: [8.27, 11.69]
}

const ExportClaim = ({claim, auth, onClose}) => {

    const [state, setState] = useState(null)

    const styles = {
        container: {
            padding: 30
        },
        outter: {
            border: '1px solid #556',
            width: 728,
            paddingBottom: 80
        },
        claim_id: {
            fontSize: 14,
            float: 'right',
            marginTop: 75,
            marginRight: 90
        },
        logo: {
            width: '58%',
            float: 'left',
            marginLeft: 15
        },
        clearfix: {
            clear: 'both'
        },
        midFontSize: {
            fontSize: 18
        },
        lgFontSize: {
            fontSize: 22
        },
        topSection: {
            padding: '10px 0 15px 0',
            borderBottom: '3px solid #028a0e',
            marginBottom: 30
        },
        tableStyle: {
            width: '100%'
        },
        thBorders: {
            border: '1px solid #777',
            padding: 7
        },
        bottonDiv: {
            borderBottom: '1px solid #777',
            padding: '0 0 0 10px',
            marginBottom: 40
        }
    }

    useEffect(() => {
        if (claim) {
            setState(claim)
        }
    }, [state])

    return (
        <>
            <Pdf targetRef={ref} filename="claim.pdf" options={options}>
                {({toPdf}) => <button className="btn btn-success mb-4" onClick={toPdf}><FiPrinter style={{ marginRight: 12 }} />Print</button>}
            </Pdf>
            <button 
                className="btn btn-danger mb-4" 
                style={{ marginLeft: 4 }}
                onClick={() => onClose()}
            >
                <FiX style={{ marginRight: 5 }} /> 
                Close
            </button>
            <div className="claim" ref={ref} style={styles.container}>
                <div className="claimBackground" style={styles.outter}>
                    <div style={styles.topSection}>
                        <img src={logo} alt="claim ncdmb logo" style={styles.logo} />
                        <h5 style={styles.claim_id}>CLAIM ID: <strong>{state ? state.reference_no.toUpperCase() : null}</strong></h5>
                        <div style={styles.clearfix}></div>
                    </div>
                    <div className="mb-3" style={{ padding: '0 10px' }}>
                        <h5 style={styles.midFontSize}>PURPOSE OF EXPENDITURE:</h5>
                        <h4 style={styles.lgFontSize} className="claimTitle">{ state ? state.title : null}</h4>
                    </div>
                    <div className="mb-5">
                        <table style={styles.tableStyle} className="table">
                            <thead>
                                <tr>
                                    <th style={styles.thBorders}>DATE</th>
                                    <th style={styles.thBorders}>DESCRIPTION</th>
                                    <th style={styles.thBorders}>AMOUNT</th>
                                </tr>
                            </thead>
                            <tbody>
                                {state && state.instructions.length !== 0 ? state.instructions.map(instruction => (
                                    <tr key={instruction.id}>
                                        <td style={styles.thBorders}>{`${formatDate(instruction.from).toUpperCase()}  -  ${formatDate(instruction.to).toUpperCase()}`}</td>
                                        <td style={styles.thBorders}>{instruction.description}</td>
                                        <td style={styles.thBorders}>{new Intl.NumberFormat().format(instruction.amount)}</td>
                                    </tr>
                                )) : null}
                                <tr>
                                    <td colSpan="2" style={styles.thBorders}><strong>TOTAL:</strong></td>
                                    <td style={styles.thBorders}><strong>{state ? new Intl.NumberFormat().format(state.total_amount) : null}</strong></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div style={styles.bottonDiv}>
                        <p>Amount in words: <strong>{state ? amountToWords(state.total_amount) : null }</strong></p>
                    </div>
                    <div className="rowConts">
                        <div className="keepers lefters">
                            <div className="liners mt-4"></div>
                            <h6 className="claimTitle">SIGNATURE OF CLAIMANT</h6>
                        </div>
                        <div className="keepers lefters">
                            <div className="liners">
                                <h6>{auth ? auth.level.toUpperCase() : null}</h6>
                            </div>
                            <h6 className="claimTitle">GRADE LEVEL</h6>
                        </div>
                        <div className="keepers righters">
                            <div className="liners mt-4"></div>
                            <h6 className="claimTitle">APPROVED</h6>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                    <div className="rowConts">
                        <div className="keepers lefters">
                            <div className="liners">
                                <h6>{auth ? auth.name.toUpperCase() : null }</h6>
                            </div>
                            <h6 className="claimTitle">NAME IN BLOCKS</h6>
                        </div>
                        <div className="keepers lefters">
                            <div className="liners mt-4">
                                <h6>{auth ? auth.staff_no : null }</h6>
                            </div>
                            <h6 className="claimTitle">STAFF NUMBER</h6>
                        </div>
                        <div className="keepers righters">
                            <div className="liners mt-5"></div>
                            <h6 className="claimTitle">NAME IN BLOCKS</h6>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ExportClaim
