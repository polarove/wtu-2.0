import TeamController from './instance'

export const CreateTeam = (data: any) => {
    return TeamController.post('/createTeam', data)
}

export const GetTeamList = (data: any) => {
    return TeamController.post('/getTeamList', data)
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
