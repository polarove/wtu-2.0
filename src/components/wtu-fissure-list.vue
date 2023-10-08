<template>
    <ryu-loading :loading="loading" :rows="1">
        <ryu-empty :empty="empty" tip="当前暂无裂缝信息">
            <el-row>
                <el-col :span="4" v-for="item in fissure_list" class="p-0.4em">
                    <el-card
                        shadow="hover"
                        class="animate__animated"
                        :class="{
                            animate__fadeIn: !item.expired,
                            animate__fadeOut: item.expired,
                        }"
                    >
                        <el-countdown
                            :format="format.hour"
                            :value="utcTimestamp(item.expiry)"
                            @finish="drop(item.id)"
                        >
                            <template #title>
                                <div>{{ item.node }}</div>
                            </template>
                            <template #prefix>
                                <div class="text-size-[0.8em]">
                                    {{ item.missionType }}&nbsp;
                                </div>
                            </template>
                        </el-countdown>
                    </el-card>
                </el-col>
            </el-row>
        </ryu-empty>
    </ryu-loading>
</template>

<script setup lang="ts">
import type { fissure } from '@/composables/fissure'
import { getFissureList } from '@api/warframestat/index'
import { utcTimestamp, format } from '@/util/DateUtil'
const fissure_list = ref<fissure[]>([])
const loading = ref<boolean>(false)
const empty = computed(() => fissure_list.value.length === 0)
const route = useRoute()

const fetch = async () => {
    const full_list = (await getFissureList()) as fissure[]
    switch (route.name) {
        case 'fissure':
            fissure_list.value = full_list.filter(
                (fissure: fissure) =>
                    fissure.isHard === false &&
                    fissure.isStorm === false &&
                    fissure.expired === false
            )
            break
        case 'steel_path':
            fissure_list.value = full_list.filter(
                (fissure: fissure) =>
                    fissure.isHard === true &&
                    fissure.isStorm === false &&
                    fissure.expired === false
            )
            break
        case 'empyrean':
            fissure_list.value = full_list.filter(
                (fissure: fissure) =>
                    fissure.isHard === false &&
                    fissure.isStorm === true &&
                    fissure.expired === false
            )
            break
    }
}

const initialize = () => {
    loading.value = true
    fetch()
    loading.value = false
}
initialize()

const drop = (id: string) => {
    fissure_list.value = fissure_list.value.filter(
        (fissure: fissure) => fissure.id !== id
    )
}

setInterval(() => {
    fetch()
}, 1000)
</script>

<style lang="scss" scoped></style>
