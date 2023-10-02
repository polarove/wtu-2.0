export interface UserVO extends UserBO {
    description: string
    server: number
    level: number
    accelerator: string
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
