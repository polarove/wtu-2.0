<template>
    <el-skeleton animated :loading="loading" class="animate__animated">
        <template #template>
            <el-skeleton-item
                v-for="_ in rows"
                variant="text"
                :style="{ height: height }"
            />
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
    rows: {
        type: Number,
        default: 5,
    },
})
</script>

<style lang="scss" scoped></style>
