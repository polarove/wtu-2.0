import Cycles from './instance'

export const getFissureList = (server: string) => {
    return Cycles.get(`/fissures/${server}`)
}

export const getAlerts = (server: string) => {
    return Cycles.get(`/alerts/${server}`)
}

export const getArbitrationCycle = (server: string) => {
    return Cycles.get(`/arbitration/${server}`)
}

export const getVoidTraderCycle = (server: string) => {
    return Cycles.get(`/voidTrader/${server}`)
}

export const getEarthCycle = (server: string) => {
    return Cycles.get(`/earthCycle/${server}`)
}

export const getCetusCycle = (server: string) => {
    return Cycles.get(`/cetusCycle/${server}`)
}

export const getCambionCycle = (server: string) => {
    return Cycles.get(`/cambionCycle/${server}`)
}

export const getVallisCycle = (server: string) => {
    return Cycles.get(`/vallisCycle/${server}`)
}

export const getZarimanCycle = (server: string) => {
    return Cycles.get(`/zarimanCycle/${server}`)
}

export const getDuviriCycle = (server: string) => {
    return Cycles.get(`/duviriCycle/${server}`)
}
