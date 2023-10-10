<template>
    <div class="icon-container" :style="{ width: size, height: size }">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
defineProps({
    size: {
        type: String,
        default: '1.4em',
    },
})
</script>

<style lang="scss" scoped>
.icon-container {
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}
.success {
    background-color: var(--el-color-success);
}
</style>
