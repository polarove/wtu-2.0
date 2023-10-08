<template>
    <wtu-header />
    <div class="selections">
        <wtu-selections />
    </div>
    <div class="wrapper">
        <div
            :class="{
                wide: _layoutStore.isWide(),
                compact: _layoutStore.isCompact(),
            }"
        >
            <div>
                <wtu-activity :clients="clients" class="mb-0.75em mt-0.5em" />
                <wtu-team-set class="lt-lg-flex-center" />
            </div>
            <wtu-entries
                :scale="_layoutStore.isWide() ? 1 : 0.8"
                :clients="clients"
                class="entry"
            />
        </div>
        <div class="w-75vw ma-auto min-h-65vh">
            <RouterView />
        </div>
    </div>
    <wtu-footer />
</template>

<script setup lang="ts">
import type { TeamVO, TeamListParams, ApplicationDTO } from '@/composables/team'
import { teamStore, authStore, layoutStore } from '@/store'
import { useWebSocket } from '@vueuse/core'
import type { RouteRecordName } from 'vue-router'
import { WSS_ACTION, SERVER_CODE } from '@composables/enums'
import {
    isDefualtUserName,
    isNotDefualtUserName,
    LAYOUT_ENUM,
} from '@/composables/enums'
import {
    WSS_RESPONSE,
    WSS_CONNECTION_FEEDBACK,
    WSS_MESSAGE_TYPE,
} from '@/composables/wss'
import { RESPONSE_CODE } from '@/api'
import { requires } from '@/util/ObjectUtil'

const _teamStore = teamStore()
const _authStore = authStore()
const _layoutStore = layoutStore()
const route = useRoute()
const TeamListDTO = reactive<TeamListParams>({
    page: 1,
    size: 6,
    server: _authStore.getServer(),
    channel: null,
    uuid: null,
})

interface ChannelDTO {
    route: RouteRecordName | null | undefined
    uuid: string
    server: number | null
    action: WSS_ACTION | null
}
const channelDTO = reactive<ChannelDTO>({
    route: null,
    uuid: '',
    server: null,
    action: null,
})

const clients = ref<number>(0)

const wss_address = computed(() => {
    if (SERVER_CODE.en === _authStore.getServer()) {
        return import.meta.env.VITE_APP_WSS_EN_ORIGIN + '/en'
    } else {
        return import.meta.env.VITE_APP_WSS_CN_ORIGIN + '/cn'
    }
})

const { data, send, close } = useWebSocket(wss_address.value, {
    immediate: true,
    autoClose: false,
})

watchEffect(() => {
    let result: WSS_RESPONSE = JSON.parse(data.value)
    if (result === null) {
        return
    }
    if (
        result.code === RESPONSE_CODE.user_not_login ||
        result.code === RESPONSE_CODE.redirect_login ||
        result.code === RESPONSE_CODE.unknown_game_server
    ) {
        return
    }
    switch (result.action) {
        case WSS_MESSAGE_TYPE.CONNECTION:
            let feedback: WSS_CONNECTION_FEEDBACK = JSON.parse(result.data)
            clients.value = feedback.clients
            data.value = null
            break
        case WSS_MESSAGE_TYPE.ADD_TEAM:
            let TeamVO: TeamVO = JSON.parse(result.data)
            _teamStore.addTeam(TeamVO)
            data.value = null
            break
        case WSS_MESSAGE_TYPE.REMOVE_TEAM:
            let teamId: number = JSON.parse(result.data)
            _teamStore.removeTeam(teamId)
            data.value = null
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
            data.value = null
            break
        case WSS_MESSAGE_TYPE.JOIN:
            let application: ApplicationDTO = JSON.parse(result.data)

            let uuid = application.team.uuid
            let group = _teamStore.findGroupByUUID(uuid)
            if (requires(group)) {
                // 添加申请
                _teamStore.addApplication(application)
            } else {
                // 获得本地用户booster矩阵
                let matrix = _teamStore.getUserBoosterMatrix(
                    _authStore.getUserBooster()
                )

                // 创建一个新的队伍
                let newGroup = _teamStore.createGroup(application, matrix)

                // 设置队伍的booster为本地用户booster
                newGroup.booster = _authStore.getUserBooster()

                // 添加队伍
                _teamStore.addApplicationGroup(newGroup)

                // 添加申请
                _teamStore.addApplication(application)
            }
            data.value = null
            break
        case WSS_MESSAGE_TYPE.JOIN_ACCEPT:
            let feedback_accept: ApplicationDTO = JSON.parse(result.data)
            _teamStore.addApplicationResult(feedback_accept)
            data.value = null
            break
        case WSS_MESSAGE_TYPE.JOIN_REJECT:
            let feedback_reject: ApplicationDTO = JSON.parse(result.data)
            _teamStore.addApplicationResult(feedback_reject)
            data.value = null
            break
        default:
            break
    }
})

