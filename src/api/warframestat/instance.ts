import request from '../index'

// warframestat

const warframestat: request = new request({
    baseURL: 'https://api.warframestat.us/',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
})

export default warframestat
