export interface UserVO extends TeamUserBO {
    description: string
    server: number
    level: number
}

export interface TeamUserBO {
    uuid: string
    name: string
    avatar: string
    onlineStatus: number
    affinityBooster: number
    creditBooster: number
    resourceBooster: number
    resourceDropRateBooster: number
    modDropRateBooster: number
    accelerator: string
}
