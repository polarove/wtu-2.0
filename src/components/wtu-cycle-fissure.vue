<template>
    <div
        v-if="_authStore.getServer() === 0"
        class="text-center color-gray text-size-[0.88em] lt-md:mt-1em"
    >
        国服暂不支持裂缝订阅，若您有想法，可以向我提供技术支持
    </div>
    <div v-else class="lt-md:mt-1em">
        <div class="options">
            <div>
                <span
                    class="option"
                    :class="{ active: !state }"
                    @click="toggleList(false)"
                >
                    全部
                </span>
                <span
                    class="option"
                    :class="{ active: state }"
                    @click="toggleList(true)"
                >
                    订阅
                </span>
                <span
                    class="option"
                    :class="{ active: dialog.visible }"
                    @click="manage()"
                    >管理</span
                >
            </div>
            <div
                :class="shrink ? 'i-ep:arrow-down-bold' : 'i-ep:minus'"
                class="c-p hover-color-blue ml-0.5em"
                @click="toggleShrink()"
            ></div>
        </div>
        <ryu-loading :loading="loading" :rows="1">
            <ryu-empty
                :empty="isEmpty"
                :tip="state ? '暂无订阅' : '请稍等，正在加载...'"
            >
                <el-row :style="{ display: shrink && 'none' }">
                    <el-col
                        :xs="12"
                        :sm="8"
                        :md="6"
                        :xl="4"
                        v-for="item in fissure_list"
                        class="p-0.4em"
                    >
                        <el-card
                            shadow="hover"
                            class="animate__animated"
                            :class="{
                                animate__fadeIn: !item.expired,
                                animate__fadeOut: item.expired || shrink,
                            }"
                        >
                            <el-countdown
                                :format="format.hour"
                                :value="utcTimestamp(item.expiry)"
                                @finish="refresh(item.id)"
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
                                        <span
                                            class="text-size-[0.8em] c-p inline hover-color-blue select-none"
                                            @click="toggleSubscription(item)"
                                        >
                                            {{ item.missionType }}&nbsp;
                                        </span>
                                    </div>
                                </template>
                            </el-countdown>
                        </el-card>
                    </el-col>
                </el-row>
                <el-divider v-if="shrink"></el-divider>
            </ryu-empty>
        </ryu-loading>
    </div>
    <el-dialog v-model="dialog.visible">
        <template #header>
            <div>
                <span>订阅管理</span>
                <span
                    class="i-ep:upload mr-0.5em ml-0.5em c-p hover-color-blue"
                    @click="uploadSubs()"
                ></span>
                <span
                    class="i-ep:download c-p hover-color-blue"
                    @click="downloadSubs()"
                ></span>
            </div>
        </template>
        <ryu-empty :empty="emptySubscription">
            <el-row>
                <el-col :span="24" v-for="item in subscription" class="subs">
                    <el-card shadow="hover">
                        <div class="flex-between">
                            <div>
                                {{
                                    item.isHard ? '钢铁' : '普通'
                                }}&nbsp;-&nbsp;{{ item.tier }}&nbsp;
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
        <div class="mt-1em" v-if="onDecision">
            <el-button @click="saveUpdates">保存</el-button>
            <el-button @click="canclepdate">取消</el-button>
        </div>
    </el-dialog>
</template>

<script setup lang="ts">
import type { fissure } from '@/composables/cycles'
import { getFissureList } from '@api/cycles/index'
import {
    uploadFissureSubscriptions,
    downloadFissureSubscriptions,
} from '@api/account/index'
import { utcTimestamp, format } from '@/util/DateUtil'
import { activityStore, authStore } from '@/store'
import { requires } from '@/util/ObjectUtil'
import { useWebNotification, UseWebNotificationOptions } from '@vueuse/core'
import { response } from '@/composables/types'
import { RouteRecordName } from 'vue-router'
import { fissureSubs } from '@/composables/cycles'

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
const shrink = ref<boolean>(false)

const toggleShrink = () => {
    shrink.value = !shrink.value
}

const firstLoad = ref<boolean>(true)

enum relic_channel {
    fissure = 'fissure',
    steelpath = 'steelpath',
    empyrean = 'empyrean',
}

const currentTimestamp = computed(() => {
    return new Date().getTime()
})

const toggleList = async (stat: boolean) => {
    state.value = stat
    initialize()
}

const dialog = reactive({
    visible: false,
})
const subscription = computed(() =>
    _activityStore
        .findSubscriptionListByChannel(route.name)
        .sort((a, b) => {
            return b.tierNum - a.tierNum
        })
        .sort((a) => {
            return a.isHard ? 1 : -1
        })
)
const emptySubscription = computed(() => subscription.value.length === 0)
const manage = () => {
    dialog.visible = true
}

const initialize = async () => {
    if (!_authStore.getServer()) {
        fissure_list.value = []
        return
    } else {
        const result = (await getFissureList()) as response<fissure[]>
        let parsed = parseFissures(result.data) as fissure[]
        fissure_list.value = checkSubscription(parsed)
        if (state.value) {
            fissure_list.value = filterSubscription(parsed)
        }
        sort(fissure_list.value)
        firstLoad.value = false
    }
}
initialize()

