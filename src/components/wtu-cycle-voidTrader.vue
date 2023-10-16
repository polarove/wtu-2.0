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
                @finish="refresh()"
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
import { getVoidTraderCycle } from '@/api/warframestat'
import { utcTimestamp, format } from '@/util/DateUtil'
import { VoidTraderCycle } from '@/composables/cycles'
import { isBlank } from '@util/StrUtil'

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
    voidTrader.value = (await getVoidTraderCycle()) as VoidTraderCycle
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
const refresh = async (): Promise<any> => {
    refreshing.value = true
    const reslut = (await getVoidTraderCycle()) as VoidTraderCycle
    if (reslut.id === voidTrader.value.id) {
        console.log('voidTrader cycle not changed, refresh again')
        setTimeout(() => {
            return refresh()
        }, 1000 * props.heartbeat)
    } else {
        voidTrader.value = reslut
        refreshing.value = false
        return true
    }
}
</script>

<style lang="scss" scoped></style>
