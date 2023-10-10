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
