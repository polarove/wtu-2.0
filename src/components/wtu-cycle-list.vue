<template>
    <el-row :gutter="24" class="lt-lg:mt-1em">
        <el-col
            :span="_layoutStore.isWide() ? 4 : 12"
            v-for="(item, index) in cycles"
        >
            <div
                class="lt-lg:ma-0.25em"
                @subscribe="toggleSubscribe(item.name)"
            >
                <component :key="index" :is="item"></component>
            </div>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import wtuCycleCambion from '@/components/wtu-cycle-cambion.vue'
import wtuCycleCetus from '@/components/wtu-cycle-cetus.vue'
import wtuCycleVallis from '@/components/wtu-cycle-vallis.vue'
import wtuCycleEarth from '@/components/wtu-cycle-earth.vue'
import wtuCycleVoidTrader from '@/components/wtu-cycle-voidTrader.vue'
import wtuCycleZariman from '@/components/wtu-cycle-zariman.vue'

import { layoutStore } from '@/store'
const _layoutStore = layoutStore()

const cycles = [
    wtuCycleCetus,
    wtuCycleCambion,
    wtuCycleVallis,
    wtuCycleZariman,
    wtuCycleEarth,
    wtuCycleVoidTrader,
]
const toggleSubscribe = (name: string | undefined) => {
    console.log(name)
}
</script>

<style lang="scss" scoped></style>
