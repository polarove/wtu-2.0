export interface requirementsInstance {
    type: string
    name: string
}

export const requirements: Array<requirementsInstance> = [
    {
        type: 'any',
        name: '其他',
    },
    {
        type: 'mission',
        name: '任务',
    },
    {
        type: 'relic',
        name: '虚空遗物',
    },
    {
        type: 'ticket',
        name: '门票',
    },
    {
        type: 'equipment',
        name: '装备',
    },
    {
        type: 'capture',
        name: '捕获数',
    },
    {
        type: 'booster',
        name: '账户加成',
    },
]
