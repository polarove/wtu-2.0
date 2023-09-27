import { websocket } from '@util/WebsocketUtil'

declare interface window {
    wss: websocket
}

export = window
