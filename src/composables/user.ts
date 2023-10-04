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
    booster: UserBooster
    accelerator: string
}

export interface UserBooster {
    affinityBooster: number
    creditBooster: number
    modDropRateBooster: number
    resourceBooster: number
    resourceDropRateBooster: number
}
