import moment from 'moment'
import 'moment/dist/locale/zh-cn'

export const FormatDate = (date: string) => {
    return moment(date).format('YYYY-MM-DD HH:mm:ss')
}

export const DateBefore = (date: string) => {
    return moment(date).fromNow()
}
