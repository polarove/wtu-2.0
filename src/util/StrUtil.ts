export const isBlank = (str: string) => {
    return !str || /^\s*$/.test(str) || str.length === 0
}

export const isNotBlank = (str: string) => {
    return !isBlank(str)
}
