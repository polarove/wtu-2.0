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
