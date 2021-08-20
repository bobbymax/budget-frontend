import React from 'react'
import {
    Route,
    Redirect
} from 'react-router-dom'
import Header from './template/defaults/Header'
import Brand from './template/defaults/Brand'
import Aside from './template/defaults/Aside'
// import Breadcrumb from './template/defaults/Breadcrumb'
import { useSelector } from 'react-redux'
import "../assets/css/custom.css"

const ProtectedRoute = ({component: Component, ...rest}) => {
    const authenticated = useSelector(state => state.access.staff.authenticatedUser)
    return (
        <>
        <div className="sidebar">
            <Brand />
            <Aside />
        </div>
        <div className="content content-page">
            <Header />
            {/* <Breadcrumb /> */}
            <br /><br />
            <div className="content-body">
                <Route {...rest} render={
                    props => {
                        if (authenticated !== null) {
                            return <Component {...props} />;
                        } else {
                            return <Redirect to={
                                {
                                    pathname: "/login",
                                    state: {
                                        from: props.location
                                    }
                                }
                            } />
                        }
                    }
                } />
            </div>
        </div>
        </>
    )
}

export default ProtectedRoute
