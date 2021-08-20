import {API_ENDPOINT} from '../config'
import axios from 'axios'

class Auth {
    constructor() {
        this.state = {
            response: null
        }
    }

    login = (email, password) => {
        this.state.response = axios.post(`${API_ENDPOINT}login`, {email, password})
        return Promise.resolve(this.state.response)
    }
}

export default new Auth()