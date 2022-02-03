/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Brand from './Brand'
import NavItem from './NavItem'
import Seperator from './Seperator'

const Aside = ({ modules }) => {

    return (
        <div id="kt_aside" className="aside aside-dark aside-hoverable" data-kt-drawer="true" data-kt-drawer-name="aside" data-kt-drawer-activate="{default: true, lg: false}" data-kt-drawer-overlay="true" data-kt-drawer-width="{default:'200px', '300px': '250px'}" data-kt-drawer-direction="start" data-kt-drawer-toggle="#kt_aside_mobile_toggle">
            {/*begin::Brand*/}
            <Brand />
            {/*end::Brand*/}

            {/*begin::Aside menu*/}
            <div className="aside-menu flex-column-fluid">
                {/*begin::Aside Menu*/}
                <div 
                    className="hover-scroll-overlay-y my-5 my-lg-5" 
                    id="kt_aside_menu_wrapper" 
                    data-kt-scroll="true" 
                    data-kt-scroll-activate="{default: false, lg: true}" 
                    data-kt-scroll-height="auto" 
                    data-kt-scroll-dependencies="#kt_aside_logo, #kt_aside_footer" 
                    data-kt-scroll-wrappers="#kt_aside_menu" 
                    data-kt-scroll-offset={0}
                >
                    {/*begin::Menu*/}
                    
                    <div 
                        className="menu menu-column menu-title-gray-800 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-500" 
                        id="#kt_aside_menu" 
                        data-kt-menu="true"
                    >
                        
                        <div className="menu-item">
                            <div className="menu-content pb-2">
                                <span className="menu-section text-muted text-uppercase fs-8 ls-1">Dashboard</span>
                            </div>
                        </div>

                        <NavItem 
                            name="Overview"
                            icon="la-tools"
                            path="/"
                            title="Dashboard overview"
                            active
                        />


                        <div className="menu-item">
                            <div className="menu-content pt-8 pb-2">
                                <span className="menu-section text-muted text-uppercase fs-8 ls-1">Applications</span>
                            </div>
                        </div>

                        {modules && modules.map((module, index) => (
                            module.type === 'application' && (
                                <NavItem 
                                    key={index}
                                    name={module.name}
                                    icon={module.icon}
                                    path={module.path}
                                    title={module.title}
                                    hasChildren={module.children && module.children.length > 0}
                                    children={module.children}
                                />
                            )
                        ))}

                        {/** Seperator */}
                        <Seperator />
                        
                        <div className="menu-item">
                            <a className="menu-link" href="../../demo1/dist/documentation/getting-started/changelog.html">
                                <span className="menu-icon">
                                    {/*begin::Svg Icon | path: icons/duotune/coding/cod003.svg*/}
                                    <i className="las la-wallet fs-2"></i>
                                    {/*end::Svg Icon*/}
                                </span>
                                <span className="menu-title">Change Password</span>
                            </a>
                        </div>
                    </div>
                    {/*end::Menu*/}
                </div>
                {/*end::Aside Menu*/}
            </div>
            {/*end::Aside menu*/}
            {/*begin::Footer*/}
            <div 
                className="aside-footer flex-column-auto pt-5 pb-7 px-5" 
                id="kt_aside_footer"
            >
                <a 
                    href="../../demo1/dist/documentation/getting-started.html" 
                    className="btn btn-custom btn-primary w-100" 
                    data-bs-toggle="tooltip" 
                    data-bs-trigger="hover" 
                    data-bs-dismiss-="click" 
                    title="200+ in-house components and 3rd-party plugins"
                >
                    <span className="btn-label">Docs &amp; Components</span>
                </a>
            </div>
            {/*end::Footer*/}
        </div>

    )
}

export default Aside
