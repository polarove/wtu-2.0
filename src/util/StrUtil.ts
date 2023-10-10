export const isBlank = (str: string | undefined | null) => {
    return (
        !str ||
        /^\s*$/.test(str) ||
        str.length === 0 ||
        str === null ||
        str === undefined
    )
}

export const isNotBlank = (str: string) => {
    return !isBlank(str)
}
