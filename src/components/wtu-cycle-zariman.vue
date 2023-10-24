<template>
    <ryu-loading :loading="isLoading" height="90px" :rows="1">
        <el-card shadow="hover" class="c-p">
            <el-countdown
                :format="format.hour"
                :value="utcTimestamp(zariman.bountiesEndDate)"
                @finish="refresh()"
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
import { authStore } from '@/store'
const _authStore = authStore()
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
    zariman.value = (await getZarimanCycle(
        _authStore.getServerChar()
    )) as ZarimanCycle
}
init()

const refreshing = ref<boolean>(false)
const refresh = async (): Promise<any> => {
    refreshing.value = true
    const reslut = (await getZarimanCycle(
        _authStore.getServerChar()
    )) as ZarimanCycle
    if (reslut.id === zariman.value.id) {
        console.log('zariman cycle not changed, refresh again')
        setTimeout(() => {
            return refresh()
        }, props.heartbeat)
    } else {
        zariman.value = reslut
        refreshing.value = false
        return true
    }
}

const isLoading = computed(() => {
    return isBlank(zariman.value.id)
})
</script>

<style lang="scss" scoped></style>
