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

export const RemoveTeam = (id: number) => {
    return TeamController.get('/removeTeam', { id: id })
}
