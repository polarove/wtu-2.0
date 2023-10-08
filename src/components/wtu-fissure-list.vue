<template>
    <div class="lt-lg:display-none">
        <div class="text-center" :class="{ hidden: !hidden }">
            <span
                class="i-ep:arrow-down"
                cursor-pointer
                hover-color-blue
                @click="display(false)"
            ></span>
            <span
                class="text-size-[0.88em]"
                cursor-pointer
                hover-color-blue
                @click="display(false)"
            >
                展开裂缝列表
            </span>
        </div>
        <div class="list" :class="{ hidden: hidden }">
            <ryu-loading :loading="loading" :rows="1">
                <el-row>
                    <el-col
                        :span="4"
                        v-for="item in fissure_list"
                        class="p-0.4em"
                    >
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
                                    <div>
                                        {{ item.tier }}&nbsp;{{ item.node }}
                                    </div>
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
        <div class="text-center" :class="{ hidden: hidden }">
            <span
                class="i-ep:arrow-up"
                @click="hide(true)"
                cursor-pointer
                hover-color-blue
            ></span>
            <span
                class="text-size-[0.88em]"
                @click="hide(true)"
                cursor-pointer
                hover-color-blue
                >收起裂缝列表</span
            >
        </div>
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
const route = useRoute()
const hidden = ref<boolean>(true)

const firstLoad = ref<boolean>(true)
const hide = (state: boolean) => {
    hidden.value = state
    fetch()
}
const display = (state: boolean) => {
    hidden.value = state
    fetch()
}

enum relic_channel {
    fissure = 'fissure',
    steelpath = 'steelpath',
    empyrean = 'empyrean',
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

const autoReloadInterval = ref<any>()
const update = (id: string) => {
    fissure_list.value = fissure_list.value.splice(
        fissure_list.value.findIndex((fissure: fissure) => fissure.id === id),
        1
    )
    autoReloadInterval.value = setInterval(() => {
        fetch()
    }, 3000)
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
        clearInterval(autoReloadInterval.value)
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
    console.log(_activityStore.getSubscriptions())
}

watchEffect(() => {
    if (fissure_list.value.length) {
        loading.value = false
    }
})

const diff = (s: any[], d: any[]) => {
    return s.filter((item) => !d.map((i) => i.id).includes(item.id))
}
</script>

<style lang="scss" scoped>
.list {
    transition: all 0.2s ease-in-out;
}
.list.hidden {
    display: none;
}
</style>
