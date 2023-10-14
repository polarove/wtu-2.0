import { warframes, type warframe } from '@composables/warframe'
import { authStore } from '@/store'
import entries from '@/composables/entries'
const _authStore = authStore()

export const filterWarframeNameList = (
    routeName: string,
    search: string
): Array<string> => {
    let result: Array<string> = []
    if (routeName === entries.duviri) {
        result = warframes
            .filter((warframe) =>
                warframe[_authStore.getServerChar()].toString().includes(search)
            )
            .map((warframe) => warframe[_authStore.getServerChar()])
    } else {
        result = warframes
            .filter((warframe) => !isStalker(warframe.en))
            .filter((warframe) =>
                warframe[_authStore.getServerChar()].toString().includes(search)
            )
            .map((warframe) => warframe[_authStore.getServerChar()])
    }
    return result
}

export const searchWarframe = (name: string | undefined): warframe => {
    return warframes.find(
        (warframe) => warframe[_authStore.getServerChar()] === name
    ) as warframe
}

export const isAny = (name: string): boolean => {
    return name === 'Any'
}

export const isStalker = (name: string): boolean => {
    return name === 'Stalker'
}
