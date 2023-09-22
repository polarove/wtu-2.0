<template>
    <div class="tools">
        <RyuSvg
            class="tool"
            name="ironpath"
            size="2rem"
            :class="{ invisible: isHard }"
            @click="_authStore.setDifficulty(Difficulty.normal.getCode())"
        />
        <RyuSvg
            class="tool"
            name="origin"
            size="2rem"
            :class="{ invisible: !isHard }"
            @click="_authStore.setDifficulty(Difficulty.hard.getCode())"
        />
    </div>
</template>

<script setup lang="ts">
import { authStore } from '@/store'
import { Difficulty } from '@composables/enums'
const _authStore = authStore()
const isHard = computed(() => !_authStore.getDifficulty())
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
