<template>
    <div
        class="color-gray text-size-[0.77em] cursor-pointer hover-color-blue"
        @click="$router.push({ name: 'sponsor' })"
    >
        <slot>制作不易，赞助作者!</slot>
    </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
