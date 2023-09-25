import TeamController from './instance'

export const CreateTeam = (data: any) => {
    return TeamController.post('/createTeam', data)
}

export const GetTeamList = (data: any) => {
    return TeamController.post('/getTeamList', data)
}
