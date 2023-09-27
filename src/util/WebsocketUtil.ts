import type { RouteRecordName } from 'vue-router'
import { wssStore, authStore } from '@/store'

const _wssStore = wssStore()
const _authStore = authStore()

export class websocket {
    public wss: WebSocket

    private static readonly CONNECT = 1

    private static readonly DISCONNECT = 2

    private static readonly MESSAGE = 3

    constructor() {
        let full_address
        if (_authStore.getServer()) {
            full_address = import.meta.env.VITE_APP_WSS_EN_ORIGIN + '/en'
        } else {
            full_address = import.meta.env.VITE_APP_WSS_CN_ORIGIN + '/cn'
        }
        this.wss = new WebSocket(full_address)
    }

    createConnection(callback: Function) {
        this.wss.onopen = () => {
            if (callback) {
                callback()
            }
        }
    }

    joinChannel(
        route: RouteRecordName | null | undefined,
        uuid: string,
        server: number
    ) {
        this.wss.send(
            JSON.stringify({
                route: route,
                uuid: uuid,
                action: websocket.CONNECT,
                server: server,
            })
        )
        this.wss.onmessage = (event) => {
            let res = JSON.parse(event.data)
            _wssStore.setOnlineNumber(res.data)
        }
    }

    disconnect(route: RouteRecordName | null | undefined, uuid: string) {
        this.wss.send(
            JSON.stringify({
                route: route,
                uuid: uuid,
                action: websocket.DISCONNECT,
            })
        )
    }

    message(from: string, receiver: string, data: any, callback: Function) {
        this.wss.send(
            JSON.stringify({
                from: from,
                receiver: receiver,
                data: data,
                action: websocket.MESSAGE,
            })
        )
        this.wss.onmessage = (event) => {
            if (callback) {
                callback(event)
            }
        }
    }
}
