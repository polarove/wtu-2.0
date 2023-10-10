<template>
    <div
        :class="{
            'i-ep:loading': loading,
            'i-ep:arrow-down': !loading,
            animation_rotate: loading,
        }"
        @click="scrollDown()"
    ></div>
</template>

<script setup lang="ts">
import { teamStore } from '@/store'
const _teamStore = teamStore()
const loading = computed(() => {
    return _teamStore.getTeamListLoading() || _teamStore.getPageLoading()
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

<style lang="scss" scoped></style>
