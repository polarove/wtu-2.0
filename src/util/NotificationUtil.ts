import { JoinTeamDTO } from '@/composables/team'

export const requestPermission = () => {
    window.Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            new Notification('通知已开启', {
                body: '您将会收到通知',
                icon: '/favicon.ico',
            })
        }
    })
}

export const team = (application: JoinTeamDTO) => {
    window.Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            new Notification(application.from.name + '申请加入你的队伍', {
                body: application.team.title,
                icon: application.from.avatar,
            })
        } else {
            alert('您已关闭通知, 请在浏览器设置中开启通知')
        }
    })
}
