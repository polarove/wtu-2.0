<template>
    <ryu-scroll-top class="icon" />
    <ryu-scroll-down class="icon" />
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.icon {
    font-size: 1.6em;
    margin: 0.25em 0;
    cursor: pointer;
    &:hover {
        color: var(--el-color-primary);
    }
}
</style>
