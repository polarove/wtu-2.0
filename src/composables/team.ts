import { RouteRecordName } from 'vue-router'
import { warframe } from './warframe'
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
