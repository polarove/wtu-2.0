import request from '../index'

// Cycles
const BASR_API = import.meta.env.VITE_APP_CYCLE_API as string
const BASR_ORIGIN = import.meta.env.VITE_APP_BASE_ORIGIN as string

const Cycles: request = new request({
    baseURL: BASR_API + '/cycles',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': BASR_ORIGIN,
    },
    withCredentials: true,
})

export default Cycles
