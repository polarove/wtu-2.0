<template>
    <ryu-loading :loading="isLoading" height="90px" :rows="1">
        <el-card shadow="hover" class="c-p">
            <el-countdown
                :format="format.hour"
                :value="utcTimestamp(cambion.expiry)"
                @finish="refresh()"
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
import { getCambionCycle } from '@/api/warframestat'
import { utcTimestamp, format } from '@/util/DateUtil'
import { CambionCycle } from '@/composables/cycles'
import { isBlank } from '@util/StrUtil'
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
    cambion.value = (await getCambionCycle()) as CambionCycle
    return true
}
init()
const refreshing = ref<boolean>(false)
const refresh = async (): Promise<any> => {
    refreshing.value = true
    const reslut = (await getCambionCycle()) as CambionCycle
    if (reslut.id === cambion.value.id) {
        console.log('cambion cycle not changed, refresh again')
        setTimeout(() => {
            return refresh()
        }, props.heartbeat)
    } else {
        cambion.value = reslut
        refreshing.value = false
        return true
    }
}
const isLoading = computed(() => {
    return isBlank(cambion.value.id)
})
</script>

<style lang="scss" scoped></style>
