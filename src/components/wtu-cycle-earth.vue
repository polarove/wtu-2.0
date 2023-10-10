<template>
    <ryu-loading :loading="isLoading" height="90px" :rows="1">
        <el-card shadow="hover" class="c-p">
            <el-countdown
                :format="format.hour"
                :value="utcTimestamp(earth.expiry)"
                @finish="refresh()"
            >
                <template #title>
                    <div>地球：{{ earth.isDay ? '白天' : '夜晚' }}</div>
                </template>
                <template #prefix>
                    <span
                        class="i-ep:loading animation_rotate"
                        v-if="refreshing"
                    ></span>
                    <span
                        v-if="earth.subscribed"
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
    name: 'earth',
})
</script>

<script setup lang="ts">
import { getEarthCycle } from '@/api/warframestat'
import { utcTimestamp, format } from '@/util/DateUtil'
import { EarthCycle } from '@/composables/cycles'
import { isBlank } from '@util/StrUtil'
const props = defineProps({
    heartbeat: {
        type: Number,
        default: 3,
    },
})
const earth = ref<EarthCycle>({
    id: '',
    expiry: '',
    activation: '',
    isDay: false,
    state: '',
    timeLeft: '',
    subscribed: false,
})

const init = async () => {
    earth.value = (await getEarthCycle()) as EarthCycle
}
init()

const refreshing = ref<boolean>(false)
const refresh = async (): Promise<any> => {
    refreshing.value = true
    const reslut = (await getEarthCycle()) as EarthCycle
    if (reslut.id === earth.value.id) {
        console.log('earth cycle not changed, refresh again')
        setTimeout(() => {
            return refresh()
        }, props.heartbeat)
    } else {
        earth.value = reslut
        refreshing.value = false
        return true
    }
}

const isLoading = computed(() => {
    return isBlank(earth.value.id)
})
</script>

<style lang="scss" scoped></style>
