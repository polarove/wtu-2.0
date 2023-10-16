<template>
    <el-row :gutter="12" class="lt-md:mt-1em">
        <el-col :xs="12" :sm="6" :md="4" v-for="(item, index) in cycle12">
            <div
                class="lt-md:ma-0.25em"
                @subscribe="toggleSubscribe(item.name)"
            >
                <component :key="index" :is="item"></component>
            </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="4" v-for="(item, index) in cycle24">
            <div
                class="lt-md:ma-0.25em"
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

const cycle12 = [wtuCycleCetus, wtuCycleCambion, wtuCycleVallis, wtuCycleEarth]

const cycle24 = [wtuCycleZariman, wtuCycleVoidTrader]
const toggleSubscribe = (name: string | undefined) => {
    console.log(name)
}
</script>

<style lang="scss" scoped>
:deep(.el-statistic__content) {
    display: flex;
    @media screen and (max-width: 1420px) {
        font-size: 0.88em;
    }
}
</style>
