import { SERVER_CODE, WSS_MESSAGE_TYPE } from '@/composables/enums'
import { TeamVO } from '@/composables/team'
import { teamStore, authStore } from '@/store'
const _teamStore = teamStore()
const _authStore = authStore()
interface RESPONSE {
    action: number
    code: number
    data: string
    message: string
    success: boolean
    time: string
}

export interface WSS_CONNECTION_FEEDBACK {
    total: number
    clients: number
}

export class websocket {
    public wss: WebSocket

    public server: number

    constructor(server: number) {
        let full_address
        if (server === SERVER_CODE.en) {
            full_address = import.meta.env.VITE_APP_WSS_EN_ORIGIN + '/en'
        } else {
            full_address = import.meta.env.VITE_APP_WSS_CN_ORIGIN + '/cn'
        }
        this.server = server
        this.wss = new WebSocket(full_address)
    }

    on_open(callback: Function) {
        this.wss.onopen = () => {
            callback()
        }
    }

    on_message(callback: Function) {
        this.wss.onmessage = (event) => {
            let result: RESPONSE = JSON.parse(event.data)
            switch (result.action) {
                case WSS_MESSAGE_TYPE.CONNECTION:
                    let connectionFeedback: WSS_CONNECTION_FEEDBACK =
                        JSON.parse(result.data)
                    callback(connectionFeedback)
                    break
                case WSS_MESSAGE_TYPE.ADD_TEAM:
                    let TeamVO: TeamVO = JSON.parse(result.data)
                    _teamStore.addTeam(TeamVO)
                    break
                case WSS_MESSAGE_TYPE.REMOVE_TEAM:
                    let teamId: number = JSON.parse(result.data)
                    _teamStore.removeTeam(teamId)
                    break
                case WSS_MESSAGE_TYPE.TOGGLE_STATUS:
                    let TeamVO_: TeamVO = JSON.parse(result.data)
                    if (TeamVO_.team.creatorUuid === _authStore.getUUID()) {
                        break
                    } else if (TeamVO_.team.status) {
                        _teamStore.addTeam(TeamVO_)
                    } else {
                        _teamStore.removeTeam(TeamVO_.team.id)
                    }
                    break
                default:
                    break
            }
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
