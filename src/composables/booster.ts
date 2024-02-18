export interface Booster {
    cn: string
    en:
        | 'affinityBooster'
        | 'creditBooster'
        | 'modDropRateBooster'
        | 'resourceBooster'
        | 'resourceDropRateBooster'
    valid: string
    invalid: string
}

// 警告 不要动这个数组的顺序
// WebsocketUtil.ts 依赖这个顺序
export const boosters: Booster[] = [
    {
        cn: '经验加成',
        en: 'affinityBooster',
        valid: 'https://warframe.team/cdn/booster/Affinity/Gold.png',
        invalid: 'https://warframe.team/cdn/booster/Affinity/Invalid.png',
    },
    {
        cn: '现金加成',
        en: 'creditBooster',
        valid: 'https://warframe.team/cdn/booster/Credit/Gold.png',
        invalid: 'https://warframe.team/cdn/booster/Credit/Invalid.png',
    },
    {
        cn: 'MOD掉落几率加成',
        en: 'modDropRateBooster',
        valid: 'https://warframe.team/cdn/booster/ModDropRate/Gold.png',
        invalid: 'https://warframe.team/cdn/booster/ModDropRate/Invalid.png',
    },
    {
        cn: '资源加成',
        en: 'resourceBooster',
        valid: 'https://warframe.team/cdn/booster/Resource/Gold.png',
        invalid: 'https://warframe.team/cdn/booster/Resource/Invalid.png',
    },
    {
        cn: '资源掉落几率加成',
        en: 'resourceDropRateBooster',
        valid: 'https://warframe.team/cdn/booster/ResourceDropRate/Gold.png',
        invalid:
            'https://warframe.team/cdn/booster/ResourceDropRate/Invalid.png',
    },
]

export const boosterMap = new Map<string, Booster>()

boosters.forEach((booster) => {
    boosterMap.set(booster.en, booster)
})
