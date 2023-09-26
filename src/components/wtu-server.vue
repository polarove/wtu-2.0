<template>
    <span class="font-smiley" @click="toggleServer()">
        {{ isUpperCase ? toUpperCase(server as string) : (server as string) }}
    </span>
</template>

<script setup lang="ts">
import { authStore, teamStore } from '@/store'
import { toUpperCase } from '@/util/StrUtil'
import { ServerEnum } from '@composables/enums'
import { ToggleServer } from '@api/account'
import { response } from '@/composables/types'
import type { User } from '@/composables/user'
const route = useRoute()
const _authStore = authStore()
const _teamStore = teamStore()
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
        _teamStore.initTeamList(route.name)
    } else {
        console.log(result.message)
    }
}
</script>

<style lang="scss" scoped></style>
