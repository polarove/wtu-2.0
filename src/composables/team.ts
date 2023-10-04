import { RouteRecordName } from 'vue-router'
import { warframe } from '@composables/warframe'
import { Page } from '@composables/types'
import { TeamUserBO, UserBooster } from '@composables/user'

export interface userInTeam {
    uuid: string
    name: string
    avatar: string
    level: number
}

// create team object
export interface TeamMate {
    user: userInTeam
    warframe: warframe
    focus: string
    leader: number
    occupied: number
}

export interface teamRequirement {
    type: string
    content: string
}

export interface TeamDTO {
    title: string
    server: number
    channel: RouteRecordName | null | undefined
    isPublic: boolean
    requirements: Array<teamRequirement>
    members: Array<TeamMate>
}

export interface TeamBO {
    id: number
    uuid: string
    server: number
    channel: string
    title: string
    status: number
    creatorUuid: string
    isDeleted: number
    isPublic: boolean
    updateTime: string
}

export interface TeamMemberBO {
    id: number
    focus: string
    leader: number
    warframe: warframe
    occupied: number
    user: TeamUserBO
    isDeleted: number
    // below is a local only variable
    localStatus: string
}

export interface TeamRequirementBO {
    id: number
    type: string
    content: string
    isDeleted: number
}

export interface TeamVO {
    team: TeamBO
    members: Array<TeamMemberBO>
    requirements: Array<TeamRequirementBO>
}

export interface TeamPage extends Page {
    records: Array<TeamVO>
}

export interface TeamListParams {
    page: number
    size: number
    server: number | null
    channel: RouteRecordName | undefined | null
    uuid: string | null
}

export interface ApplicationDTO {
    receiver: string
    status: 'static' | 'accepted' | 'rejected' | 'pending'
    isDeleted: number
    from: TeamUserBO
    team: {
        uuid: string
        server: number
        channel: string
        creatorUuid: string
        title: string
    }
    build: {
        id: number
        focus: string
        warframe: warframe
    }
}

export interface ApplicationGroup {
    uuid: string
    title: string
    booster: UserBooster
    matrix: Array<Array<number>>
    applications: Array<ApplicationDTO>
}

export interface BroadcastDeleteTeamDTO {
    teamId: number
    server: number
    route: RouteRecordName | null | undefined
}
