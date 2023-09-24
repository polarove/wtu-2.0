import type { warframe } from '@composables/warframe'
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
    boosterList: string[]
}

// create team object
export interface TeamMate {
    name: string
    level: number
    warframe: warframe
    focus: string
}

export interface CreateTeam {
    title: string
    host: TeamMate
    firstMate: TeamMate
    secondMate: TeamMate
    thirdMate: TeamMate
}
