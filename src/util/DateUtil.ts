import moment from 'moment-timezone'
import 'moment/dist/locale/zh-cn'
import { isBlank } from './StrUtil'

export enum format {
    year = 'YYYY-MM-DD HH:mm:ss',
    day = 'DD [天] HH:mm:ss',
    hour = 'HH:mm:ss',
}

export enum timezone {
    shanghai = 'Asia/Shanghai',
}

export const FormatDate = (date: string) => {
    return moment(date).format(format.year)
}

export const FormatDateAs = (date: string, format: string) => {
    return moment(date).format(format)
}

export const TimePassed = (date: string) => {
    return moment(date).fromNow()
}

export const utcTimestamp = (UTC: string, tz?: string): number => {
    if (isBlank(tz)) {
        tz = timezone.shanghai
    }
    return Number(moment.tz(UTC, tz!))
}

export const formatUTC = (UTC: string, tz?: string, fm?: format): string => {
    if (isBlank(tz)) {
        tz = timezone.shanghai
    }
    if (isBlank(fm)) {
        fm = format.year
    }
    return moment.tz(UTC, tz!).format(fm)
}
