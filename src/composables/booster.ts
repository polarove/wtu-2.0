interface Booster {
    cn: string
    en:
        | 'AffinityBooster'
        | 'CreditBooster'
        | 'ModDropRateBooster'
        | 'ResourceBooster'
        | 'ResourceDropRateBooster'
    valid: string
    invalid: string
}

export const boosterList: Booster[] = [
    {
        cn: '经验加成',
        en: 'AffinityBooster',
        valid: 'https://www.neorae.cn/data/img/booster/Affinity/Gold.png',
        invalid: 'https://www.neorae.cn/data/img/booster/Affinity/Invalid.png',
    },
    {
        cn: '资源加成',
        en: 'ResourceBooster',
        valid: 'https://www.neorae.cn/data/img/booster/Resource/Gold.png',
        invalid: 'https://www.neorae.cn/data/img/booster/Resource/Invalid.png',
    },
    {
        cn: '资源掉落几率加成',
        en: 'ResourceDropRateBooster',
        valid: 'https://www.neorae.cn/data/img/booster/ResourceDropRate/Gold.png',
        invalid:
            'https://www.neorae.cn/data/img/booster/ResourceDropRate/Invalid.png',
    },
    {
        cn: 'MOD掉落几率加成',
        en: 'ModDropRateBooster',
        valid: 'https://www.neorae.cn/data/img/booster/ModDropRate/Gold.png',
        invalid:
            'https://www.neorae.cn/data/img/booster/ModDropRate/Invalid.png',
    },
    {
        cn: '现金加成',
        en: 'CreditBooster',
        valid: 'https://www.neorae.cn/data/img/booster/Credit/Gold.png',
        invalid: 'https://www.neorae.cn/data/img/booster/Credit/Invalid.png',
    },
]

export const boosterMap = new Map<string, Booster>()

boosterList.forEach((booster) => {
    boosterMap.set(booster.en, booster)
})
