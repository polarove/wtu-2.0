import { warframes, type warframe } from '@composables/warframe'

export const getWarframeList = (
    isDuriviOnly: boolean,
    language: keyof warframe,
    search: string
): Array<string> => {
    let result: Array<string> = []
    if (isDuriviOnly) {
        result = warframes
            .filter((warframe) => warframe.durivi)
            .filter((warframe) =>
                warframe[language].toString().includes(search)
            )
            .map((warframe) => warframe[language]) as any
    } else {
        result = warframes
            .filter((warframe) =>
                warframe[language].toString().includes(search)
            )
            .map((warframe) => warframe[language]) as any
    }
    return result
}

export const getWarframe = (
    name: string | undefined,
    language: keyof warframe
): warframe => {
    return warframes.find((warframe) => warframe[language] === name) as warframe
}
