import Cycles from './instance'
import { authStore } from '@/store'
const _authStore = authStore()

export const getFissureList = () => {
    return Cycles.get(`/fissures/${_authStore.getServerChar()}`)
}

export const getAlerts = () => {
    return Cycles.get(`/alerts/${_authStore.getServerChar()}`)
}

export const getArbitrationCycle = () => {
    return Cycles.get(`/arbitration/${_authStore.getServerChar()}`)
}

export const getVoidTraderCycle = () => {
    return Cycles.get(`/voidTrader/${_authStore.getServerChar()}`)
}

export const getEarthCycle = () => {
    return Cycles.get(`/earthCycle/${_authStore.getServerChar()}`)
}

export const getCetusCycle = () => {
    return Cycles.get(`/cetusCycle/${_authStore.getServerChar()}`)
}

export const getCambionCycle = () => {
    return Cycles.get(`/cambionCycle/${_authStore.getServerChar()}`)
}

export const getVallisCycle = () => {
    return Cycles.get(`/vallisCycle/${_authStore.getServerChar()}`)
}

export const getZarimanCycle = () => {
    return Cycles.get(`/zarimanCycle/${_authStore.getServerChar()}`)
}

export const getDuviriCycle = () => {
    return Cycles.get(`/duviriCycle/${_authStore.getServerChar()}`)
}

export const getArchonHunt = () => {
    return Cycles.get(`/archonHunt/${_authStore.getServerChar()}`)
}

export const getSortie = () => {
    return Cycles.get(`/sortie/${_authStore.getServerChar()}`)
}
