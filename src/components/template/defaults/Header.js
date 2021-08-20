/* eslint-disable jsx-a11y/anchor-is-valid */
import './defaults.css'
import {
    FiMenu, 
    FiUser, 
    FiEdit2, 
    FiBriefcase, 
    FiShield, 
    FiLogOut, 
    FiBell, 
    FiSearch, 
    FiHelpCircle
} from 'react-icons/fi'
import { Dropdown } from 'react-bootstrap'

const Header = () => {
    return (
        <div className="header">
            <div className="header-left">
                <a href="#" className="burger-menu"><FiMenu /></a>

                <div className="header-search">
                    <FiSearch />
                    <input type="search" className="form-control" placeholder="What are you looking for?" />
                </div>
                </div>

                <div className="header-right">
                <a href="#" className="header-help-link"><FiHelpCircle /></a>
                <div className="dropdown dropdown-notification">
                    <a href="#" className="dropdown-link new" data-toggle="dropdown"><FiBell /></a>
                    <div className="dropdown-menu dropdown-menu-right">
                        <div className="dropdown-menu-header">
                            <h6>Notifications</h6>
                            <a href=""><i data-feather="more-vertical"></i></a>
                        </div>
                        <div className="dropdown-menu-body">
                            <a href="#" className="dropdown-item">
                                <div className="avatar"><span className="avatar-initial rounded-circle text-primary bg-primary-light">s</span></div>
                                <div className="dropdown-item-body">
                                    <p><strong>Socrates Itumay</strong> marked the task as completed.</p>
                                    <span>5 hours ago</span>
                                </div>
                            </a>
                            <a href="" className="dropdown-item">
                            <div className="avatar"><span className="avatar-initial rounded-circle tx-pink bg-pink-light">r</span></div>
                            <div className="dropdown-item-body">
                                <p><strong>Reynante Labares</strong> marked the task as incomplete.</p>
                                <span>8 hours ago</span>
                            </div>
                            </a>
                            <a href="" className="dropdown-item">
                            <div className="avatar"><span className="avatar-initial rounded-circle tx-success bg-success-light">d</span></div>
                            <div className="dropdown-item-body">
                                <p><strong>Dyanne Aceron</strong> responded to your comment on this <strong>post</strong>.</p>
                                <span>a day ago</span>
                            </div>
                            </a>
                            <a href="" className="dropdown-item">
                            <div className="avatar"><span className="avatar-initial rounded-circle tx-indigo bg-indigo-light">k</span></div>
                            <div className="dropdown-item-body">
                                <p><strong>Kirby Avendula</strong> marked the task as incomplete.</p>
                                <span>2 days ago</span>
                            </div>
                            </a>
                        </div>
                        <div className="dropdown-menu-footer">
                            <a href="">View All Notifications</a>
                        </div>
                    </div>
                </div>
                <Dropdown className="dropdown-loggeduser">
                    <Dropdown.Toggle className="dropdown-link">
                        <div className="avatar avatar-sm">
                            <img src="https://via.placeholder.com/500/637382/fff" className="rounded-circle" alt="" />
                        </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                        <div className="dropdown-menu-header">
                            <div className="media align-items-center">
                            <div className="avatar">
                                <img src="https://via.placeholder.com/500/637382/fff" className="rounded-circle" alt="" />
                            </div>
                            <div className="media-body mg-l-10">
                                <h6>Louise Kate Lumaad</h6>
                                <span>Administrator</span>
                            </div>
                            </div>
                        </div>
                        <div className="dropdown-menu-body">
                            <Dropdown.Item><FiUser /> View Profile</Dropdown.Item>
                            <Dropdown.Item><FiEdit2 /> Edit Profile</Dropdown.Item>
                            <Dropdown.Item><FiBriefcase /> Account Settings</Dropdown.Item>
                            <Dropdown.Item><FiShield /> Privacy Settings</Dropdown.Item>
                            <Dropdown.Item><FiLogOut /> Sign Out</Dropdown.Item>
                        </div>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
      </div>
    )
}

export default Header
