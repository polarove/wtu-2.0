<template>
    <wtu-application
        class="cursor-pointer hover-color-blue"
        style="font-size: 1.6em"
    />
    <wtu-difficulty class="option" style="font-size: 1.5em" />
    <wtu-accelerator class="option" />
    <wtu-help class="option" style="font-size: 1.5em" />
    <ryu-scroll-top class="option" style="font-size: 1.5em" />
    <ryu-scroll-down class="option" style="font-size: 1.5em" />
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.option {
    margin: 0.25em 0 !important;
    cursor: pointer;
    &:hover {
        color: var(--el-color-primary);
    }
}
</style>
