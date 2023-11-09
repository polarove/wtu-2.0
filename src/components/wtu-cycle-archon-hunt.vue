<template>
    <ryu-loading :loading="loading" :rows="1">
        <el-row :gutter="24">
            <el-col class="mt-1em" :lg="6" :md="12" :xs="24">
                <el-card>
                    <div class="flex-between">
                        <el-countdown
                            :format="format.day"
                            :value="utcTimestamp(archonHunt.expiry)"
                            @finish="refresh(archonHunt.id)"
                        >
                            <template #title>
                                <div>执行官猎杀：{{ archonHunt.boss }}</div>
                            </template>
                            <template #prefix>
                                <span
                                    class="i-ep:loading animation_rotate"
                                    v-if="refreshing"
                                >
                                </span
                            ></template>
                        </el-countdown>

                        <div
                            class="i-ep:semi-select c-p hover-color-blue"
                            v-if="hidden"
                            @click="shrink(false)"
                        ></div>
                        <div
                            class="i-ep:arrow-right-bold lt-lg:i-ep:arrow-down-bold c-p hover-color-blue"
                            v-else
                            @click="shrink(true)"
                        ></div>
                    </div>
                </el-card>
            </el-col>
            <el-col
                class="mt-1em"
                :lg="6"
                :md="12"
                :xs="24"
                v-if="hidden"
                v-for="(mission, index) in archonHunt.missions"
            >
                <el-card class="h-90px">
                    {{ index + 1 }}.&nbsp;{{ mission.node }}
                    {{ mission.type }}
                </el-card>
            </el-col>
        </el-row>
    </ryu-loading>
</template>

<script setup lang="ts">
import { getArchonHunt } from '@/api/cycles'
import { ArchonHuntCycle } from '@/composables/cycles'
import { response } from '@/composables/types'
import { isBlank } from '@/util/StrUtil'
import { utcTimestamp, format } from '@/util/DateUtil'
const archonHunt = ref<ArchonHuntCycle>({
    id: '',
    activation: '',
    startString: '',
    expiry: '',
    active: true,
    rewardPool: '',
    variants: [],
    missions: [
        {
            node: '',
            nodeKey: '',
            type: '',
            typeKey: '',
            nightmare: false,
            archwingRequired: false,
            isSharkwing: false,
            advancedSpawners: [],
            requiredItems: [],
            levelAuras: [],
        },
        {
            node: '',
            nodeKey: '',
            type: '',
            typeKey: '',
            nightmare: false,
            archwingRequired: false,
            isSharkwing: false,
            advancedSpawners: [],
            requiredItems: [],
            levelAuras: [],
        },
        {
            node: '',
            nodeKey: '',
            type: '',
            typeKey: '',
            nightmare: false,
            archwingRequired: false,
            isSharkwing: false,
            advancedSpawners: [],
            requiredItems: [],
            levelAuras: [],
        },
    ],
    boss: '',
    faction: '',
    expired: false,
    eta: '',
    subscribed: false,
})

const loading = computed(() => {
    return isBlank(archonHunt.value.id)
})

const hidden = ref<boolean>(false)
const init = async () => {
    const result = (await getArchonHunt()) as response<ArchonHuntCycle>
    archonHunt.value = result.data
}
init()

const refreshing = ref<boolean>(false)
const refresh = async (id: string) => {
    refreshing.value = true
    const result = (await getArchonHunt()) as response<ArchonHuntCycle>
    if (result.data.id === id) {
        console.log('archon hunt cycle not changed, refresh again')
        setTimeout(() => {
            return refresh(id)
        }, 3000)
    } else {
        archonHunt.value = result.data
        refreshing.value = false
        return true
    }
}

const shrink = (state: boolean) => {
    hidden.value = state
}
</script>

<style lang="scss" scoped></style>
