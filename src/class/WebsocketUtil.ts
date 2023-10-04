import {
    SERVER_CODE,
    WSS_MESSAGE_TYPE,
    RESPONSE_CODE,
} from '@/composables/enums'
import { JoinTeamDTO, TeamVO } from '@/composables/team'
import { teamStore, authStore } from '@/store'
import { isNotBlank } from '@util/StrUtil'
import { requires } from '@/util/ObjectUtil'

const _teamStore = teamStore()
const _authStore = authStore()

// import { boosters } from '@/composables/booster'
// const matrix = new MatrixUtil(
//     [1, 0, 0, 0, 1],
//     [1, 0, 0, 0, 1],
//     [1, 1, 1, 0, 1],
//     [1, 0, 0, 0, 1]
// )

// let names = boosters.map((value) => {
//     return value.en
// })

// matrix.columns().forEach((value: Array<any>, index: number) => {
//     bolist[names[index]] = value.includes(1) ? 1 : 0
// })
// console.log(bolist)

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
                    let uuid = application.team.uuid
                    let group = _teamStore.findGroupByUUID(uuid)
                    if (requires(group)) {
                        // 添加申请
                        _teamStore.addApplication(uuid, application)
                    } else {
                        // 获得本地用户booster矩阵
                        let matrix = _teamStore.getUserBoosterMatrix(
                            _authStore.getUserBooster()
                        )
                        // 创建一个新的队伍
                        let newGroup = _teamStore.createGroup(
                            application,
                            matrix
                        )
                        // 设置队伍的booster为本地用户booster
                        newGroup.booster = _authStore.getUserBooster()
                        // 添加队伍
                        _teamStore.addApplicationGroup(newGroup)

                        // 添加申请
                        _teamStore.addApplication(uuid, application)
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
