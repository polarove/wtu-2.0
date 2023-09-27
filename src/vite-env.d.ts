/// <reference types="vite/client" />

import { websocket } from '@util/WebsocketUtil'

declare global {
    interface Window {
        wss: websocket
    }
}
