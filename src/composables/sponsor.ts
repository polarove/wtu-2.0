export interface I_sponsor {
    level: string
    sponsros: sponsor[]
    range?: string
}

export interface sponsor {
    name: string
    avatar: string
    amount?: number
}

export enum sponsor_level {
    UNIQUE = '松 心 契',
    PLATINUM = '长 青 之 友',
    GOLD = '八 拜 之 交',
    SILVER = '忘 年 之 交',
    BRONZE = '莫 逆 之 交',
    MERCY = '袍 泽 之 谊',
}

export const sponsors: I_sponsor[] = [
    {
        level: sponsor_level.UNIQUE,
        sponsros: [
            {
                name: '魔影陌名',
                avatar: 'https://www.neorae.cn/data/img/sponsor/2023-10-03/mo_ying_mo_ming.jpg',
                amount: 500,
            },
        ],
    },
    {
        level: sponsor_level.PLATINUM,
        sponsros: [
            {
                name: 'Onesade',
                avatar: 'https://www.neorae.cn/data/img/sponsor/2023-10-06/Onesade.jpg',
                amount: 100,
            },
            {
                name: 'Ueana',
                avatar: 'https://www.neorae.cn/data/img/sponsor/2023-10-08/Ueana.jpg',
                amount: 88.8,
            },
        ],
    },
    {
        level: sponsor_level.GOLD,
        sponsros: [],
    },
    {
        level: sponsor_level.SILVER,
        sponsros: [],
    },
    {
        level: sponsor_level.BRONZE,
        sponsros: [],
    },
    {
        level: sponsor_level.MERCY,
        sponsros: [],
    },
]
