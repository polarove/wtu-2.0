// response from server
export interface response {
    code: number
    data: string | object
    message: string
    success: boolean
    timestamp: number
}

// user object
export interface User {
    avatar: string
    description: string
    name: string
    uuid: string
    onlineStatus: number
}
