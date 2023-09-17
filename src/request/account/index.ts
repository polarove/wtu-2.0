import UserController from './instance'

export const ILogin = (data: any) => {
    return UserController.post('/login', data)
}
