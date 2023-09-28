<template>
    <span class="font-smiley" @click="toggleServer()">
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

const toggleServer = async () => {
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
    } else {
        console.log(result.message)
    }
}
</script>

<style lang="scss" scoped></style>
