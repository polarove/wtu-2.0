<template>
    <ryu-loading :loading="isLoading" height="90px" :rows="1">
        <el-card shadow="hover" class="c-p">
            <el-countdown
                :format="format.hour"
                :value="utcTimestamp(vallis.expiry)"
                @finish="refresh()"
            >
                <template #title>
                    <div>奥布山谷：{{ vallis.isWarm ? '温暖' : '寒冷' }}</div>
                </template>
                <template #prefix>
                    <span
                        class="i-ep:loading animation_rotate"
                        v-if="refreshing"
                    ></span>
                    <span
                        v-if="vallis.subscribed"
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
    name: 'vallis',
})
</script>

<script setup lang="ts">
import { getVallisCycle } from '@/api/warframestat'
import { utcTimestamp, format } from '@/util/DateUtil'
import { VallisCycle } from '@/composables/cycles'
import { isBlank } from '@util/StrUtil'
const props = defineProps({
    heartbeat: {
        type: Number,
        default: 3000,
    },
})
const vallis = ref<VallisCycle>({
    id: '',
    expiry: '',
    activation: '',
    isWarm: false,
    state: '',
    timeLeft: '',
    shortString: '',
    subscribed: false,
})

const init = async () => {
    vallis.value = (await getVallisCycle()) as VallisCycle
}
init()

const refreshing = ref<boolean>(false)
const refresh = async (): Promise<any> => {
    refreshing.value = true
    const reslut = (await getVallisCycle()) as VallisCycle
    if (reslut.id === vallis.value.id) {
        setTimeout(() => {
            return refresh()
        }, props.heartbeat)
    } else {
        vallis.value = reslut
        refreshing.value = false
        return true
    }
}

const isLoading = computed(() => {
    return isBlank(vallis.value.id)
})
</script>

<style lang="scss" scoped></style>
