import warframestat from './instance'
import { authStore } from '@/store'
const _authStore = authStore()

export const getFissureList = () => {
    return warframestat.get(`/${_authStore.getServerChar()}/fissures/`, {
        language: 'zh',
    })
}

export const getEarthCycle = () => {
    return warframestat.get(`/${_authStore.getServerChar()}/earthCycle/`, {
        language: 'zh',
    })
}

export const getCetusCycle = () => {
    return warframestat.get(`/${_authStore.getServerChar()}/cetusCycle/`, {
        language: 'zh',
    })
}

export const getCambionCycle = () => {
    return warframestat.get(`/${_authStore.getServerChar()}/cambionCycle/`, {
        language: 'zh',
    })
}

export const getVallisCycle = () => {
    return warframestat.get(`/${_authStore.getServerChar()}/vallisCycle/`, {
        language: 'zh',
    })
}

export const getZarimanCycle = () => {
    return warframestat.get(`/${_authStore.getServerChar()}/zarimanCycle/`, {
        language: 'zh',
    })
}

export const getVoidTraderCycle = () => {
    return warframestat.get(`/${_authStore.getServerChar()}/voidTrader/`, {
        language: 'zh',
    })
}

export const getDuviriCycle = () => {
    return warframestat.get(`/${_authStore.getServerChar()}/duviriCycle/`, {
        language: 'zh',
    })
}

export const getArbitrationCycle = () => {
    return warframestat.get(`/${_authStore.getServerChar()}/arbitration/`, {
        language: 'zh',
    })
}

export const getAlerts = () => {
    return warframestat.get(`/${_authStore.getServerChar()}/alerts/`, {
        language: 'zh',
    })
}
