<template>
    <span v-if="loading" class="i-ep:loading animation-rotate"></span>
    <span v-else class="font-smiley" @click="toggleServer()">
        {{ isUpperCase ? toUpperCase(server.toLocaleString()) : server }}
    </span>
</template>

<script setup lang="ts">
import { authStore, teamStore } from '@/store'
import { toUpperCase } from '@/util/StrUtil'
import { SERVER_TYPE } from '@composables/enums'
import { ToggleServer } from '@api/account'
import { response } from '@/composables/types'
import type { UserVO } from '@/composables/user'
const _authStore = authStore()
const _teamStore = teamStore()
const server = computed(() => {
    return _authStore.getServer() ? SERVER_TYPE.en : SERVER_TYPE.cn
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
    let state = _authStore.getServer()
    const result = (await ToggleServer({
        previous: state,
        current: state ? 0 : 1,
    })) as response<UserVO>
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

<style lang="scss" scoped></style>
