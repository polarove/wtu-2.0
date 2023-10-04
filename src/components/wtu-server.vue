<template>
    <div v-if="loading" class="text-center">
        <span class="i-ep:loading animation-rotate"></span>
    </div>

    <span v-else class="font-smiley" @click="toggleServer()">
        <!-- {{ isUpperCase ? toUpperCase(server.toLocaleString()) : server }} -->
        <span
            class="server-name"
            :class="{ active: server, inactive: !server }"
        >
            {{ SERVER_CHAR.en }}
        </span>
        <span>&nbsp;/&nbsp;</span>
        <span
            class="server-name"
            :class="{ active: !server, inactive: server }"
        >
            {{ SERVER_CHAR.cn }}
        </span>
    </span>
</template>

<script setup lang="ts">
import { authStore, teamStore } from '@/store'
// import { toUpperCase } from '@/util/StrUtil'
import { SERVER_CHAR } from '@composables/enums'
import { ToggleServer } from '@api/account'
import { response } from '@/composables/types'
import type { UserVO } from '@/composables/user'
const _authStore = authStore()
const _teamStore = teamStore()
const server = _authStore.getServer()
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
        loading.value = false
    }
}
</script>

<style lang="scss" scoped>
.server-name {
    cursor: pointer;
    &:hover {
        color: var(--el-color-primary);
    }
}
.active {
    color: var(--el-color-primary);
}
.inactive {
    color: var(--el-text-color-secondary);
}
</style>
