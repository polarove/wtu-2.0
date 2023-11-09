import { relicTier, relicTireNum } from '@composables/relic'
import type { RouteRecordName } from 'vue-router'

export interface subscribed {
    subscribed: boolean
}

export interface EarthCycle extends subscribed {
    id: string
    expiry: string
    activation: string
    isDay: boolean
    state: string
    timeLeft: string
}

export interface CetusCycle extends subscribed {
    id: string
    expiry: string
    activation: string
    isDay: boolean
    state: string
    timeLeft: string
    isCetus: boolean
    shortString: string
}

export interface CambionCycle extends subscribed {
    id: string
    activation: string
    expiry: string
    timeLeft: string
    state: string
    active: string
}

export interface VallisCycle extends subscribed {
    id: string
    activation: string
    expiry: string
    isWarm: boolean
    state: string
    timeLeft: string
    shortString: string
}

export interface VoidTraderCycle extends subscribed {
    id: string
    activation: string
    startString: string
    expiry: string
    active: boolean
    character: string
    location: string
    inventory: Array<any>
    psId: string
    endString: string
    initialStart: string
    schedule: Array<any>
}

export interface ArbitrationCycle extends subscribed {
    id: string
    activation: string
    expiry: string
    enemy: string
    type: string
    archwing: boolean
    sharkwing: boolean
    node: string
    nodeKey: string
    typeKey: string
    expired: boolean
    //local variables
}

export interface ZarimanCycle extends subscribed {
    id: string
    bountiesEndDate: string
    expiry: string
    activation: string
    isCorpus: boolean
    state: string
    timeLeft: string
    shortString: string
}

export interface DuviriCycle extends subscribed {
    id: string
    activation: string
    expiry: string
    state: string
    choices: Array<DuviriChoices>
}

export interface DuviriChoices {
    category: 'normal' | 'hard'
    categoryKey: 'EXC_NORMAL' | 'EXC_HARD'
    choices: Array<string>
}

export interface AlertsCycle extends subscribed {
    id: string
    activation: string
    startString: string
    expiry: string
    active: boolean
    mission: {
        description: string
        node: string
        nodeKey: string
        type: string
        typeKey: string
        faction: string
        factionKey: string
        reward: {
            items: string[]
            countedItems: string[]
            credits: number
            asString: string
            itemString: string
            thumbnail: string
            color: number
        }
        minEnemyLevel: number
        maxEnemyLevel: number
        nightmare: boolean
        archwingRequired: boolean
        isSharkwing: boolean
        levelOverride: string
        enemySpec: string
        advancedSpawners: []
        requiredItems: []
        levelAuras: []
    }
    eta: string
    rewardTypes: string[]
    tag: string
}

export interface ArchonHuntCycle extends subscribed {
    id: string
    activation: string
    startString: string
    expiry: string
    active: boolean
    rewardPool: string
    variants: []
    missions: ArchonHuntMission[]
    boss: string
    faction: string
    expired: boolean
    eta: string
}

export interface ArchonHuntMission {
    node: string
    nodeKey: string
    type: string
    typeKey: string
    nightmare: boolean
    archwingRequired: boolean
    isSharkwing: boolean
    advancedSpawners: []
    requiredItems: []
    levelAuras: []
}

export interface SortieCycle extends subscribed {
    id: string
    activation: string
    startString: string
    expiry: string
    active: boolean
    rewardPool: string
    variants: SortieVariants[]
    missions: []
    boss: string
    faction: string
    expired: boolean
    eta: string
}

export interface SortieVariants {
    missionType: string
    modifier: string
    modifierDescription: string
    node: string
}

export interface fissure extends subscribed {
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

export interface EventCycle extends subscribed {
    id: string
    activation: string
    startString: string
    expiry: string
    active: boolean
    description: string
    tooltip: string
    concurrentNodes: []
    victimNode: string
    rewards: []
    expired: boolean
    health: number
    affiliatedWith: string
    jobs: EventJob[]
    previousJobs: []
    previousId: string
    interimSteps: []
    progressSteps: []
    regionDrops: []
    archwingDrops: []
    asString: string
    metadata: {}
    completionBonuses: []
    altExpiry: string
    altActivation: string
    nextAlt: {
        expiry: string
        activation: string
    }
}

export interface EventJob {
    id: string
    rewardPool: string[]
    type: string
    enemyLevels: []
    standingStages: []
    minMR: 0
    expiry: string
}

export interface subscription {
    channel: RouteRecordName | null | undefined
    mission: Array<fissure>
}
