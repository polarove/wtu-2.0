<template>
    <ryu-svg
        class="c-p hover-color-blue"
        :name="_authStore.getDifficulty() ? 'steelpath' : 'origin'"
        :size="size"
        @click="_authStore.toggleDifficulty()"
    />
</template>

<script setup lang="ts">
import { authStore } from '@/store'
defineProps({
    size: {
        type: String,
        default: '1em',
    },
})

const _authStore = authStore()
</script>

<style lang="scss" scoped></style>
