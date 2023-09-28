<template>
    <span v-if="loading" class="i-ep:loading loading"></span>
    <span v-else class="font-smiley" @click="toggleServer()">
        {{ isUpperCase ? toUpperCase(server.toLocaleString()) : server }}
    </span>
</template>

<script setup lang="ts">
import { authStore, teamStore } from '@/store'
import { toUpperCase } from '@/util/StrUtil'
import { ServerTypeEnum } from '@composables/enums'
import { ToggleServer } from '@api/account'
import { response } from '@/composables/types'
import type { User } from '@/composables/user'
const _authStore = authStore()
const _teamStore = teamStore()
const server = computed(() => {
    return _authStore.getServer() ? ServerTypeEnum.en : ServerTypeEnum.cn
})

defineProps({
    isUpperCase: {
        type: Boolean,
        default: false,
    },
})

const loading = ref(false)
const toggleServer = async () => {
    if (loading.value) {
        return
    }
    loading.value = true
    const result = (await ToggleServer(
        _authStore.getServer() ? 0 : 1
    )) as response<User>
    if (result.success) {
        _authStore.setUser(result.data)
        _teamStore.setParam({
            ..._teamStore.getParam(),
            server: _authStore.getServer(),
        })
        _teamStore.initTeamList()
        loading.value = false
    } else {
        console.log(result.message)
        loading.value = false
    }
}
</script>

<style lang="scss" scoped>
.loading {
    animation: loading 1s infinite;
}
@keyframes loading {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
