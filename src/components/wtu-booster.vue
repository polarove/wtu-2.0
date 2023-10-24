<template>
    <img
        :class="{
            active: active,
        }"
        :src="src"
        alt="booster"
        :style="{ width: size }"
        class="booster-img"
    />
</template>

<script setup lang="ts">
defineProps({
    src: { type: String, required: true },
    active: { type: Boolean, default: true },
    size: { type: String, default: '2em' },
})
</script>

<style lang="scss" scoped>
.active {
    opacity: 1 !important;
}
.booster-img {
    cursor: pointer;
    opacity: 0.4;

    &:hover {
        opacity: 1;
        transform: scale(1.1);
    }
}
</style>
