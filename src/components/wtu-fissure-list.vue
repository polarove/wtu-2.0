<template>
    <div
        v-if="_authStore.getServer() === 0"
        class="text-center color-gray text-size-[0.88em]"
    >
        国服暂不支持裂缝订阅，若您有想法，可以向我提供技术支持
    </div>
    <div v-else>
        <div class="options">
            <div>
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
            <span class="option" @click="manage()">管理</span>
        </div>
        <div class="list lt-lg:display-none">
            <ryu-loading :loading="loading" :rows="1">
                <ryu-empty
                    :empty="isEmpty"
                    :tip="state ? '暂无订阅' : '请稍等，正在加载...'"
                >
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
                                    @finish="refresh(item)"
                                >
                                    <template #title>
                                        <div>
                                            {{ item.tier }}&nbsp;{{ item.node }}
                                        </div>
                                    </template>
                                    <template #prefix>
                                        <div
                                            class="transform-translate-y-[-2px]"
                                        >
                                            <span
                                                class="i-ant-design:check-square-outlined c-p color-blue"
                                                v-if="item.subscribed"
                                                @click="
                                                    toggleSubscription(item)
                                                "
                                            ></span>
                                            <span
                                                class="i-ep:loading animation_rotate"
                                                v-if="item.refreshing"
                                            ></span>
                                            <div
                                                class="text-size-[0.8em] c-p inline hover-color-blue select-none"
                                                @click="
                                                    toggleSubscription(item)
                                                "
                                            >
                                                {{ item.missionType }}&nbsp;
                                            </div>
                                        </div>
                                    </template>
                                </el-countdown>
                            </el-card>
                        </el-col>
                    </el-row>
                </ryu-empty>
            </ryu-loading>
        </div>
    </div>
    <el-dialog v-model="dialog.visible">
        <template #header>
            <div class="text-center">订阅管理</div>
        </template>
        <ryu-empty :empty="emptySubscription">
            <el-row>
                <el-col :span="24" v-for="item in subscription" class="subs">
                    <el-card shadow="hover">
                        <div class="flex-between">
                            <div>
                                {{ item.node }}&nbsp;{{ item.missionType }}
                            </div>
                            <el-button
                                @click="removeSubscription(item)"
                                size="small"
                            >
                                <div class="i-ep:close"></div>
                            </el-button>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </ryu-empty>
    </el-dialog>
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
const isEmpty = computed(() => fissure_list.value.length === 0)
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

const dialog = reactive({
    visible: false,
})
const subscription = computed(() =>
    _activityStore.findSubscriptionListByChannel(route.name)
)
const emptySubscription = computed(() => subscription.value.length === 0)
const manage = () => {
    dialog.visible = true
}

const fetch = async () => {
    if (!_authStore.getServer()) {
        fissure_list.value = []
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

watch(
    () => _authStore.getServer(),
    () => {
        fetch()
    },
    {
        immediate: true,
    }
)

const parseFissureList = (
    full_list: fissure[],
    channel: relic_channel,
    isHard: boolean,
    isStorm: boolean,
    callback?: Function
): any => {
    let filterred = full_list.filter(
        (fissure: fissure) =>
            fissure.isHard === isHard &&
            fissure.isStorm === isStorm &&
            fissure.expired === false
    )
    let diffs = diff(filterred, fissure_list.value)
    if (diffs.length === 0) {
        setTimeout(() => {
            return parseFissureList(
                full_list,
                channel,
                isHard,
                isStorm,
                callback
            )
        }, 1000 * 3)
    } else {
        diffs.forEach((item) => {
            if (!fissure_list.value.map((i) => i.id).includes(item.id)) {
                fissure_list.value.unshift(item)
            }
        })
        // 扫描整个新的列表，并根据订阅状态发送通知
        notify(channel)
    }
}

const refresh = (fissure: fissure) => {
    fissure_list.value.map((item: fissure) => {
        if (item.id === fissure.id) {
            item.refreshing = true
        }
    })
    fetch()
}

const notify = (channel: string) => {
    let subscriptionList = _activityStore.findSubscriptionListByChannel(channel)
    fissure_list.value.map((fissure: fissure) => {
        // 这个频道有订阅
        if (subscriptionList.length > 0) {
            // 找出订阅列表
            let subscribed = subscriptionList.find(
                (item) =>
                    item.missionKey === fissure.missionKey &&
                    item.nodeKey === fissure.nodeKey
            )
            // 如果这个裂缝是订阅的，且支持通知，且不是第一次加载，且没有通知过
            fissure.subscribed = requires(subscribed)
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
const removeSubscription = (item: fissure) => {
    _activityStore.removeSubscription(route.name, item.id)
}
const toggleSubscription = (target: fissure) => {
    // 根据裂缝id来订阅指定星球的指定任务类型
    fissure_list.value.map((fissure: fissure) => {
        if (target.id === fissure.id) {
            fissure.subscribed = !fissure.subscribed
        }
    })

    // 更新订阅列表
    _activityStore.toggleSubscription(route.name, target)
}

watchEffect(() => {
    if (fissure_list.value.length || !_authStore.getServer()) {
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
.options {
    display: flex;
    justify-content: space-between;
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

.subs:nth-child(n + 2) {
    margin-top: 1em;
}
</style>
