<template>
    <div class="options">
        <span
            class="option"
            :class="{ active: !state }"
            @click="toggleList(false)"
            >全部</span
        >

        <span
            class="option"
            :class="{ active: state }"
            @click="toggleList(true)"
            >订阅</span
        >
    </div>
    <div class="list lt-lg:display-none">
        <ryu-loading :loading="loading" :rows="1">
            <el-row>
                <el-col :span="4" v-for="item in fissure_list" class="p-0.4em">
                    <el-card
                        shadow="hover"
                        class="animate__animated"
                        :class="{
                            animate__fadeIn: !item.expired,
                            animate__fadeOut: item.expired,
                        }"
                    >
                        <el-countdown
                            :format="format.hour"
                            :value="utcTimestamp(item.expiry)"
                            @finish="update(item.id)"
                        >
                            <template #title>
                                <div>{{ item.tier }}&nbsp;{{ item.node }}</div>
                            </template>
                            <template #prefix>
                                <div class="transform-translate-y-[-2px]">
                                    <span
                                        class="i-ant-design:check-square-outlined c-p color-blue"
                                        v-if="item.subscribed"
                                        @click="toggleSubscription(item)"
                                    ></span>
                                    <div
                                        class="text-size-[0.8em] c-p inline hover-color-blue select-none"
                                        @click="toggleSubscription(item)"
                                    >
                                        {{ item.missionType }}&nbsp;
                                    </div>
                                </div>
                            </template>
                        </el-countdown>
                    </el-card>
                </el-col>
            </el-row>
        </ryu-loading>
    </div>
</template>

<script setup lang="ts">
import type { fissure } from '@/composables/fissure'
import { getFissureList } from '@api/warframestat/index'
import { utcTimestamp, format } from '@/util/DateUtil'
import { activityStore } from '@/store'
import { requires } from '@/util/ObjectUtil'
import { useWebNotification, UseWebNotificationOptions } from '@vueuse/core'

const notification: UseWebNotificationOptions = {
    title: '',
    body: '',
    dir: 'auto',
    lang: 'zh',
    renotify: false,
}

const { isSupported, show } = useWebNotification(notification)

const _activityStore = activityStore()
const fissure_list = ref<fissure[]>([])
const loading = ref<boolean>(true)
const state = ref<boolean>(false)
const route = useRoute()

const firstLoad = ref<boolean>(true)

enum relic_channel {
    fissure = 'fissure',
    steelpath = 'steelpath',
    empyrean = 'empyrean',
}

const backup = ref<fissure[]>([])
const toggleList = (stat: boolean) => {
    if (stat === state.value) {
        return
    }
    state.value = stat

    if (stat) {
        backup.value = fissure_list.value
        fissure_list.value = fissure_list.value.filter((fissure: fissure) => {
            return fissure.subscribed
        })
    } else {
        fissure_list.value = backup.value
    }
}

const fetch = async () => {
    const full_list = (await getFissureList()) as fissure[]
    switch (route.name) {
        case relic_channel.fissure:
            parseFissureList(full_list, relic_channel.fissure, false, false)
            break
        case relic_channel.steelpath:
            parseFissureList(full_list, relic_channel.steelpath, true, false)
            break
        case relic_channel.empyrean:
            parseFissureList(full_list, relic_channel.empyrean, false, true)
            break
    }
    firstLoad.value = false
}
fetch()

const update = (id: string) => {
    fissure_list.value = fissure_list.value.splice(
        fissure_list.value.findIndex((fissure: fissure) => fissure.id === id),
        1
    )
}

const parseFissureList = (
    full_list: fissure[],
    channel: relic_channel,
    isHard: boolean,
    isStorm: boolean
) => {
    let current_fissure_sub =
        _activityStore.findChannelSubscriptionByChannel(channel)
    let diffs = diff(full_list, fissure_list.value)
    if (diffs && diffs.length === 0) {
        return
    }
    fissure_list.value = diffs
        .filter(
            (fissure: fissure) =>
                fissure.isHard === isHard &&
                fissure.isStorm === isStorm &&
                fissure.expired === false
        )
        .map((fissure: fissure) => {
            if (requires(current_fissure_sub)) {
                let subs = current_fissure_sub.missionKey.includes(
                    fissure.missionKey
                )
                fissure.subscribed = subs
                if (
                    subs &&
                    isSupported &&
                    !firstLoad.value &&
                    !_activityStore.hasNotified(fissure.id)
                ) {
                    notification.title =
                        fissure.tier + fissure.missionType + fissure.node
                    notification.body =
                        route.meta.forehead + ' 有新的订阅的虚空裂缝模式'
                    show()
                    _activityStore.addNotifyHistory(fissure.id)
                }
            }
            return fissure
        })
}

const toggleSubscription = (fissure: fissure) => {
    let missionKey = fissure.missionKey
    let channel = route.name
    fissure_list.value.map((fissure: fissure) => {
        if (fissure.missionKey === missionKey) {
            fissure.subscribed = !fissure.subscribed
        }
    })
    _activityStore.toggleSubscription(channel, missionKey)
}

watchEffect(() => {
    if (fissure_list.value.length) {
        loading.value = false
    }
})

const diff = (s: any[], d: any[]) => {
    return s.filter((item) => !d.map((i) => i.id).includes(item.id))
}

let sd = setInterval(() => {
    fetch()
}, 1000 * 60)

onbeforeunload = () => {
    clearInterval(sd)
}
</script>

<style lang="scss" scoped>
.list {
    transition: all 0.2s ease-in-out;
}
.options {
    .option {
        user-select: none;
        font-size: 0.88em;
        cursor: pointer;
        &:hover {
            color: var(--el-color-primary);
        }
        color: var(--el-text-color-secondary);
    }
    .option.active {
        color: var(--el-color-primary);
    }
    .option:nth-child(1) {
        margin-right: 1em;
    }
}
</style>
