import React from 'react'
import { useSelector } from 'react-redux'
import Aside from '../commons/app/Aside'
import Header from '../commons/app/Header'
import Footer from '../commons/app/Footer'
import { formatModules } from '../services/utils/helpers'
import { Route, Redirect } from 'react-router-dom'


const ProtectedOutlet = ({component: Component, ...rest}) => {

    const auth = useSelector(state => state.access.staff.authenticatedUser)

    return (
        <div className="d-flex flex-column flex-root">
            <div className="page d-flex flex-row flex-column-fluid">
                <Aside 
                    modules={auth && formatModules(auth.accessibleModules)}
                />
                <div className="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
                    <Header />

                    <Route {...rest} render={
                        props => {
                            if (auth !== null) {
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

                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default ProtectedOutlet
