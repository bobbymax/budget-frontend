import {
    LOADING_RESPONSE,
    CLEAR_LOADER
} from '../accessControl/types'
import Controllers from '../../services/classes/Controllers'

export const index = (entity, broadcast) => dispatch => {
    dispatch({type: LOADING_RESPONSE})

    Controllers.index(entity)
    .then(res => {
        dispatch({
            type: broadcast.success,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: broadcast.failed,
            payload: err.message
        })
    })

    dispatch({type: CLEAR_LOADER})
}

export const fetch = (entity, id, broadcast) => dispatch => {
    dispatch({type: LOADING_RESPONSE})

    Controllers.fetch(entity, id)
    .then(res => {
        dispatch({
            type: broadcast.success,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: broadcast.failed,
            payload: err.message
        })
    })

    dispatch({type: CLEAR_LOADER})
}

export const store = (entity, body, broadcast) => dispatch => {
    dispatch({type: LOADING_RESPONSE})

    Controllers.store(entity, body)
    .then(res => {
        dispatch({
            type: broadcast.success,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: broadcast.failed,
            payload: err.message
        })
    })
    
    dispatch({type: CLEAR_LOADER})
}

export const update = (entity, id, body, broadcast) => dispatch => {
    dispatch({type: LOADING_RESPONSE})

    Controllers.update(entity, id, body)
    .then(res => {
        dispatch({
            type: broadcast.success,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: broadcast.failed,
            payload: err.message
        })
    }) 
    
    dispatch({type: CLEAR_LOADER})
}

export const destroy = (entity, id, broadcast) => dispatch => {
    dispatch({type: LOADING_RESPONSE})

    Controllers.destroy(entity, id)
    .then(res => {
        dispatch({
            type: broadcast.success,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: broadcast.failed,
            payload: err.message
        })
    }) 

    dispatch({type: CLEAR_LOADER})
}

export const bulk = (entity, data, broadcast) => dispatch => {
    dispatch({type: LOADING_RESPONSE})

    Controllers.bulkSubmit(entity, data)
    .then(res => {
        dispatch({
            type: broadcast.success,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: broadcast.failed,
            payload: err.message
        })
    }) 

    dispatch({type: CLEAR_LOADER})
}