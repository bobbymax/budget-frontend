const authHeader = () => {
    const token = localStorage.getItem('token')

    if (token) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        }

        return config
    } else {
        return {}
    }
}

export default authHeader