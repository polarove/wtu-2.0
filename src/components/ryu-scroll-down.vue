<template>
    <div
        :class="{
            'i-ep:loading': loading,
            'i-ep:arrow-down': !loading,
            rotate: loading,
        }"
        @click="scrollDown()"
    ></div>
</template>

<script setup lang="ts">
import { teamStore } from '@/store'
const _teamStore = teamStore()
const loading = computed(() => {
    return _teamStore.getLoading() || _teamStore.getPageLoading()
})

const scrollDown = () => {
    _teamStore.nextPage(() => {
        window.requestAnimationFrame(() => {
            window.scrollTo({
                top: document.body.offsetHeight,
                behavior: 'smooth',
            })
        })
    })
}
</script>

<style lang="scss" scoped>
.rotate {
    animation: rotate 1s linear infinite;
}

@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
