import AccountController from './instance'

export const Login = (data: any) => {
    return AccountController.post('/login', data)
}

export const Verify = (data: any) => {
    return AccountController.post('/verify', data)
}

export const Logout = (uuid: string) => {
    return AccountController.get('/logout', { uuid: uuid })
}

export const getUserVOByUUID = (uuid: string) => {
    return AccountController.get('/getUserVOByUUID', { uuid: uuid })
}

// export const AIsLogin = (uuid: string) => {
//     return AccountController.get('/isLogin', { uuid: uuid })
// }

export const GetRecoverCode = (email: string) => {
    return AccountController.get('/getRecoverCode', { email: email })
}

export const SubmitCode = (data: any) => {
    return AccountController.post('/submitCode', data)
}

export const ChangePassword = (data: any) => {
    return AccountController.post('/changePassword', data)
}

export const SaveMyName = (data: any) => {
    return AccountController.post('/saveMyName', data)
}

export const UpdateOnlineStatus = (data: any) => {
    return AccountController.post('/updateOnlineStatus', data)
}

export const UpdateUserBooster = (data: any) => {
    return AccountController.post('/updateUserBooster', data)
}
