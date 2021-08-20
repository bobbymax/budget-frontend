import React from 'react'
import { useSelector } from 'react-redux'
import {
    Route,
    Redirect
} from 'react-router-dom'

const PrivateRoute = ({component: Component, ...rest}) => {
    const authenticated = useSelector(state => state.access.staff.authenticatedUser)
    return (

        <Route {...rest} render={
            props => {
                if (authenticated === null) {
                    return <Component {...props} />;
                } else {
                    return <Redirect to={
                        {
                            pathname: "/",
                            state: {
                                from: props.location
                            }
                        }
                    } />
                }
            }
        } />
    )
}

export default PrivateRoute
