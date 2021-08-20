import authHeader from '../../redux/headers'
import {API_ENDPOINT} from '../config'
import axios from 'axios'

class Controllers {
    constructor() {
        this.state = {
            response: null,
        }
    }

    index = (entity) => {
        this.state.response = axios.get(`${API_ENDPOINT + entity}`, authHeader())
        return Promise.resolve(this.state.response)
    }

    fetch = (entity, id) => {
        this.state.response = axios.get(`${API_ENDPOINT + entity}/${id}`, authHeader())
        return Promise.resolve(this.state.response)
    }

    store = (entity, body) => {
        this.state.response = axios.post(`${API_ENDPOINT + entity}`, body, authHeader())
        return Promise.resolve(this.state.response)
    }

    update = (entity, id, body) => {
        this.state.response = axios.patch(`${API_ENDPOINT + entity}/${id}`, body, authHeader())
        return Promise.resolve(this.state.response)
    }

    destroy = (entity, id) => {
        this.state.response = axios.delete(`${API_ENDPOINT + entity}/${id}`, authHeader())
        return Promise.resolve(this.state.response)
    }

    bulkSubmit = (entity, data) => {
        this.state.response = axios.post(`${API_ENDPOINT + entity}`, data, authHeader())
        return Promise.resolve(this.state.response)
    }
}

export default new Controllers()