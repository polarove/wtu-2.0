import { parseData } from '@/util/ObjectUtil'

export class websocket {
    public wss: WebSocket

    constructor(server: number) {
        let full_address
        if (server === 1) {
            full_address = import.meta.env.VITE_APP_WSS_EN_ORIGIN + '/en'
        } else {
            full_address = import.meta.env.VITE_APP_WSS_CN_ORIGIN + '/cn'
        }
        this.wss = new WebSocket(full_address)
    }

    on_open(callback: Function) {
        this.wss.onopen = () => {
            callback()
        }
    }

    on_message(callback: Function) {
        this.wss.onmessage = (event) => {
            callback(parseData(event.data, 'data'))
        }
    }

    on_error(callback: Function) {
        this.wss.onerror = () => {
            if (callback) {
                callback()
            }
        }
    }

    on_close(callback: Function) {
        this.wss.onclose = () => {
            if (callback) {
                callback()
            }
        }
    }

    send(data: any, callback: Function) {
        this.wss.send(JSON.stringify(data))
        if (callback) {
            callback()
        }
    }

    close() {
        this.wss.close()
    }
}
