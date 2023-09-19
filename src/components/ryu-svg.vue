<template>
    <svg class="svg-icon" aria-hidden :style="{ width: size, height: size, margin: margin }">
        <use :href="`#icon-${name}`" :fill="color"></use>
    </svg>
</template>

<script setup lang="ts">
defineProps({
    name: { type: String, required: true },
    size: { type: String, default: '1rem' },
    margin: { type: String, default: '0 .125rem' },
    color: { type: String, default: '' },
})
</script>

<style lang="scss" scoped>
.svg-icon {
    // display: inline-block;
    // vertical-align: -0.125em;
    outline: none;
    fill: currentColor;
    overflow: hidden;
}
</style>
