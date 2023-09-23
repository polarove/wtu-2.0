import request from '../index'

// TeamController
const BASR_API = import.meta.env.VITE_APP_BASE_API as string
const BASR_ORIGIN = import.meta.env.VITE_APP_BASE_ORIGIN as string

const TeamController: request = new request({
    baseURL: BASR_API + '/team',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': BASR_ORIGIN,
    },
    withCredentials: true,
})

export default TeamController
