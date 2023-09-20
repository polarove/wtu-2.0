import { Component } from 'vue'

class Enum {
    private readonly code: number
    private readonly type:
        | number
        | string
        | boolean
        | object
        | symbol
        | Component

    private readonly comment:
        | number
        | string
        | boolean
        | object
        | symbol
        | Component
        | null
        | undefined

    constructor(
        code: number,
        type: number | string | boolean | object | symbol | Component,
        comment:
            | number
            | string
            | boolean
            | object
            | symbol
            | Component
            | null
            | undefined
    ) {
        this.code = code
        this.type = type
        this.comment = comment
    }

    public getCode(): number {
        return this.code
    }

    public getType(): number | string | boolean | object | symbol | Component {
        return this.type
    }

    public getComment():
        | number
        | string
        | boolean
        | object
        | symbol
        | Component
        | null
        | undefined {
        return this.comment
    }

    public equals(enumObj: Enum): boolean {
        return this.code === enumObj.getCode()
    }

    public static getEnumByCode(
        enumClass: any,
        code: number
    ): Enum | undefined {
        for (const enumObj of enumClass) {
            if (enumObj.getCode() === code) {
                return enumObj
            }
        }
        return undefined
    }
}

export class OnlineStatusEnum extends Enum {
    public static readonly offline = new Enum(0, '离线', 'offline')

    public static readonly online = new Enum(1, '在线', 'online')

    public static readonly online_in_game = new Enum(
        2,
        '游戏中',
        'online_in_game'
    )
}

export class AffinityBoosterEnum extends Enum {
    public static readonly invalid = new Enum(
        0,
        '未生效',
        '/src/assets/img/booster/Affinity/invalid.png'
    )
    public static readonly bronze = new Enum(
        3,
        '大于3天',
        '/src/assets/img/booster/Affinity/bronze.png'
    )
    public static readonly silver = new Enum(
        7,
        '大于7天',
        '/src/assets/img/booster/Affinity/silver.png'
    )
    public static readonly gold = new Enum(
        30,
        '大于30天',
        '/src/assets/img/booster/Affinity/gold.png'
    )
}

export class CreditBoosterEnum extends Enum {
    public static readonly invalid = new Enum(
        0,
        '未生效',
        '/src/assets/img/booster/Credit/invalid.png'
    )
    public static readonly bronze = new Enum(
        3,
        '大于3天',
        '/src/assets/img/booster/Credit/bronze.png'
    )
    public static readonly silver = new Enum(
        7,
        '大于7天',
        '/src/assets/img/booster/Credit/silver.png'
    )
    public static readonly gold = new Enum(
        30,
        '大于30天',
        '/src/assets/img/booster/Credit/gold.png'
    )
}

export class ModDropChanceBoosterEnum extends Enum {
    public static readonly invalid = new Enum(
        0,
        '未生效',
        '/src/assets/img/booster/ModDropChance/invalid.png'
    )
    public static readonly bronze = new Enum(
        3,
        '大于3天',
        '/src/assets/img/booster/ModDropChance/bronze.png'
    )
    public static readonly silver = new Enum(
        7,
        '大于7天',
        '/src/assets/img/booster/ModDropChance/silver.png'
    )
    public static readonly gold = new Enum(
        30,
        '大于30天',
        '/src/assets/img/booster/ModDropChance/gold.png'
    )
}

export class ResourceBoosterEnum extends Enum {
    public static readonly invalid = new Enum(
        0,
        '未生效',
        '/src/assets/img/booster/ResourceBoosterEnum/invalid.png'
    )
    public static readonly bronze = new Enum(
        3,
        '大于3天',
        '/src/assets/img/booster/ResourceBoosterEnum/bronze.png'
    )
    public static readonly silver = new Enum(
        7,
        '大于7天',
        '/src/assets/img/booster/ResourceBoosterEnum/silver.png'
    )
    public static readonly gold = new Enum(
        30,
        '大于30天',
        '/src/assets/img/booster/ResourceBoosterEnum/gold.png'
    )
}

export class ResourceDropChanceBoosterEnum extends Enum {
    public static readonly invalid = new Enum(
        0,
        '未生效',
        '/src/assets/img/booster/ResourceDropChance/invalid.png'
    )
    public static readonly bronze = new Enum(
        3,
        '大于3天',
        '/src/assets/img/booster/ResourceDropChance/bronze.png'
    )
    public static readonly silver = new Enum(
        7,
        '大于7天',
        '/src/assets/img/booster/ResourceDropChance/silver.png'
    )
    public static readonly gold = new Enum(
        30,
        '大于30天',
        '/src/assets/img/booster/ResourceDropChance/gold.png'
    )
}
