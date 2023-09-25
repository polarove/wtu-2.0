<template>
    <el-skeleton animated :loading="loading">
        <template #template>
            <el-skeleton-item variant="text" :style="{ height: height }" />
            <el-skeleton-item variant="text" :style="{ height: height }" />
            <el-skeleton-item variant="text" :style="{ height: height }" />
            <el-skeleton-item variant="text" :style="{ height: height }" />
            <el-skeleton-item variant="text" :style="{ height: height }" />
        </template>
        <template #default>
            <slot />
        </template>
    </el-skeleton>
</template>

<script setup lang="ts">
defineProps({
    loading: {
        type: Boolean,
        default: true,
    },
    height: {
        type: String,
        default: '180px',
    },
})
</script>

<style lang="scss" scoped></style>
