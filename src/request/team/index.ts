import TeamController from './instance'

export const CreateTeam = (data: any) => {
    return TeamController.post('/createTeam', data)
}
