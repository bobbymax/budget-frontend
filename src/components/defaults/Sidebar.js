import React from 'react'
import { NavLink } from "react-router-dom"
import logo from "../../assets/images/logo.png"
import {
    FiTrello, 
    FiCodepen, 
    FiChrome, 
    FiUsers,
    FiUser, 
    FiCodesandbox, 
    FiSlack,
    FiFigma,
    FiShoppingBag,
    FiLifeBuoy,
    FiTv,
    FiBox,
    FiCheckCircle,
    FiList
} from 'react-icons/fi'
// import {
//     FiTrello, 
//     FiUser, 
//     FiCodesandbox, 
//     FiSlack,
//     FiTv,
//     FiBox,
//     FiCheckCircle,
//     FiList
// } from 'react-icons/fi'

const Sidebar = () => {
    return (
        <>
        <div id="sidebar-wrapper">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        {/** Sidebar Section **/}
                        <aside id="sidebar">
                            <div id="logo">
                                <img src={logo} alt="Board's logo" className="img-fluid" />
                            </div>

                            <nav id="navigation-container">
                                <div id="navigation">
                                    <ul className="navigation-wrapper">
                                        <li className="navigation-link">
                                            <NavLink to="/" exact>
                                                <FiTrello />
                                                <span>Dashboard</span>
                                            </NavLink>
                                        </li>

                                        <li className="navigation-link">
                                            <NavLink to="/roles">
                                                <FiCodepen />
                                                <span>Roles</span>
                                            </NavLink>
                                        </li>

                                        <li className="navigation-link">
                                            <NavLink to="/departments">
                                                <FiChrome />
                                                <span>Departments</span>
                                            </NavLink>
                                        </li>

                                        <li className="navigation-link">
                                            <NavLink to="/groups">
                                                <FiUsers />
                                                <span>Groups</span>
                                            </NavLink>
                                        </li>

                                        <li className="navigation-link">
                                            <NavLink to="/budget-heads">
                                                <FiCodesandbox />
                                                <span>Budget Heads</span>
                                            </NavLink>
                                        </li>

                                        <li className="navigation-link">
                                            <NavLink to="/sub-budget-heads">
                                                <FiSlack />
                                                <span>Sub Budget Heads</span>
                                            </NavLink>
                                        </li>

                                        <li className="navigation-link">
                                            <NavLink to="/grade-levels">
                                                <FiFigma />
                                                <span>Grade Levels</span>
                                            </NavLink>
                                        </li>

                                        <li className="navigation-link">
                                            <NavLink to="/benefits">
                                                <FiShoppingBag />
                                                <span>Benefits</span>
                                            </NavLink>
                                        </li>

                                        <li className="navigation-link">
                                            <NavLink to="/benefit/wages">
                                                <FiLifeBuoy />
                                                <span>Wages</span>
                                            </NavLink>
                                        </li>

                                        <li className="navigation-link">
                                            <NavLink to="/modules">
                                                <FiTv />
                                                <span>Modules</span>
                                            </NavLink>
                                        </li>

                                        <li className="navigation-link">
                                            <NavLink to="/staff">
                                                <FiUser />
                                                <span>Staff</span>
                                            </NavLink>
                                        </li>
                                        <li className="navigation-link">
                                            <NavLink to="/claims">
                                                <FiBox />
                                                <span>Claims</span>
                                            </NavLink>
                                        </li>
                                        <li className="navigation-link">
                                            <NavLink to="/expenditures">
                                                <FiCheckCircle />
                                                <span>Expenditure</span>
                                            </NavLink>
                                        </li>
                                        <li className="navigation-link">
                                            <NavLink to="/batch/claim">
                                                <FiList />
                                                <span>Batch</span>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </aside>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Sidebar
