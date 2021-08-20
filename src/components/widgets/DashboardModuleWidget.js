/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {
    Col
} from 'react-bootstrap'
import { FiArrowRight } from "react-icons/fi"
import {Link} from 'react-router-dom'
import { canAccessModule } from "../../services/helpers/access" 

const DashboardModuleWidget = ({auth, module}) => {
    return (
        <>
            {canAccessModule(module, auth) ? 
                <Col md={3}>
                    <div className="card card-hover card-profile-two card-dark bd-success bg-success ht-xl-100p">
                        <div className="card-body">
                            <h6 className="card-title">{module.name}</h6>
                            <p className="card-desc">Explorer. Social media hero. Bacon fanatic. Student.</p>
                        </div>
                        <div className="card-footer bg-transparent pd-t-0 bd-t-0">
                            <Link to={module.children.length !== 0 ? `/modules/${module.label}` : module.path}>
                                <FiArrowRight size={20} />
                            </Link>
                        </div>
                    </div>
                </Col>
            : null}
        </>
    )
}

export default DashboardModuleWidget
