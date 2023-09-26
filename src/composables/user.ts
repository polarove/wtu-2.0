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

export interface UserBO {
    uuid: string
    name: string
    avatar: string
    onlineStatus: number
    boosterList: string[]
}
