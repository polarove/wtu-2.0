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

<style lang="scss" scoped></style>
