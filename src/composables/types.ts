import type { warframe } from '@composables/warframe'
import type { RouteRecordName } from 'vue-router'
// response from server
export interface response {
    code: number
    data: string | User
    message: string
    success: boolean
    timestamp: number
}

// user object
export interface User {
    avatar: string
    description: string
    name: string
    onlineStatus: number | null
    uuid: string
    server: number
    level: number
    boosterList: string[]
}

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
}

export interface teamRequirement {
    type: string
    content: string
}

export interface CreateTeamInstance {
    title: string
    server: number
    channel: RouteRecordName | null | undefined
    requirements: Array<teamRequirement>
    members: Array<TeamMate>
}
