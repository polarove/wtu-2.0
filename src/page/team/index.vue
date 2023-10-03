<template>
    <wtu-header />
    <div class="selections">
        <wtu-selections />
    </div>
    <div class="wrapper">
        <div
            :class="{
                wideScreen: _layoutStore.isWide(),
                compactScreen: _layoutStore.isCompact(),
            }"
        >
            <div>
                <wtu-activity :clients="clients" class="mb-0.75em mt-0.5em" />
                <wtu-team-set class="center-min-900px" />
            </div>
            <wtu-entries
                :class="{ compactOnly: _layoutStore.isCompact() }"
                :scale="_layoutStore.isWide() ? 1 : 0.8"
                :clients="clients"
            />
        </div>
        <div class="w-70vw h-100% ma-auto"><RouterView /></div>
    </div>
    <wtu-footer />
</template>

<script setup lang="ts">
import type { TeamVO, TeamListParams, TeamPage } from '@/composables/team'
import { teamStore, authStore, layoutStore } from '@/store'
import { GetTeamList } from '@api/team'
import type { response } from '@/composables/types'
import { websocket, type WSS_CONNECTION_FEEDBACK } from '@util/WebsocketUtil'
import type { RouteRecordName } from 'vue-router'
import { WSS_ACTION } from '@composables/enums'
import {
    isDefualtUserName,
    isNotDefualtUserName,
    LAYOUT_ENUM,
} from '@/composables/enums'

const _teamStore = teamStore()
const _authStore = authStore()
const _layoutStore = layoutStore()
const route = useRoute()
const TeamParams = reactive<TeamListParams>({
    page: 1,
    size: 6,
    server: _authStore.getServer(),
    channel: null,
    uuid: null,
})

const initLayouts = () => {
    if (document.body.clientWidth < 900) {
        _layoutStore.setMode(LAYOUT_ENUM.compact)
    } else {
        _layoutStore.setMode(LAYOUT_ENUM.wide)
    }
}

const wss = new websocket(_authStore.getServer())

const clients = ref<number>(0)

const ChannelParam = reactive({
    route: route.name,
    uuid: _authStore.getUUID(),
    server: _authStore.getServer(),
    action: 1,
})

const createConnection = () => {
    wss.on_open(() => {
        joinChannel()
    })
}

const joinChannel = (to?: RouteRecordName | null | undefined) => {
    ChannelParam.action = WSS_ACTION.CONNECT
    to ? (ChannelParam.route = to) : (ChannelParam.route = route.name)
    wss.send(ChannelParam, () => {
        wss.on_message((data: WSS_CONNECTION_FEEDBACK) => {
            clients.value = data.clients
        })
    })
}

const disconnect = (
    from?: RouteRecordName | null | undefined,
    callback?: Function
) => {
    ChannelParam.action = WSS_ACTION.DISCONNECT
    from ? (ChannelParam.route = from) : (ChannelParam.route = route.name)
    wss.send(ChannelParam, () => {
        wss.on_message((data: WSS_CONNECTION_FEEDBACK) => {
            clients.value = data.clients
        })
    })
    if (callback) {
        callback()
    }
}

const switchChannel = (
    from: RouteRecordName | null | undefined,
    to: RouteRecordName | null | undefined
) => {
    disconnect(from, () => {
        joinChannel(to)
    })
}

const autoRefresh = (interval: number) => {
    setInterval(() => {
        GetTeamList(_teamStore.getParam()).then(
            (res: response<TeamPage> | any) => {
                _teamStore.setTeam(res.data.records as Array<TeamVO>)
            }
        )
        console.log('重新获取队伍列表中...')
    }, interval)
}

// component life cycle
onMounted(() => {
    initLayouts()
    // event listener
    window.addEventListener('resize', initLayouts)
    TeamParams.channel = route.name
    _teamStore.setParam(TeamParams)
    _teamStore.initTeamList()
    createConnection()
    autoRefresh(1000 * 60 * 3)
})

//component life cycle
onBeforeRouteUpdate((to, from) => {
    TeamParams.channel = to.name
    _teamStore.resetPage()
    _teamStore.setParam(TeamParams)
    _teamStore.initTeamList()
    switchChannel(from.name, to.name)
})

// onBeforeUnmount(() => {
//     window.removeEventListener('resize', initLayouts)
//     disconnect(route.name)
//     wss.close()
// })

// window事件
onbeforeunload = () => {
    window.removeEventListener('resize', initLayouts)
    disconnect(route.name)
    wss.close()
}

// watcher
const notified = ref<boolean>(false)
const message = computed(() => {
    return _layoutStore.getMode() === LAYOUT_ENUM.default
        ? '双击上方昵称可以进行修改哦~方便大家加入你的队伍'
        : '点击头像进入个人空间，双击昵称可以进行修改哦，方便大家加入你的队伍'
})
watchEffect(() => {
    if (isDefualtUserName(_authStore.getName()) && !notified.value) {
        notified.value = true
        ElNotification.warning({
            title: message.value,
            duration: 0,
            position: 'bottom-right',
            showClose: false,
        })
    }
    if (isNotDefualtUserName(_authStore.getName())) {
        ElNotification.closeAll()
    }
})
</script>

<style lang="scss" scoped>
.selections {
    position: fixed;
    right: 0.75rem;
    top: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.wrapper {
    padding: 1em 2em;
    .wideScreen {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .compactScreen {
        display: flex;
        flex-direction: column-reverse;
        justify-content: center;
        align-items: center;
    }

    .compactOnly {
        margin: 1em 0;
    }
}

@media screen and (max-width: 900px) {
    .center-min-900px {
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>
