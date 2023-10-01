import moment from 'moment'
import 'moment/dist/locale/zh-cn'

export const FormatDate = (date: string) => {
    return moment(date).format('YYYY-MM-DD HH:mm:ss')
}

export const FormatDateAs = (date: string, format: string) => {
    return moment(date).format(format)
}

export const TimePassed = (date: string) => {
    return moment(date).fromNow()
}
