<template>
    <ryu-svg
        class="tool"
        :name="_authStore.getDifficulty() ? 'steelpath' : 'origin'"
        :size="size"
        @click="updateDifficulty()"
    />
</template>

<script setup lang="ts">
import { authStore } from '@/store'
import router from '@/router'
defineProps({
    size: {
        type: String,
        default: '1em',
    },
})

const _authStore = authStore()
const updateDifficulty = () => {
    if (_authStore.getDifficulty()) {
        router.push({ name: 'origin' })
    } else {
        router.push({ name: 'steelpath' })
    }
    _authStore.toggleDifficulty()
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
