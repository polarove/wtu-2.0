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
                            @finish="update(item)"
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
import { activityStore, authStore } from '@/store'
import { requires } from '@/util/ObjectUtil'
import { useWebNotification, UseWebNotificationOptions } from '@vueuse/core'
const _authStore = authStore()
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
    if (!_authStore.getServer()) {
        return
    }
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

const update = (fissure: fissure) => {
    fissure_list.value = fissure_list.value.filter((target: fissure) => {
        return target.id !== fissure.id
    })
}

const parseFissureList = (
    full_list: fissure[],
    channel: relic_channel,
    isHard: boolean,
    isStorm: boolean
) => {
    const f = full_list.filter(
        (fissure: fissure) =>
            fissure.isHard === isHard &&
            fissure.isStorm === isStorm &&
            fissure.expired === false
    )
    let diffs = diff(f, fissure_list.value)
    if (diffs && diffs.length === 0) {
        return
    }
    diffs.forEach((item) => {
        if (!fissure_list.value.map((i) => i.id).includes(item.id)) {
            fissure_list.value.unshift(item)
        }
    })

    // 扫描整个新的列表，并根据订阅状态发送通知
    notify(channel)
}

const notify = (channel: string) => {
    let subscriptionList = _activityStore.findSubscriptionListByChannel(channel)
    fissure_list.value.map((fissure: fissure) => {
        // 这个频道有订阅
        if (subscriptionList.length > 0) {
            // 找出订阅列表
            let subscribed = subscriptionList.find(
                (item) => item.id === fissure.id
            )
            fissure.subscribed = requires(subscribed) ? true : false
            if (
                fissure.subscribed &&
                isSupported.value &&
                !firstLoad.value &&
                !_activityStore.hasNotified(fissure.id)
            ) {
                notification.title =
                    fissure.tier + fissure.missionType + fissure.node
                notification.body =
                    route.meta.forehead + ' 有新的订阅的虚空裂缝模式'
                show()
            }
        }
        return fissure
    })
}

const toggleSubscription = (target: fissure) => {
    let id = target.id
    let missionKey = target.missionKey
    let channel = route.name
    let nodeKey = splitNodeKey(target.nodeKey)
    // 根据裂缝id来订阅指定星球的指定任务类型
    fissure_list.value.map((fissure: fissure) => {
        if (target.id === fissure.id) {
            fissure.subscribed = !fissure.subscribed
        }
    })
    // 更新订阅列表
    _activityStore.toggleSubscription(channel, id, nodeKey, missionKey)
}

watchEffect(() => {
    if (fissure_list.value.length) {
        loading.value = false
    }
})

const diff = (s: any[], d: any[]) => {
    return s.filter((item) => !d.map((i) => i.id).includes(item.id))
}

const splitNodeKey = (nodeKey: string) => {
    return nodeKey.split('(')[0]
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
