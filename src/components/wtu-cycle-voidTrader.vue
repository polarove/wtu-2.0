<template>
    <ryu-loading :loading="isLoading" height="90px" :rows="1">
        <el-card shadow="hover" class="c-p">
            <el-countdown
                :format="format.day"
                :value="
                    voidTrader.active
                        ? utcTimestamp(voidTrader.expiry)
                        : utcTimestamp(voidTrader.activation)
                "
                @finish="refresh(voidTrader.id)"
            >
                <template #title>
                    <div>
                        虚空商人
                        {{
                            voidTrader.active
                                ? `已经到达${location(voidTrader.location)}`
                                : `正在前往${location(voidTrader.location)}`
                        }}
                    </div>
                </template>
                <template #prefix>
                    <span
                        class="i-ep:loading animation_rotate"
                        v-if="refreshing"
                    ></span>
                    <span
                        v-if="voidTrader.subscribed"
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
    name: 'voidTrader',
})
</script>

<script setup lang="ts">
import { getVoidTraderCycle } from '@/api/cycles'
import { utcTimestamp, format } from '@/util/DateUtil'
import { VoidTraderCycle } from '@/composables/cycles'
import { isBlank } from '@util/StrUtil'
import { response } from '@/composables/types'

const props = defineProps({
    heartbeat: {
        type: Number,
        default: 3,
    },
})

const voidTrader = ref<VoidTraderCycle>({
    id: '',
    activation: '',
    startString: '',
    expiry: '',
    active: false,
    character: '',
    location: '',
    inventory: [],
    psId: '',
    endString: '',
    initialStart: '',
    schedule: [],
    subscribed: false,
})

const init = async () => {
    const result = (await getVoidTraderCycle()) as response<VoidTraderCycle>
    voidTrader.value = result.data
}
init()
const isLoading = computed(() => {
    return isBlank(voidTrader.value.id)
})
const location = (location: string) => {
    let regex = /\((.+?)\)/g
    location = location.match(regex)![0]
    return location.substring(1, location.length - 1)
}

const refreshing = ref<boolean>(false)
const refresh = async (id: string): Promise<any> => {
    refreshing.value = true
    const reslut = (await getVoidTraderCycle()) as response<VoidTraderCycle>
    if (reslut.data.id === id) {
        console.log('voidTrader cycle not changed, refresh again')
        setTimeout(() => {
            return refresh(id)
        }, 1000 * props.heartbeat)
    } else {
        voidTrader.value = reslut.data
        refreshing.value = false
        return true
    }
}
</script>

<style lang="scss" scoped></style>
