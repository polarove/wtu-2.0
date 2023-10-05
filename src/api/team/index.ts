import TeamController from './instance'
import type {
    ApplicationDTO,
    TeamVO,
    BroadcastDeleteTeamDTO,
} from '@/composables/team'

export const CreateTeam = (data: any) => {
    return TeamController.post('/createTeam', data)
}

export const GetTeamList = (data: any) => {
    return TeamController.post('/getTeamList', data)
}

export const BroadcastTeam = (data: TeamVO) => {
    return TeamController.post('/broadcastTeam', data)
}

export const BroadcastDeleteTeam = (data: BroadcastDeleteTeamDTO) => {
    return TeamController.post('/broadcastDeleteTeam', data)
}

export const BroadcastToggleTeamStatus = (data: any) => {
    return TeamController.post('/broadcastToggleTeamStatus', data)
}

export const ToggleTeamStatus = (data: any) => {
    return TeamController.post('/toggleTeamStatus', data)
}

export const RemoveTeam = (teamId: number) => {
    return TeamController.post('/removeTeam', teamId)
}

export const GetTeamById = (teamId: number) => {
    return TeamController.get('/getTeamById', { teamId: teamId })
}

export const JoinTeam = (data: ApplicationDTO) => {
    return TeamController.post('/joinTeam', data)
}

export const ApplicationResult = (data: ApplicationDTO) => {
    return TeamController.post('/joinTeam/result', data)
}
