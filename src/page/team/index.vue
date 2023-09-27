<template>
    <div>
        <WtuHeader />
        <div class="selections">
            <WtuDifficulty />
        </div>
        <div class="wrapper">
            <div :class="{ wideScreen: wideMode, compactScreen: !wideMode }">
                <div>
                    <WtuActivity
                        :clients="clients"
                        class="mb-0.75em mt-0.5em"
                    />
                    <WtuTeamSet class="center-min-900px" />
                </div>
                <WtuEntries
                    :class="{ compactOnly: !wideMode }"
                    :scale="wideMode ? 1 : 0.8"
                    :clients="clients"
                />
            </div>
            <div class="w-70vw h-100% ma-auto"><RouterView /></div>
        </div>
        <WtuFooter />
    </div>
</template>

<script setup lang="ts">
import type { TeamList, TeamListParams, TeamPage } from '@/composables/team'
import { teamStore, authStore } from '@/store'
import { GetTeamList } from '@api/team'
import type { response } from '@/composables/types'
import { defaults } from '@/composables/defaults'
import { ElNotification } from 'element-plus'
import { websocket } from '@util/WebsocketUtil'
import type { RouteRecordName } from 'vue-router'

enum WSS_ACTION {
    CONNECT = 1,
    DISCONNECT = 2,
    MESSAGE = 3,
}

const _teamStore = teamStore()
const _authStore = authStore()
const route = useRoute()
const wideMode = ref(true)
const TeamParams = reactive<TeamListParams>({
    page: 1,
    size: 5,
    server: _authStore.getServer(),
    channel: null,
    uuid: null,
})

const initLayouts = () => {
    if (document.body.clientWidth < 900) {
        wideMode.value = false
    } else {
        wideMode.value = true
    }
}
window.addEventListener('resize', () => {
    initLayouts()
})

const wss = new websocket(_authStore.getServer())

const clients = ref<number>(0)

interface WssConnectionResponse {
    total: number
    clients: number
}
const ChannelParam = reactive({
    route: route.name,
    uuid: _authStore.getUUID(),
    server: _authStore.getServer(),
    action: 1,
})

wss.on_message((data: WssConnectionResponse) => {
    console.log(data)
})

const createConnection = () => {
    wss.on_open(() => {
        console.log('连接成功')
        joinChannel()
    })
}

const joinChannel = (to?: RouteRecordName | null | undefined) => {
    ChannelParam.action = WSS_ACTION.CONNECT
    to ? (ChannelParam.route = to) : (ChannelParam.route = route.name)
    wss.send(ChannelParam, () => {
        wss.on_message((data: WssConnectionResponse) => {
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
        wss.on_message((data: WssConnectionResponse) => {
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

wss.on_message((data: WssConnectionResponse) => {
    clients.value = data.clients
    console.log(data)
})

const autoRefresh = (interval: number) => {
    setInterval(() => {
        GetTeamList(_teamStore.getParam()).then(
            (res: response<TeamPage> | any) => {
                _teamStore.setTeam(res.data.records as Array<TeamList>)
            }
        )
        console.log('重新获取队伍列表中...')
    }, interval)
}

onMounted(() => {
    initLayouts()
    TeamParams.channel = route.name
    _teamStore.setParam(TeamParams)
    _teamStore.initTeamList()
    createConnection()
    autoRefresh(1000 * 60 * 10)
})

onBeforeRouteUpdate((to, from) => {
    TeamParams.channel = to.name
    _teamStore.setParam(TeamParams)
    _teamStore.initTeamList()
    switchChannel(from.name, to.name)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', () => {
        initLayouts()
    })
    disconnect(route.name)
    wss.close()
})

const e = new defaults()
if (e.isDefualtUserName(_authStore.getName())) {
    ElNotification({
        title: '提示',
        message: '左键双击 — 头像的右边的名字可更改用户名',
        type: 'info',
        duration: 10000,
        offset: 70,
        position: 'top-right',
    })
}
</script>

<style lang="scss" scoped>
.selections {
    position: fixed;
    right: 0.75rem;
    top: 50%;
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
