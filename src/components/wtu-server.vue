<template>
    <span class="font-smiley" @click="toggleServer()">
        {{ isUpperCase ? toUpperCase(server as string) : (server as string) }}
    </span>
</template>

<script setup lang="ts">
import { authStore } from '@/store'
import { toUpperCase } from '@/util/StrUtil'
import { ServerEnum } from '@composables/enums'
import { ToggleServer } from '@api/account'
import { User, response } from '@/composables/types'

const _authStore = authStore()

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
    )) as response
    console.log(result.data)

    if (result.success) {
        _authStore.setUser(result.data as User)
    } else {
        console.log(result.message)
    }
}
</script>

<style lang="scss" scoped></style>
