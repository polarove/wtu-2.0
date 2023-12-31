import AccountController from './instance'
import type { UserBooster } from '@/composables/user'
import type { fissureSubs } from '@/composables/cycles'

interface ToggleServerParam {
    previous: number
    current: number
}

export const Login = (data: any) => {
    return AccountController.post('/login', data)
}

export const LoginByUUID = (uuid: string) => {
    return AccountController.get('/loginByUUID', { uuid: uuid })
}

export const Verify = (data: any) => {
    return AccountController.post('/verify', data)
}

export const Logout = (uuid: string) => {
    return AccountController.get('/logout', { uuid: uuid })
}

export const getUserVOByUUID = () => {
    return AccountController.get('/getUserVOByUUID', null)
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

export const SaveMyProfile = (data: any) => {
    return AccountController.post('/saveMyProfile', data)
}

export const UpdateOnlineStatus = (status: number) => {
    return AccountController.get('/updateOnlineStatus', { status: status })
}

export const UpdateUserAccelerator = (name: string) => {
    return AccountController.get('/updateUserAccelerator', { name: name })
}

export const UpdateUserBooster = (data: UserBooster) => {
    return AccountController.post('/updateUserBooster', data)
}

export const ToggleServer = (serverType: ToggleServerParam) => {
    return AccountController.post('/toggleServer', serverType)
}

export const TogglePlatform = (platform: string) => {
    return AccountController.get('/togglePlatform', { platform: platform })
}

export const uploadFissureSubscriptions = (data: fissureSubs) => {
    return AccountController.post('/uploadFissureSubscriptions', data)
}

export const downloadFissureSubscriptions = (uuid: string) => {
    return AccountController.get('/downloadFissureSubscriptions', {
        uuid: uuid,
    })
}
