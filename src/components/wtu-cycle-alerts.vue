<template>
    <ryu-loading :loading="isLoading" height="90px" :rows="1">
        <el-row :gutter="24">
            <el-col
                :xs="24"
                :md="Math.max(minSpan, span)"
                v-for="(alert, index) in alerts"
            >
                <el-card shadow="hover" class="c-p" :index="index">
                    <el-countdown
                        :format="format.day"
                        :value="utcTimestamp(alert.expiry)"
                        @finish="refresh()"
                    >
                        <template #title>
                            <div>
                                警报：{{ alert.mission.type }}&nbsp;&nbsp;{{
                                    alert.mission.node
                                }}&nbsp;&nbsp;
                            </div>
                        </template>
                        <template #prefix>
                            <span
                                class="i-ep:loading animation_rotate"
                                v-if="refreshing"
                            ></span>
                            <span
                                v-if="alert.subscribed"
                                class="i-ant-design:check-square-outlined c-p color-blue"
                            ></span>
                        </template>
                    </el-countdown>
                </el-card>
            </el-col>
        </el-row>
    </ryu-loading>
</template>

<script lang="ts">
// override the name property
export default defineComponent({
    name: 'alerts',
})
</script>

<script setup lang="ts">
import { getAlerts } from '@/api/cycles'
import { utcTimestamp, format } from '@/util/DateUtil'
import { AlertsCycle } from '@/composables/cycles'
import { authStore } from '@/store'
import { response } from '@/composables/types'
const _authStore = authStore()
const isLoading = ref<boolean>(false)
const alerts = ref<AlertsCycle[]>([])
const init = async () => {
    isLoading.value = true
    const result = (await getAlerts(_authStore.getServerChar())) as response<
        AlertsCycle[]
    >
    console.log(result)
    alerts.value = result.data
    isLoading.value = false
}
init()
const refreshing = ref<boolean>(false)
const refresh = async (): Promise<any> => {
    refreshing.value = true
    await init()
    refreshing.value = false
}

const minSpan = 4
const span = computed(() => {
    return 24 / alerts.value.length
})
</script>

<style lang="scss" scoped></style>
