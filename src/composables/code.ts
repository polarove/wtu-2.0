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

export class ReponseCodeEnum {
    public static readonly unauthorized = new Enum(
        401,
        '尚未认证，请重新登录',
        'failed'
    )

    public static readonly error = new Enum(500, '失败', 'error')
}
