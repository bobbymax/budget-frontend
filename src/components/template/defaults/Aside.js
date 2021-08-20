/* eslint-disable jsx-a11y/anchor-is-valid */
import { FiBox, FiCodesandbox, FiSlack, FiLifeBuoy, FiCodepen, FiGlobe } from "react-icons/fi"
import { NavLink } from "react-router-dom"

const Aside = () => {
    return (
        <div id="dpSidebarBody" className="sidebar-body">
            <ul className="nav nav-sidebar">
                <li className="nav-label"><label className="content-label">Template Pages</label></li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/" exact><FiBox /><span>Dashboard</span></NavLink>
                </li>
                <li className="nav-label mt-2"><label className="content-label">Quick Access</label></li>
                <li className="nav-item show">
                    <a href="#" className="nav-link with-sub"><FiSlack /> Administration</a>
                    <nav className="nav nav-sub">
                        <NavLink to="/roles" className="nav-sub-link">Roles</NavLink>
                        <NavLink to="/departments" className="nav-sub-link">Departments</NavLink>
                        <NavLink to="/groups" className="nav-sub-link">Groups</NavLink>
                        <NavLink to="/modules" className="nav-sub-link">Modules</NavLink>
                        <NavLink to="/staff" className="nav-sub-link">Staff</NavLink>
                        <NavLink to="/workflows" className="nav-sub-link">Workflows</NavLink>
                        <NavLink to="/procedures" className="nav-sub-link">Procedures</NavLink>
                    </nav>
                </li>

                <li className="nav-item show">
                    <a href="#" className="nav-link with-sub"><FiCodesandbox /> Structure</a>
                    <nav className="nav nav-sub">
                        <NavLink to="/grade-levels" className="nav-sub-link">Grade Levels</NavLink>
                        <NavLink to="/benefits" className="nav-sub-link">Benefits</NavLink>
                        <NavLink to="/benefit/wages" className="nav-sub-link">Wages</NavLink>
                    </nav>
                </li>

                <li className="nav-item show">
                    <a href="#" className="nav-link with-sub"><FiCodepen /> Budget Control</a>
                    <nav className="nav nav-sub">
                        <NavLink to="/budget-heads" className="nav-sub-link">Budget Heads</NavLink>
                        <NavLink to="/sub-budget-heads" className="nav-sub-link">Sub Budget Heads</NavLink>
                        <NavLink to="/funds" className="nav-sub-link">Funds</NavLink>
                        <NavLink to="/expenditures" className="nav-sub-link">Expenditure</NavLink>
                        <NavLink to="/batch/claim" className="nav-sub-link">Batch</NavLink>
                        <NavLink to="/payments" className="nav-sub-link">Payments</NavLink>
                    </nav>
                </li>

                <li className="nav-item show">
                    <a href="#" className="nav-link with-sub"><FiLifeBuoy /> Staff Services</a>
                    <nav className="nav nav-sub">
                        <NavLink to="/claims" className="nav-sub-link">Claims</NavLink>
                    </nav>
                </li>
                <li className="nav-item show">
                    <a href="#" className="nav-link with-sub"><FiGlobe /> Approvals</a>
                    <nav className="nav nav-sub">
                        <NavLink to="/approve/expenditures" className="nav-sub-link">Expenditures</NavLink>
                    </nav>
                </li>


            </ul>
        </div>
    )
}

export default Aside
