import warframestat from './instance'

export const getFissureList = () => {
    return warframestat.get('/pc/fissures/', { language: 'zh' })
}
