<template>
    <ryu-loading :loading="isLoading" height="90px" :rows="1">
        <el-card shadow="hover" class="c-p">
            <el-countdown
                :format="format.hour"
                :value="utcTimestamp(cambion.expiry)"
                @finish="refresh(cambion.id)"
            >
                <template #title>
                    <div>魔胎之境：{{ cambion.state }}</div>
                </template>
                <template #prefix>
                    <span
                        class="i-ep:loading animation_rotate inline-block"
                        v-if="refreshing"
                    ></span>
                    <span
                        v-if="cambion.subscribed"
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
    name: 'cambion',
})
</script>

<script setup lang="ts">
import { getCambionCycle } from '@/api/cycles'
import { utcTimestamp, format } from '@/util/DateUtil'
import { CambionCycle } from '@/composables/cycles'
import { isBlank } from '@util/StrUtil'
import { response } from '@/composables/types'

const props = defineProps({
    heartbeat: {
        type: Number,
        default: 3000,
    },
})
const cambion = ref<CambionCycle>({
    id: '',
    activation: '',
    expiry: '',
    timeLeft: '',
    state: '',
    active: '',
    subscribed: false,
})
const init = async () => {
    const result = (await getCambionCycle()) as response<CambionCycle>
    cambion.value = result.data
}
init()
const refreshing = ref<boolean>(false)
const refresh = async (id: string): Promise<any> => {
    refreshing.value = true
    const reslut = (await getCambionCycle()) as response<CambionCycle>
    if (reslut.data.id === id) {
        console.log('cambion cycle not changed, refresh again')
        setTimeout(() => {
            return refresh(id)
        }, props.heartbeat)
    } else {
        cambion.value = reslut.data
        refreshing.value = false
        return true
    }
}
const isLoading = computed(() => {
    return isBlank(cambion.value.id)
})
</script>

<style lang="scss" scoped></style>
