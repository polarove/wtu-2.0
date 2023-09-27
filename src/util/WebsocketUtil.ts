import type { RouteRecordName } from 'vue-router'
import { wssStore } from '@/store'
const _wssStore = wssStore()
export class websocket {
    public wss: WebSocket

    private static readonly CONNECT = 1

    private static readonly DISCONNECT = 2

    private static readonly MESSAGE = 3

    constructor(address: string, route: string) {
        let full_address = address + route
        this.wss = new WebSocket(full_address)
    }

    createConnection(callback: Function) {
        this.wss.onopen = () => {
            if (callback) {
                callback()
            }
        }
    }

    joinChannel(route: RouteRecordName | null | undefined, uuid: string) {
        this.wss.send(
            JSON.stringify({
                route: route,
                uuid: uuid,
                action: websocket.CONNECT,
            })
        )
        this.wss.onmessage = (event) => {
            let data = JSON.parse(event.data)
            let onlineNumber = data.data
            _wssStore.setOnlineNumber(onlineNumber)
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
