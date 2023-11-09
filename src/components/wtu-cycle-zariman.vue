<template>
    <ryu-loading :loading="isLoading" height="90px" :rows="1">
        <el-card shadow="hover" class="c-p">
            <el-countdown
                :format="format.hour"
                :value="utcTimestamp(zariman.bountiesEndDate)"
                @finish="refresh(zariman.id)"
            >
                <template #title>
                    <div>扎里曼号：赏金轮换</div>
                </template>
                <template #prefix>
                    <span
                        class="i-ep:loading animation_rotate"
                        v-if="refreshing"
                    ></span>
                    <span
                        v-if="zariman.subscribed"
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
    name: 'zariman',
})
</script>

<script setup lang="ts">
import { getZarimanCycle } from '@/api/cycles'
import { utcTimestamp, format } from '@/util/DateUtil'
import { ZarimanCycle } from '@/composables/cycles'
import { isBlank } from '@util/StrUtil'

import { response } from '@/composables/types'

const props = defineProps({
    heartbeat: {
        type: Number,
        default: 3000,
    },
})
const zariman = ref<ZarimanCycle>({
    id: '',
    bountiesEndDate: '',
    expiry: '',
    activation: '',
    isCorpus: false,
    state: '',
    timeLeft: '',
    shortString: '',
    subscribed: false,
})

const init = async () => {
    const result = (await getZarimanCycle()) as response<ZarimanCycle>
    zariman.value = result.data
}
init()

const refreshing = ref<boolean>(false)
const refresh = async (id: string): Promise<any> => {
    refreshing.value = true
    const reslut = (await getZarimanCycle()) as response<ZarimanCycle>
    if (reslut.data.id === id) {
        console.log('zariman cycle not changed, refresh again')
        setTimeout(() => {
            return refresh(id)
        }, props.heartbeat)
    } else {
        zariman.value = reslut.data
        refreshing.value = false
        return true
    }
}

const isLoading = computed(() => {
    return isBlank(zariman.value.id)
})
</script>

<style lang="scss" scoped></style>
