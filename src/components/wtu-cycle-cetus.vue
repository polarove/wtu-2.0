<template>
    <ryu-loading :loading="isLoading" height="90px" :rows="1">
        <el-card shadow="hover" class="c-p">
            <el-countdown
                :format="format.hour"
                :value="utcTimestamp(cetus.expiry)"
                @finish="refresh()"
            >
                <template #title>
                    <div>夜灵平原：{{ cetus.isDay ? '白天' : '夜晚' }}</div>
                </template>
                <template #prefix>
                    <span
                        class="i-ep:loading animation_rotate"
                        v-if="refreshing"
                    ></span>
                    <span
                        v-if="cetus.subscribed"
                        class="i-ant-design:check-square-outlined c-p color-blue"
                    ></span>
                </template>
            </el-countdown>
        </el-card>
    </ryu-loading>
</template>

<script lang="ts">
// override the name property
export default defineComponent({
    name: 'cetus',
})
</script>

<script setup lang="ts">
import { getCetusCycle } from '@/api/cycles'
import { utcTimestamp, format } from '@/util/DateUtil'
import { CetusCycle } from '@/composables/cycles'
import { isBlank } from '@/util/StrUtil'
import { response } from '@/composables/types'

const props = defineProps({
    heartbeat: {
        type: Number,
        default: 3000,
    },
})
const cetus = ref<CetusCycle>({
    id: '',
    expiry: '',
    activation: '',
    isDay: false,
    state: '',
    timeLeft: '',
    isCetus: false,
    shortString: '',
    subscribed: false,
})
const init = async () => {
    const result = (await getCetusCycle()) as response<CetusCycle>
    cetus.value = result.data
}
init()

const refreshing = ref<boolean>(false)
const refresh = async (): Promise<any> => {
    refreshing.value = true
    const reslut = (await getCetusCycle()) as response<CetusCycle>
    if (reslut.data.id === cetus.value.id) {
        console.log('cetus cycle not changed, refresh again')
        setTimeout(() => {
            return refresh()
        }, props.heartbeat)
    } else {
        cetus.value = reslut.data
        refreshing.value = false
        return true
    }
}

const isLoading = computed(() => {
    return isBlank(cetus.value.id)
})
</script>

<style lang="scss" scoped></style>
