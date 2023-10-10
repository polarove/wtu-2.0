<template>
    <div class="i-ep:arrow-up" @click="backToTop()"></div>
</template>

<script setup lang="ts">
const backToTop = () => {
    const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop
    if (scrollTop > 0) {
        window.scrollTo(0, 0)
    }
}
</script>

<style lang="scss" scoped></style>
