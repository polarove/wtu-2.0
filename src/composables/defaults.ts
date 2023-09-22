export class defaults {
    public static readonly UserName = '一般路过Tenno'

    isDefualtUserName = (name: string): boolean => {
        return name === defaults.UserName
    }

    isNotDefualtUserName = (name: string): boolean => {
        return name !== defaults.UserName
    }
}
