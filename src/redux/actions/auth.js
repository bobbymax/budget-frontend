import {
    LOADING_RESPONSE,
    LOGIN_SUCCESSFUL,
    INVALID_CREDENTIALS,
    LOGIN_FAILURE,
    CLEAR_LOADER
} from '../accessControl/types'
import Auth from '../../services/classes/Auth'

export const login = (email, password) => dispatch => {
    dispatch({type: LOADING_RESPONSE})

    Auth.login(email, password)
    .then(res => {
        const data = res.data

        if(data.status === "success") {
            dispatch({
                type: LOGIN_SUCCESSFUL,
                payload: data
            })
        } else {
            dispatch({
                type: INVALID_CREDENTIALS,
                payload: data
            })
        }
    })
    .catch(err => {
        dispatch({
            type: LOGIN_FAILURE,
            payload: err.message
        })
    })
    
    dispatch({type: CLEAR_LOADER})
}