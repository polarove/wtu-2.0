<template>
    <ryu-loading :loading="isLoading" height="90px" :rows="1">
        <el-card shadow="hover" class="c-p">
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
                        class="i-ep:loading animation-rotate"
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
import { getArbitrationCycle } from '@/api/warframestat'
import { utcTimestamp, format } from '@/util/DateUtil'
import { ArbitrationCycle } from '@/composables/cycles'
import { isBlank } from '@util/StrUtil'
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
    arbitration.value = (await getArbitrationCycle()) as ArbitrationCycle
}
init()
const refreshing = ref<boolean>(false)
const refresh = async (): Promise<any> => {
    refreshing.value = true
    const reslut = (await getArbitrationCycle()) as ArbitrationCycle
    if (reslut.id === arbitration.value.id) {
        setTimeout(() => {
            return refresh()
        }, props.heartbeat)
    } else {
        arbitration.value = reslut
        refreshing.value = false
        return true
    }
}
const isLoading = computed(() => {
    return isBlank(arbitration.value.id)
})
</script>

<style lang="scss" scoped></style>
