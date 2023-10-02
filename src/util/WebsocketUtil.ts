import {
    SERVER_CODE,
    WSS_MESSAGE_TYPE,
    RESPONSE_CODE,
} from '@/composables/enums'
import { JoinTeamDTO, TeamVO } from '@/composables/team'
import { teamStore, authStore } from '@/store'
import { isNotBlank } from './StrUtil'

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
        if (isNotBlank(_authStore.getUUID())) {
            this.wss.onopen = () => {
                callback()
            }
        }
    }

    on_message(callback: Function) {
        this.wss.onmessage = (event) => {
            let result: RESPONSE = JSON.parse(event.data)
            if (
                result.code === RESPONSE_CODE.user_not_login ||
                result.code === RESPONSE_CODE.redirect_login ||
                result.code === RESPONSE_CODE.unknown_game_server
            ) {
                return
            }
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
                case WSS_MESSAGE_TYPE.JOIN:
                    let application: JoinTeamDTO = JSON.parse(result.data)
                    console.log(application)

                    _teamStore.addApplication(application)
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
        console.log(1)

        this.wss.close()
    }
}
