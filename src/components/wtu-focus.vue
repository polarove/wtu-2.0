<template>
    <div class="focus">
        <RyuSvg :name="name" :size="size" />
        <div v-if="showName" class="text-center">
            {{ name }}
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    name: {
        type: String,
        default: 'any',
        required: true,
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
    }
}
</style>
