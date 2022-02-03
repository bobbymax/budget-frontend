/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
// import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
// import { LOGGED_OUT } from '../../store/types'

const Header = () => {

    // const navigate = useNavigate()

    // const history = useHistory()

    // const dispatch = useDispatch()
    const handleLogOut = () => {
      // dispatch({ type: LOGGED_OUT })
      // history.push('/login')
    }

    return (
        <div id="kt_header" className="header align-items-stretch">
  {/*begin::Container*/}
  <div className="container-fluid d-flex align-items-stretch justify-content-between">
    {/*begin::Aside mobile toggle*/}
    <div className="d-flex align-items-center d-lg-none ms-n2 me-2" title="Show aside menu">
      <div className="btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px" id="kt_aside_mobile_toggle">
        {/*begin::Svg Icon | path: icons/duotune/abstract/abs015.svg*/}
        <span className="svg-icon svg-icon-1">
          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
            <path d="M21 7H3C2.4 7 2 6.6 2 6V4C2 3.4 2.4 3 3 3H21C21.6 3 22 3.4 22 4V6C22 6.6 21.6 7 21 7Z" fill="black" />
            <path opacity="0.3" d="M21 14H3C2.4 14 2 13.6 2 13V11C2 10.4 2.4 10 3 10H21C21.6 10 22 10.4 22 11V13C22 13.6 21.6 14 21 14ZM22 20V18C22 17.4 21.6 17 21 17H3C2.4 17 2 17.4 2 18V20C2 20.6 2.4 21 3 21H21C21.6 21 22 20.6 22 20Z" fill="black" />
          </svg>
        </span>
        {/*end::Svg Icon*/}
      </div>
    </div>
    {/*end::Aside mobile toggle*/}
    {/*begin::Mobile logo*/}
    
    <div className="d-flex align-items-center flex-grow-1 flex-lg-grow-0">
      <a href="../../demo1/dist/index.html" className="d-lg-none">
        <img alt="Logo" src="assets/media/logos/logo-2.svg" className="h-30px" />
      </a>
    </div>
    {/*end::Mobile logo*/}
    {/*begin::Wrapper*/}

    
    <div className="d-flex align-items-stretch justify-content-between flex-lg-grow-1">
        {/*begin::Navbar*/}
        <div className="d-flex align-items-center" id="kt_header_nav">
            {/*begin::Page title*/}
            <div data-kt-swapper="true" data-kt-swapper-mode="prepend" data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_header_nav'}" className="page-title d-flex align-items-center flex-wrap me-3 mb-5 mb-lg-0">
                {/*begin::Title*/}
                <h1 className="d-flex align-items-center text-dark fw-bolder fs-3 my-1">Light</h1>
                {/*end::Title*/}
                {/*begin::Separator*/}
                <span className="h-20px border-gray-300 border-start mx-4" />
                {/*end::Separator*/}
                {/*begin::Breadcrumb*/}
                <ul className="breadcrumb breadcrumb-separatorless fw-bold fs-7 my-1">
                    {/*begin::Item*/}
                    <li className="breadcrumb-item text-muted">
                        <a href="../../demo1/dist/index.html" className="text-muted text-hover-primary">Home</a>
                    </li>
                    {/*end::Item*/}
                    {/*begin::Item*/}
                    <li className="breadcrumb-item">
                        <span className="bullet bg-gray-300 w-5px h-2px" />
                    </li>
                    {/*end::Item*/}
                    {/*begin::Item*/}
                    <li className="breadcrumb-item text-dark">No Toolbar</li>
                    {/*end::Item*/}
                </ul>
                {/*end::Breadcrumb*/}
            </div>
            {/*end::Page title*/}
        </div>
        {/*end::Navbar*/}
      {/*begin::Topbar*/}
      <div className="d-flex align-items-stretch flex-shrink-0">
        {/*begin::Toolbar wrapper*/}
        <div className="d-flex align-items-stretch flex-shrink-0">
          {/*begin::User*/}
          <div className="d-flex align-items-center ms-1 ms-lg-3" id="kt_header_user_menu_toggle">
            {/*begin::Menu wrapper*/}
            <div className="cursor-pointer symbol symbol-30px symbol-md-40px" data-kt-menu-trigger="click" data-kt-menu-attach="parent" data-kt-menu-placement="bottom-end">
              <img src="assets/media/avatars/150-26.jpg" alt="user" />
            </div>
            {/*begin::Menu*/}
            <div className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px" data-kt-menu="true">
              {/*begin::Menu item*/}
              <div className="menu-item px-3">
                <div className="menu-content d-flex align-items-center px-3">
                  {/*begin::Avatar*/}
                  <div className="symbol symbol-50px me-5">
                    <img alt="Logo" src="assets/media/avatars/150-26.jpg" />
                  </div>
                  {/*end::Avatar*/}
                  {/*begin::Username*/}
                  <div className="d-flex flex-column">
                    <div className="fw-bolder d-flex align-items-center fs-5">Max Smith
                      <span className="badge badge-light-success fw-bolder fs-8 px-2 py-1 ms-2">Pro</span></div>
                    <a href="#" className="fw-bold text-muted text-hover-primary fs-7">max@kt.com</a>
                  </div>
                  {/*end::Username*/}
                </div>
              </div>
              {/*end::Menu item*/}
              {/*begin::Menu separator*/}
              <div className="separator my-2" />
              {/*end::Menu separator*/}
              {/*begin::Menu item*/}
              <div className="menu-item px-5">
                <a href="../../demo1/dist/account/overview.html" className="menu-link px-5">My Profile</a>
              </div>
              {/*end::Menu item*/}
              {/*begin::Menu item*/}
              <div className="menu-item px-5">
                <a href="../../demo1/dist/apps/projects/list.html" className="menu-link px-5">
                  <span className="menu-text">My Projects</span>
                  <span className="menu-badge">
                    <span className="badge badge-light-danger badge-circle fw-bolder fs-7">3</span>
                  </span>
                </a>
              </div>
              {/*end::Menu item*/}
              {/*begin::Menu separator*/}
              <div className="separator my-2" />
              {/*end::Menu separator*/}
              {/*begin::Menu item*/}
              <div className="menu-item px-5 my-1">
                <a href="../../demo1/dist/account/settings.html" className="menu-link px-5">Account Settings</a>
              </div>
              {/*end::Menu item*/}
              {/*begin::Menu item*/}
              <div className="menu-item px-5">
                <Link to="#" onClick={handleLogOut} className="menu-link px-5">Sign Out</Link>
              </div>
              {/*end::Menu item*/}
            </div>
            {/*end::Menu*/}
            {/*end::Menu wrapper*/}
          </div>
          {/*end::User */}
        </div>
        {/*end::Toolbar wrapper*/}
      </div>
      {/*end::Topbar*/}
    </div>
    {/*end::Wrapper*/}
  </div>
  {/*end::Container*/}
</div>

    )
}

export default Header
