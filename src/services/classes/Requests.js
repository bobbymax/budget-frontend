import authHeader from '../../redux/headers'
import {API_ENDPOINT} from '../config'
import axios from 'axios'
// import { useDispatch } from 'react-redux'

class Requests
{
    index = entity => {
        return Promise.resolve(axios.get(`${API_ENDPOINT + entity}`, authHeader()))
    }

    store = (entity, body) => {
        return Promise.resolve(axios.post(`${API_ENDPOINT + entity}`, body, authHeader()))
    }

    update = (entity, id, body) => {
        return Promise.resolve(axios.patch(`${API_ENDPOINT + entity}/${id}`, body, authHeader()))
    }

    fetch = (entity, id) => {
        return Promise.resolve(axios.get(`${API_ENDPOINT + entity}/${id}`), authHeader())
    }

    destroy = (entity, id) => {
        return Promise.resolve(axios.delete(`${API_ENDPOINT + entity}/${id}`, authHeader()))
    }

    custom = (entity, id, url) => {
        return Promise.resolve(axios.get(`${API_ENDPOINT + entity}/${id}/${url}`, authHeader()))
    }
}

export default new Requests()