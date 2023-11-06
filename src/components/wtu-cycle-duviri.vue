<template>
    <el-row :gutter="24">
        <el-col
            class="xs:mt-1em"
            :sm="isHard ? 4 : 6"
            :key="index"
            v-for="(choice, index) in difficulty?.choices"
        >
            <el-card>{{ choice }}</el-card>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import { response } from '@/composables/types'
import { getDuviriCycle } from '@api/cycles'
import { DuviriCycle } from '@composables/cycles'
import { authStore } from '@/store'
import { activityStore } from '@/store'
const _activityStore = activityStore()
const _authStore = authStore()
const isHard = computed(() => {
    return _authStore.getDifficulty()
})
const duviri = ref<DuviriCycle>({
    id: '',
    activation: '',
    expiry: '',
    state: '',
    choices: [
        {
            category: 'normal',
            categoryKey: 'EXC_NORMAL',
            // 普通模式战甲
            choices: [],
        },
        {
            category: 'hard',
            categoryKey: 'EXC_HARD',
            // 钢铁之路灵化
            choices: [],
        },
    ],
    subscribed: false,
})

const init = async () => {
    const result = (await getDuviriCycle()) as response<DuviriCycle>
    duviri.value = result.data
    result.data.choices
        .find((choice) => choice.category === 'normal')
        ?.choices.unshift('本周战甲')
    result.data.choices
        .find((choice) => choice.category === 'hard')
        ?.choices.unshift('本周灵化')
    _activityStore.setDuviState(duviri.value.state)
}
init()

const difficulty = computed(() => {
    return isHard.value
        ? duviri.value.choices.find((choice) => choice.category === 'hard')
        : duviri.value.choices.find((choice) => choice.category === 'normal')
})
</script>

<style lang="scss" scoped></style>
