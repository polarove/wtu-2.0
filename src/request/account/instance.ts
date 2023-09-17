import request from '../index'

// AccountController
const BASR_API = import.meta.env.VITE_APP_BASE_API as string
const BASR_ORIGIN = import.meta.env.VITE_APP_BASE_ORIGIN as string

const UserController: request = new request({
    baseURL: BASR_API + '/account',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': BASR_ORIGIN,
    },
    withCredentials: true,
})

export default UserController
