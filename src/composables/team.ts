import { RouteRecordName } from 'vue-router'
import { warframe } from './warframe'
import { Page } from './types'
import { UserBO } from './user'

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

export interface TeamInstance {
    title: string
    server: number
    channel: RouteRecordName | null | undefined
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
}

export interface TeamMemberBO {
    id: number
    focus: string
    leader: number
    warframe: warframe
    occupied: number
    user: UserBO
    isDeleted: number
}

export interface TeamRequirementBO {
    id: number
    type: string
    content: string
    isDeleted: number
}

export interface TeamList {
    team: TeamBO
    members: Array<TeamMemberBO>
    requirements: Array<TeamRequirementBO>
}

export interface TeamPage extends Page {
    records: Array<TeamList>
}

export interface TeamListParams {
    page: number
    size: number
    server: number | null
    channel: RouteRecordName | undefined | null
    uuid: string | null
}
