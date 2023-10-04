<template>
    <div v-if="loading" class="text-center">
        <span class="i-ep:loading animation-rotate"></span>
    </div>

    <span v-else class="font-smiley">
        <!-- {{ isUpperCase ? toUpperCase(server.toLocaleString()) : server }} -->
        <span
            class="server-name"
            :class="{ active: server, inactive: !server }"
            @click="toggleServer(1)"
        >
            {{ SERVER_CHAR.en }}
        </span>
        <span>&nbsp;/&nbsp;</span>
        <span
            class="server-name"
            :class="{ active: !server, inactive: server }"
            @click="toggleServer(0)"
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

const server = computed(() => _authStore.getServer())
defineProps({
    isUpperCase: {
        type: Boolean,
        default: false,
    },
})
const loading = ref(false)
const toggleServer = async (target: number) => {
    if (loading.value || target === server.value) {
        return
    }
    loading.value = true
    const result = (await ToggleServer({
        previous: server.value,
        current: server.value ? 0 : 1,
    })) as response<UserVO>
    if (result.success) {
        _authStore.setUser(result.data)
        _teamStore.setParam({
            ..._teamStore.getParam(),
            server: server.value,
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
