export interface User {
    avatar: string
    description: string
    name: string
    onlineStatus: number | null
    uuid: string
    server: number
    level: number
    affinityBooster: number
    creditBooster: number
    resourceBooster: number
    resourceDropRateBooster: number
    modDropRateBooster: number
}

export interface UserBO {
    uuid: string
    name: string
    avatar: string
    onlineStatus: number
    affinityBooster: number
    creditBooster: number
    resourceBooster: number
    resourceDropRateBooster: number
    modDropRateBooster: number
}
