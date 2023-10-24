import { ONLINE_STATUS } from '@composables/enums'

export interface UserVO extends TeamUserBO {
    description: string
    server: number
    level: number
}

export interface TeamUserBO {
    uuid: string
    name: string
    avatar: string
    onlineStatus: ONLINE_STATUS
    booster: UserBooster
    accelerator: string
    platform: string
}

export interface UserBooster {
    affinityBooster: number
    creditBooster: number
    modDropRateBooster: number
    resourceBooster: number
    resourceDropRateBooster: number
}