const parseFissures = (result: fissure[]): fissure[] => {
    let temp: fissure[] = []
    switch (route.name) {
        case relic_channel.fissure:
            temp = result.filter(
                (fissure: fissure) =>
                    fissure.isHard === _authStore.getDifficulty() &&
                    fissure.isStorm === false &&
                    fissure.expired === false &&
                    utcTimestamp(fissure.expiry) > currentTimestamp.value
            )
            break
        case relic_channel.empyrean:
            temp = result.filter(
                (fissure: fissure) =>
                    fissure.isStorm === true &&
                    fissure.expired === false &&
                    utcTimestamp(fissure.expiry) > currentTimestamp.value
            )
            break
    }
    return temp
}

const checkSubscription = (parsed: fissure[]): fissure[] => {
    return parsed.map((fissure: fissure) => {
        fissure.subscribed = requires(
            _activityStore
                .findSubscriptionListByChannel(route.name)
                .find(
                    (item) =>
                        item.missionKey === fissure.missionKey &&
                        item.nodeKey === fissure.nodeKey
                )
        )
        return fissure
    })
}

const filterSubscription = (parsed: fissure[]): fissure[] => {
    return parsed.filter((fissure: fissure) => fissure.subscribed)
}

const sort = (list: fissure[]) => {
    list.sort((a: fissure, b: fissure) => {
        return a.tierNum - b.tierNum
    })
}

watch(
    () => _authStore.getServer(),
    () => {
        initialize()
    }
)

watch(
    () => _authStore.getDifficulty(),
    () => {
        initialize()
    }
)

// 同步裂缝订阅列表
const uploadSubs = async () => {
    const data = _activityStore.getFissureSubs()
    const result = (await uploadFissureSubscriptions(data)) as response<string>
    if (result.success) {
        ElMessage.success('订阅记录已上传')
    } else {
        ElMessage.error('订阅记录上传失败')
    }
}

const onDecision = ref<boolean>(false)
const currentSubs = ref<fissureSubs | null>()
const downloadSubs = async () => {
    onDecision.value = true
    const uuid: string = _authStore.getUUID()
    currentSubs.value = _activityStore.getFissureSubs()
    const result = (await downloadFissureSubscriptions(
        uuid
    )) as response<fissureSubs>
    _activityStore.setFissureSubs(result.data)
}

const saveUpdates = () => {
    onDecision.value = false
    currentSubs.value = null
    ElMessage.success('订阅记录已更新')
}

const canclepdate = () => {
    onDecision.value = false
    _activityStore.setFissureSubs(currentSubs.value!)
}

const refresh = (id: string) => {
    let idx = fissure_list.value.findIndex((item) => item.id === id)
    if (idx === -1) {
        return
    } else {
        fissure_list.value.splice(idx, 1)
        _activityStore.removeNotifyHistory(id)
        update()
    }
}

const update = async () => {
    const result = (await getFissureList()) as response<fissure[]>
    let parsed = parseFissures(result.data) as fissure[]
    let diffs = diff(parsed, fissure_list.value)
    if (diffs.length === 0) {
        setTimeout(() => {
            return update()
        }, 1000 * 3)
    } else {
        if (!state.value) {
            diffs.forEach((item) => {
                if (!fissure_list.value.map((i) => i.id).includes(item.id)) {
                    fissure_list.value.unshift(item)
                }
            })
        }
        // 扫描整个新的列表，并根据订阅状态发送通知
        notify(route.name, diffs)
    }
}

const notify = (
    channel: RouteRecordName | null | undefined,
    diffs: fissure[]
) => {
    let subscriptionList = _activityStore.findSubscriptionListByChannel(channel)
    if (subscriptionList.length > 0) {
        diffs.map((fissure: fissure) => {
            // 找出订阅列表
            let subscribed = subscriptionList.find(
                (item) =>
                    item.missionKey === fissure.missionKey &&
                    item.nodeKey === fissure.nodeKey
            )
            // 如果这个裂缝是订阅的，且支持通知，且不是第一次加载，且没有通知过
            fissure.subscribed = requires(subscribed)
            if (state.value) {
                fissure_list.value.unshift(fissure)
            }
            const conditions =
                requires(subscribed) &&
                fissure.subscribed &&
                isSupported.value &&
                !firstLoad.value &&
                !_activityStore.hasNotified(fissure.id)
            if (conditions) {
                notification.title =
                    fissure.tier + fissure.missionType + fissure.node
                notification.body = route.meta.forehead + ' 订阅的虚空裂缝'
                _activityStore.addNotifyHistory(fissure.id)
                show()
            }
        })
    }
}

const removeSubscription = (item: fissure) => {
    _activityStore.removeSubscription(route.name, item.id)
    item.subscribed = false
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

const diff = (s: any[], d: any[]): fissure[] => {
    return s.filter((item) => !d.map((i) => i.id).includes(item.id))
}
</script>

<style lang="scss" scoped>
.options {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    .option:nth-child(n + 2) {
        margin-left: 0.5em;
    }
}

.subs:nth-child(n + 2) {
    margin-top: 1em;
}

:deep(.el-statistic__content) {
    display: flex;
    @media screen and (max-width: 1420px) {
        font-size: 0.88em;
    }
}
</style>
