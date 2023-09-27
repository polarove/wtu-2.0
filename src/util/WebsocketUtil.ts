import type { RouteRecordName } from 'vue-router'
import { wssStore } from '@/store'
import { parseData } from '@/util/ObjectUtil'

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

    on_open(callback: Function) {
        this.wss.onopen = (event) => {
            callback()
        }
    }

    on_message(callback: Function) {
        this.wss.onmessage = (event) => {
            callback(parseData(event.data, 'data'))
        }
    }

    on_error(data: any, callback: Function) {
        this.wss.onerror = () => {
            if (callback) {
                callback()
            }
        }
    }

    on_close(data: any, callback: Function) {
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
        console.log('closing...')

        this.wss.close()
    }

    // createConnection(callback: Function) {
    //     this.wss.onopen = () => {
    //         if (callback) {
    //             callback()
    //         }
    //     }
    // }

    // joinChannel(
    //     route: RouteRecordName | null | undefined,
    //     uuid: string,
    //     server: number,
    //     callback: Function
    // ) {
    //     this.wss.send(
    //         JSON.stringify({
    //             route: route,
    //             uuid: uuid,
    //             action: websocket.CONNECT,
    //             server: server,
    //         })
    //     )
    //     this.wss.onmessage = (event) => {
    //         console.log(1)

    //         let result = parseData(event.data, 'data') as AfterConnectionVO
    //         if (callback) {
    //             callback(result)
    //         }
    //     }
    // }

    // disconnect(
    //     route: RouteRecordName | null | undefined,
    //     uuid: string,
    //     server: number,
    //     callback: Function
    // ) {
    //     this.wss.send(
    //         JSON.stringify({
    //             route: route,
    //             uuid: uuid,
    //             action: websocket.DISCONNECT,
    //             server: server,
    //         })
    //     )
    //     this.wss.onmessage = (event) => {
    //         console.log(event.data)

    //         if (callback) {
    //             callback(JSON.parse(event.data))
    //         }
    //     }
    // }

    // message(
    //     from: string,
    //     receiver: string,
    //     server: number,
    //     data: any,
    //     callback: Function
    // ) {
    //     this.wss.send(
    //         JSON.stringify({
    //             from: from,
    //             receiver: receiver,
    //             data: data,
    //             server: server,
    //             action: websocket.MESSAGE,
    //         })
    //     )
    //     this.wss.onmessage = (event) => {
    //         if (callback) {
    //             callback(JSON.parse(event.data))
    //         }
    //     }
    // }
}
