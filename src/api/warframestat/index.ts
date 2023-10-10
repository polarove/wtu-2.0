import { isBlank } from '@/util/StrUtil'
import warframestat from './instance'

export const getFissureList = (platform?: 'pc' | 'ps4' | 'xb1' | 'swi') => {
    if (isBlank(platform)) {
        platform = 'pc'
    }
    return warframestat.get(`/${platform}/fissures/`, { language: 'zh' })
}

export const getEarthCycle = (platform?: 'pc' | 'ps4' | 'xb1' | 'swi') => {
    if (isBlank(platform)) {
        platform = 'pc'
    }
    return warframestat.get(`/${platform}/earthCycle/`, { language: 'zh' })
}

export const getCetusCycle = (platform?: 'pc' | 'ps4' | 'xb1' | 'swi') => {
    if (isBlank(platform)) {
        platform = 'pc'
    }
    return warframestat.get(`/${platform}/cetusCycle/`, { language: 'zh' })
}

export const getCambionCycle = (platform?: 'pc' | 'ps4' | 'xb1' | 'swi') => {
    if (isBlank(platform)) {
        platform = 'pc'
    }
    return warframestat.get(`/${platform}/cambionCycle/`, { language: 'zh' })
}

export const getVallisCycle = (platform?: 'pc' | 'ps4' | 'xb1' | 'swi') => {
    if (isBlank(platform)) {
        platform = 'pc'
    }
    return warframestat.get(`/${platform}/vallisCycle/`, { language: 'zh' })
}

export const getZarimanCycle = (platform?: 'pc' | 'ps4' | 'xb1' | 'swi') => {
    if (isBlank(platform)) {
        platform = 'pc'
    }
    return warframestat.get(`/${platform}/zarimanCycle/`, { language: 'zh' })
}

export const getVoidTraderCycle = (platform?: 'pc' | 'ps4' | 'xb1' | 'swi') => {
    if (isBlank(platform)) {
        platform = 'pc'
    }
    return warframestat.get(`/${platform}/voidTrader/`, { language: 'zh' })
}

export const getDuviriCycle = (platform?: 'pc' | 'ps4' | 'xb1' | 'swi') => {
    if (isBlank(platform)) {
        platform = 'pc'
    }
    return warframestat.get(`/${platform}/duviriCycle/`, { language: 'zh' })
}

export const getArbitrationCycle = (
    platform?: 'pc' | 'ps4' | 'xb1' | 'swi'
) => {
    if (isBlank(platform)) {
        platform = 'pc'
    }
    return warframestat.get(`/${platform}/arbitration/`, { language: 'zh' })
}
