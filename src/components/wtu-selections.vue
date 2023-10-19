<template>
    <wtu-application
        class="cursor-pointer hover-color-blue"
        style="font-size: 1.7em"
    />
    <wtu-difficulty class="option" style="font-size: 1.6em" />
    <wtu-accelerator class="option" />
    <wtu-help class="option" style="font-size: 1.55em" />
    <ryu-scroll-top class="option" style="font-size: 1.6em" />
    <ryu-scroll-down class="option" style="font-size: 1.6em" />
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.option {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0.25em 0 !important;
}
</style>
