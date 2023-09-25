<template>
    <div v-if="empty" class="empty">
        <RyuSvg class="icon" name="empty" :size="iconSize" />
        <div class="tip">{{ tip }}</div>
    </div>
    <slot v-else></slot>
</template>

<script setup lang="ts">
defineProps({
    empty: {
        type: Boolean,
        required: true,
    },
    iconSize: {
        type: String,
        default: '4em',
    },
    tip: {
        type: String,
        default: '空',
    },
})
</script>

<style lang="scss" scoped>
.empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .tip {
        margin-top: 1em;
        font-size: 0.88em;
        color: #999;
        user-select: none;
    }
}
</style>
