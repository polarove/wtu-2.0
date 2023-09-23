<template>
    <div class="tools">
        <RyuSvg
            class="tool"
            name="steelpath"
            size="2rem"
            :class="{ invisible: !_authStore.getDifficulty() }"
            @click="updateDifficulty(false)"
        />
        <RyuSvg
            class="tool"
            name="origin"
            size="2rem"
            :class="{ invisible: _authStore.getDifficulty() }"
            @click="updateDifficulty(true)"
        />
    </div>
</template>

<script setup lang="ts">
import { authStore } from '@/store'
const _authStore = authStore()
const updateDifficulty = (difficulty: boolean) => {
    _authStore.setDifficulty(difficulty)
}
</script>

<style lang="scss" scoped>
.tools {
    display: flex;
    flex-direction: column;
    align-items: center;
    .tool {
        cursor: pointer;
        &:hover {
            color: var(--el-color-primary);
        }
    }
    .tool.invisible {
        display: none;
    }
}
</style>
