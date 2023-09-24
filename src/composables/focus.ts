export interface Focus {
    en: string
    cn: string
    value: number
    label: string
}

export const focus: Array<Focus> = [
    {
        en: 'any',
        cn: '任意',
        value: 0,
        label: 'any',
    },
    {
        en: 'Madurai',
        cn: '马杜莱',
        value: 1,
        label: 'M',
    },
    {
        en: 'Naramon',
        cn: '纳拉蒙',
        value: 2,
        label: 'N',
    },
    {
        en: 'Unairu',
        cn: '乌奈鲁',
        value: 3,
        label: 'U',
    },
    {
        en: 'Vazarin',
        cn: '瓦扎林',
        value: 4,
        label: 'V',
    },
    {
        en: 'Zenurik',
        cn: '泽努里克',
        value: 5,
        label: 'Z',
    },
]
