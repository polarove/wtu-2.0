class Enum {
    private readonly code: number
    private readonly type: string
    private readonly comment: string

    constructor(code: number, type: string, comment: string) {
        this.code = code
        this.type = type
        this.comment = comment
    }

    public getCode(): number {
        return this.code
    }

    public getType(): string {
        return this.type
    }

    public getComment(): string {
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

export class ActionEnum extends Enum {
    public static readonly remove = new Enum(0, '删除', 'remove')

    public static readonly add = new Enum(1, '添加', 'add')

    public static readonly update = new Enum(2, '更新', 'update')

    public static readonly REMOVE = 0

    public static readonly ADD = 1

    public static readonly UPDATE = 2
}

export class ReponseCodeEnum extends Enum {
    public static readonly unauthorized = new Enum(
        401,
        '尚未认证，请重新登录',
        'failed'
    )

    public static readonly error = new Enum(500, '失败', 'error')
}

export class ServerEnum extends Enum {
    public static readonly cn = new Enum(0, '国服', 'cn')
    public static readonly en = new Enum(1, '国际服', 'en')

    public static readonly types = [
        {
            code: ServerEnum.cn.getCode(),
            type: ServerEnum.cn.getType(),
            shortcut: ServerEnum.cn.getComment(),
        },
        {
            code: ServerEnum.en.getCode(),
            type: ServerEnum.en.getType(),
            shortcut: ServerEnum.en.getComment(),
        },
    ]
}

export class Difficulty extends Enum {
    public static readonly normal = new Enum(0, '始源星系', 'normal')
    public static readonly hard = new Enum(1, '钢铁之路', 'hard')

    public static readonly types = [
        {
            code: Difficulty.normal.getCode(),
            type: Difficulty.normal.getType(),
            shortcut: Difficulty.normal.getComment(),
        },
        {
            code: Difficulty.hard.getCode(),
            type: Difficulty.hard.getType(),
            shortcut: Difficulty.hard.getComment(),
        },
    ]
}
