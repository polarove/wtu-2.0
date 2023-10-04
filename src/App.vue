<template>
    <RouterView :key="_authStore.getServer()"></RouterView>
    <!-- <RouterView /> -->
</template>

<script setup lang="ts">
import { authStore, layoutStore } from '@/store'
import { LAYOUT_ENUM } from '@/composables/enums'
const _authStore = authStore()
const _layoutStore = layoutStore()

const initLayouts = () => {
    if (document.body.clientWidth < 900) {
        _layoutStore.setMode(LAYOUT_ENUM.compact)
    } else {
        _layoutStore.setMode(LAYOUT_ENUM.wide)
    }
}

onMounted(() => {
    window.addEventListener('resize', initLayouts)
})

onbeforeunload = () => {
    window.removeEventListener('resize', initLayouts)
}
</script>
