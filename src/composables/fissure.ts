import { relicTier, relicTireNum } from '@composables/relic'
import type { RouteRecordName } from 'vue-router'

export interface fissure {
    activation: string
    active: boolean
    enemy: string
    enemyKey: string
    eta: string
    expired: boolean
    expiry: string
    id: string
    isHard: boolean
    isStorm: boolean
    missionKey: string
    missionType: string
    node: string
    nodeKey: string
    startString: string
    tier: relicTier
    tierNum: relicTireNum
    //local property
    subscribed: boolean
    refreshing: boolean
}

export interface subscription {
    channel: RouteRecordName | null | undefined
    mission: Array<fissureMission>
}
export interface fissureMission {
    id: string
    nodeKey: string
    missionKey: string
}
