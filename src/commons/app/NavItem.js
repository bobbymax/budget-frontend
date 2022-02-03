import React from 'react'
import { Link } from 'react-router-dom'

const NavItem = ({
    name, 
    icon, 
    path, 
    title,
    children=[],
    type,
    hasChildren=false,
    active=false
}) => {
    return (
        <>
            {hasChildren && children.length > 0 ? 
                <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                    <span className="menu-link">
                        <span className="menu-icon">
                            {/*begin::Svg Icon | path: icons/duotune/general/gen009.svg*/}
                                <i className={`las ${icon} fs-2`}></i>
                            {/*end::Svg Icon*/}
                        </span>
                        <span className="menu-title">{name}</span>
                        <span className="menu-arrow" />
                    </span>

                    <div className="menu-sub menu-sub-accordion menu-active-bg">
                        {children.map((child, index) => (
                            <div className="menu-item" key={index}>
                                <Link className="menu-link" to={child.path}>
                                    <span className="menu-bullet">
                                    <span className="bullet bullet-dot" />
                                    </span>
                                    <span className="menu-title">{child.name}</span>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            : 
                <div className="menu-item">
                    <Link className={`menu-link ${active && 'active'}`} to={path} title={title}>
                        <span className="menu-icon">
                            {/*begin::Svg Icon | path: icons/duotune/general/gen019.svg*/}
                            <i className={`las ${icon} fs-2`}></i>
                            {/*end::Svg Icon*/}
                        </span>
                        <span className="menu-title">{name}</span>
                    </Link>
                </div> 
            }
        </>
    )
}

export default NavItem
