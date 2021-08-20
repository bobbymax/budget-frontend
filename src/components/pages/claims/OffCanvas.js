/* eslint-disable jsx-a11y/anchor-is-valid */

import { FiX } from "react-icons/fi"

const OffCanvas = ({board, onRemove, show}) => {
    // console.log(show)
    return (
        <>
            <div id="offCanvas3" className={'off-canvas off-canvas-overlay off-canvas-right ' + show}>
                <a href="#" className="close"><FiX /></a>

                <div className="pd-30 ht-100p">
                    <h5 className="tx-colo-01 tx-semibold mg-t-50 mg-b-25">What does royalty free mean?</h5>
                    <p className="mg-b-25 tx-color-03">Royalty free means you just need to pay for rights to use the item once per end product. You don't need to pay additional or ongoing fees for each person who sees or uses it.</p>
                    <a href="" className="btn btn-dark btn-block">Learn More</a>
                </div>
            </div>
            <div className="off-canvas-backdrop"></div>
        </>
    )
}

export default OffCanvas
