<template>
    <slot name="img"></slot>
</template>

<script setup lang="ts">
defineProps({
    src: { type: String, required: true },
})
</script>

<style lang="scss" scoped></style>
