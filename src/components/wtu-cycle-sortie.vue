<template>
    <ryu-loading :loading="loading" :rows="1">
        <el-row :gutter="24">
            <el-col class="lt-lg:mt-0.5em" :xl="6" :sm="24">
                <el-card>
                    <div class="flex-between">
                        <el-countdown
                            :format="format.hour"
                            :value="utcTimestamp(sortie.expiry)"
                            @finish="init()"
                        >
                            <template #title>
                                <div>每日突击：{{ sortie.boss }}</div>
                            </template>
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
                class="lt-lg:mt-0.5em"
                :xl="6"
                :sm="24"
                v-if="hidden"
                v-for="(mission, index) in sortie.variants"
            >
                <el-card class="h-90px">
                    <div>
                        {{ index + 1 }}.&nbsp;{{ mission.node }}&nbsp;&nbsp;{{
                            mission.missionType
                        }}
                    </div>
                    <div>{{ mission.modifierDescription }}</div>
                </el-card>
            </el-col>
        </el-row>
    </ryu-loading>
</template>

<script setup lang="ts">
import { getSortie } from '@/api/cycles'
import { response } from '@/composables/types'
import { SortieCycle } from '@/composables/cycles'
import { utcTimestamp, format } from '@/util/DateUtil'
import { isBlank } from '@/util/StrUtil'
const sortie = ref<SortieCycle>({
    id: '',
    activation: '',
    startString: '',
    expiry: '',
    active: true,
    rewardPool: '',
    variants: [
        { missionType: '', modifier: '', modifierDescription: '', node: '' },
        { missionType: '', modifier: '', modifierDescription: '', node: '' },
        { missionType: '', modifier: '', modifierDescription: '', node: '' },
    ],
    missions: [],
    boss: '',
    faction: '',
    expired: false,
    eta: '',
    subscribed: false,
})

const init = async () => {
    const result = (await getSortie()) as response<SortieCycle>
    sortie.value = result.data
    console.log(result)
}
init()

const hidden = ref<boolean>(false)
const loading = computed(() => {
    return isBlank(sortie.value.id)
})

const shrink = (state: boolean) => {
    hidden.value = state
}
</script>

<style lang="scss" scoped></style>
