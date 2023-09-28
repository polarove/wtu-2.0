<template>
    <RouterView :key="_authStore.getServer()"></RouterView>
</template>

<script setup lang="ts">
import { authStore } from '@/store'
const _authStore = authStore()
</script>
