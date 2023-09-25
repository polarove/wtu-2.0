// response from server
export interface response {
    code: number
    data: string | User
    message: string
    success: boolean
    timestamp: number
}

// user object
export interface User {
    avatar: string
    description: string
    name: string
    onlineStatus: number | null
    uuid: string
    server: number
    level: number
    boosterList: string[]
}