const joinChannel = (
    server: number | null,
    to: RouteRecordName | null | undefined
) => {
    channelDTO.action = WSS_ACTION.CONNECT
    channelDTO.route = to
    channelDTO.server = server
    channelDTO.uuid = _authStore.getUUID()
    send(JSON.stringify(channelDTO))
}

const leftChannel = (
    server: number | null,
    from: RouteRecordName | null | undefined,
    callback?: Function
) => {
    channelDTO.action = WSS_ACTION.DISCONNECT
    channelDTO.route = from
    channelDTO.server = server
    channelDTO.uuid = _authStore.getUUID()
    send(JSON.stringify(channelDTO))
    if (callback) {
        callback()
    }
}

const switchChannel = (
    from: RouteRecordName | null | undefined,
    to: RouteRecordName | null | undefined
) => {
    let server = _authStore.getServer()
    leftChannel(server, from, () => {
        joinChannel(server, to)
    })
}

const switchServer = (previous_server: number, target_server: number) => {
    leftChannel(previous_server, route.name, () => {
        joinChannel(target_server, route.name)
    })
}

watch(
    () => _authStore.getServer(),
    (target_server) => {
        let previous_server = target_server ? 0 : 1
        switchServer(previous_server, target_server)
    }
)

const message = computed(() => {
    return _layoutStore.getMode() === LAYOUT_ENUM.default
        ? '双击上方昵称可以进行修改哦~方便大家加入你的队伍'
        : '点击头像进入个人空间，双击昵称可以进行修改哦，方便大家加入你的队伍'
})

const notified = ref<boolean>(false)
const isDefaultName = () => {
    if (isDefualtUserName(_authStore.getName()) && !notified.value) {
        notified.value = true
        ElNotification.warning({
            title: message.value,
            duration: 0,
            position: 'bottom-right',
            showClose: true,
        })
    }
    if (isNotDefualtUserName(_authStore.getName())) {
        ElNotification.closeAll()
    }
}

// component life cycle
onMounted(() => {
    // event listener
    TeamListDTO.channel = route.name
    _teamStore.setParam(TeamListDTO)
    _teamStore.initTeamList()
    joinChannel(_authStore.getServer(), route.name)
    isDefaultName()
})

//component life cycle
onBeforeRouteUpdate((to, from) => {
    TeamListDTO.channel = to.name
    _teamStore.resetPage()
    _teamStore.setParam(TeamListDTO)
    _teamStore.initTeamList()
    switchChannel(from.name, to.name)
    isDefaultName()
})

onBeforeRouteLeave((_, from) => {
    leftChannel(_authStore.getServer(), from.name)
    close()
})

onbeforeunload = () => {
    leftChannel(_authStore.getServer(), route.name)
    close()
}
</script>

<style lang="scss" scoped>
.selections {
    position: fixed;
    right: 0.75rem;
    top: 35%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.wrapper {
    padding: 1em 2em;
    .wide {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .compact {
        display: flex;
        flex-direction: column-reverse;
        justify-content: center;
        align-items: center;
        .entry {
            margin: 1em 0;
        }
    }
}
</style>
