<template>
    <div class="tabs">
        <span class="tab">活动</span>
        <span class="tab">警报</span>
        <span class="tab" v-if="_authStore.getDifficulty()">钢铁之路侵袭</span>
        <span class="tab">入侵</span>
        <span class="tab">集团</span>
        <span class="tab">虚空裂缝</span>
        <span class="tab">突击</span>
        <span class="tab">执行官猎杀</span>
        <span class="tab">星球探索</span>
    </div>
</template>

<script setup lang="ts">
import { authStore } from '@/store'
const _authStore = authStore()
</script>

<style lang="scss" scoped>
.tabs {
    .tab {
        user-select: none;
        cursor: pointer;
        font-size: 1.1em;
        &:hover {
            color: var(--el-color-primary);
        }
    }
    .tab:nth-child(n + 2) {
        margin-left: 0.5em;
    }
}
</style>
