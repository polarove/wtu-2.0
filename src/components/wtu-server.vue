<template>
    <span class="font-smiley" @click="toggleServer()">
        {{ isUpperCase ? toUpperCase(server as string) : (server as string) }}
    </span>
</template>

<script setup lang="ts">
import { authStore, teamStore, wssStore } from '@/store'
import { toUpperCase } from '@/util/StrUtil'
import { ServerEnum } from '@composables/enums'
import { ToggleServer } from '@api/account'
import { response } from '@/composables/types'
import type { User } from '@/composables/user'
const _authStore = authStore()
const _teamStore = teamStore()
const _wssStore = wssStore()
const route = useRoute()
const server = computed(() => {
    return ServerEnum.types.find((item) => item.code == _authStore.getServer())
        ?.shortcut
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
        _wssStore
            .getWss()
            .joinChannel(
                route.name,
                _authStore.getUUID(),
                _authStore.getServer()
            )
    } else {
        console.log(result.message)
    }
}
</script>

<style lang="scss" scoped></style>
