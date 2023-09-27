import type { RouteRecordName } from 'vue-router'
import { wssStore } from '@/store'
import { parseData } from '@/util/ObjectUtil'

const _wssStore = wssStore()

interface AfterConnectionVO {
    currentChannel: number
    total: number
}

export class websocket {
    public wss: WebSocket

    private static readonly CONNECT = 1

    private static readonly DISCONNECT = 2

    private static readonly MESSAGE = 3

    constructor(server: number) {
        let full_address
        if (server === 1) {
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
        server: number,
        callback: Function
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
            let result = parseData(event.data, 'data') as AfterConnectionVO
            _wssStore.setOnlineNumber(result.currentChannel)
            if (callback) {
                callback(JSON.parse(event.data))
            }
        }
    }

    disconnect(
        route: RouteRecordName | null | undefined,
        uuid: string,
        server: number,
        callback: Function
    ) {
        this.wss.send(
            JSON.stringify({
                route: route,
                uuid: uuid,
                action: websocket.DISCONNECT,
                server: server,
            })
        )
        this.wss.onmessage = (event) => {
            if (callback) {
                callback(JSON.parse(event.data))
            }
        }
    }

    message(
        from: string,
        receiver: string,
        server: number,
        data: any,
        callback: Function
    ) {
        this.wss.send(
            JSON.stringify({
                from: from,
                receiver: receiver,
                data: data,
                server: server,
                action: websocket.MESSAGE,
            })
        )
        this.wss.onmessage = (event) => {
            if (callback) {
                callback(JSON.parse(event.data))
            }
        }
    }
}
