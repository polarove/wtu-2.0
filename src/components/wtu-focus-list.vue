<template>
    <div
        v-for="len in focus"
        class="focus"
        :style="{ opacity: modelValue !== len.name ? 0.33 : 1 }"
        @click="$emit('update:modelValue', len.name)"
    >
        <RyuSvg :name="len.name" :size="size" />
        <div v-if="showName" class="text-center">
            {{ len.name }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { focus } from '@composables/focus'
defineProps({
    modelValue: {
        type: String,
        default: '',
    },
    size: {
        type: String,
        default: '1em',
    },
    showName: {
        type: Boolean,
        default: false,
    },
})
</script>

<style lang="scss" scoped>
.focus {
    cursor: pointer;

    &:hover {
        color: var(--el-color-primary);
        opacity: 1 !important;
    }
}
</style>
