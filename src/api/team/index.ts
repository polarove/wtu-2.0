import TeamController from './instance'
import type {
    JoinTeamParam,
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
    return TeamController.get('/removeTeam', { teamId: teamId })
}

export const GetTeamById = (teamId: number) => {
    return TeamController.get('/getTeamById', { teamId: teamId })
}

export const JoinTeam = (data: JoinTeamParam) => {
    return TeamController.post('/joinTeam', data)
}
