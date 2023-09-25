import { RouteRecordName } from 'vue-router'
import { warframe } from './warframe'
import { Page } from './types'
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
    role: number
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

export interface teamBO {
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
    role: number
    warframe: warframe
    isDeleted: number
}

export interface TeamRequirementBO {
    id: number
    type: string
    content: string
    isDeleted: number
}

export interface TeamList {
    team: teamBO
    members: Array<TeamMemberBO>
    requirements: Array<TeamRequirementBO>
}

export interface TeamPage extends Page {
    records: Array<TeamList>
}

export interface TeamListParams {
    page: number
    size: number
    server: number
    channel: RouteRecordName | undefined | null
}
