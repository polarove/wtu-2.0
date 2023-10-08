import { relicTier, relicTireNum } from '@composables/relic'

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
}
