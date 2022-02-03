import {API_ENDPOINT} from '../config'
import axios from 'axios'

class Auth {
    constructor() {
        this.state = {
            response: null
        }
    }

    login = (staff_no, password) => {
        this.state.response = axios.post(`${API_ENDPOINT}login`, {staff_no, password})
        return Promise.resolve(this.state.response)
    }
}

export default new Auth()