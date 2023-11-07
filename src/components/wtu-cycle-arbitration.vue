<template>
    <ryu-loading :loading="isLoading" height="90px" :rows="1">
        <el-card shadow="hover" class="c-p lt-lg:mt-1em">
            <el-countdown
                :format="format.hour"
                :value="utcTimestamp(arbitration.expiry)"
                @finish="refresh()"
            >
                <template #title>
                    <div>
                        仲裁：{{ arbitration.type }}&nbsp;&nbsp;{{
                            arbitration.enemy
                        }}&nbsp;&nbsp;{{ arbitration.node }}
                    </div>
                </template>
                <template #prefix>
                    <span
                        class="i-ep:loading animation_rotate"
                        v-if="refreshing"
                    ></span>
                    <span
                        v-if="arbitration.subscribed"
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
    name: 'arbitration',
})
</script>

<script setup lang="ts">
import { getArbitrationCycle } from '@/api/cycles'
import { utcTimestamp, format } from '@/util/DateUtil'
import { ArbitrationCycle } from '@/composables/cycles'
import { isBlank } from '@util/StrUtil'
import { response } from '@/composables/types'

const props = defineProps({
    heartbeat: {
        type: Number,
        default: 3000,
    },
})
const arbitration = ref<ArbitrationCycle>({
    id: '',
    activation: '',
    expiry: '',
    enemy: '',
    type: '',
    archwing: false,
    sharkwing: false,
    node: '',
    nodeKey: '',
    typeKey: '',
    expired: false,
    subscribed: false,
})
const init = async () => {
    const result = (await getArbitrationCycle()) as response<ArbitrationCycle>
    arbitration.value = result.data
}
init()

const refreshing = ref<boolean>(false)
const refresh = async (): Promise<any> => {
    refreshing.value = true
    const reslut = (await getArbitrationCycle()) as response<ArbitrationCycle>
    if (reslut.data.id === arbitration.value.id) {
        console.log('arbitration cycle not changed, refresh again')
        setTimeout(() => {
            return refresh()
        }, props.heartbeat)
    } else {
        arbitration.value = reslut.data
        refreshing.value = false
        return true
    }
}
const isLoading = computed(() => {
    return isBlank(arbitration.value.id)
})
</script>

<style lang="scss" scoped></style>
