<template>
    <div class="states">
        <el-tooltip content="离线" :disabled="tooltipDisabled">
            <ryu-svg
                @click="updateOnlineStatus(OnlineStatusEnum.offline)"
                name="offline"
                :size="size"
                class="state offline"
                :class="{ active: user_offline }"
            >
            </ryu-svg>
        </el-tooltip>
        <el-tooltip content="在线" :disabled="tooltipDisabled">
            <ryu-svg
                @click="updateOnlineStatus(OnlineStatusEnum.online)"
                name="online"
                :size="size"
                class="state online"
                :class="{ active: user_online }"
            >
            </ryu-svg>
        </el-tooltip>
        <el-tooltip content="游戏中" :disabled="tooltipDisabled">
            <ryu-svg
                @click="updateOnlineStatus(OnlineStatusEnum.online_in_game)"
                name="wifi-solid"
                :size="size"
                class="state ingame"
                :class="{ active: user_ingame }"
            >
            </ryu-svg>
        </el-tooltip>
        <el-tooltip
            content="退出登录"
            :disabled="tooltipDisabled"
            v-if="isNotBlank(_authStore.getUUID())"
        >
            <ryu-svg
                name="poweroff"
                :size="size"
                @click="logout()"
                class="state poweroff"
            />
        </el-tooltip>
    </div>
</template>

<script setup lang="ts">
import { UpdateOnlineStatus, Logout } from '@api/account'
import type { response } from '@/composables/types'
import { ElMessage } from 'element-plus'
import { OnlineStatusEnum } from '@composables/enums'
import { authStore } from '@/store'
import router from '@/router'
import { isNotBlank } from '@util/StrUtil'
const _authStore = authStore()

defineProps({
    tooltipDisabled: {
        type: Boolean,
        default: false,
    },
    size: {
        type: String,
        default: '1.3rem',
    },
})

const user_offline = computed(() => {
    return _authStore.getOnlineStatus() === OnlineStatusEnum.offline
})

const user_online = computed(() => {
    return _authStore.getOnlineStatus() === OnlineStatusEnum.online
})

const user_ingame = computed(() => {
    return _authStore.getOnlineStatus() === OnlineStatusEnum.online_in_game
})

const logout = async () => {
    const result = (await Logout(_authStore.getUUID())) as response<string>
    if (result.code === 200) {
        _authStore.$reset()
        router.replace({ name: 'login' })
    } else {
        ElMessage.error(result.message)
    }
}

interface UpdateOnlineStatusFormType {
    onlineStatus: number | null
    uuid: string
}
const UpdateOnlineStatusForm = reactive<UpdateOnlineStatusFormType>({
    onlineStatus: null,
    uuid: _authStore.getUUID(),
})

const updateOnlineStatus = async (onlineStatus: number) => {
    if (onlineStatus === _authStore.getOnlineStatus()) {
        return
    }
    const previosOnlineStatus = _authStore.getOnlineStatus()
    _authStore.setOnlineStatus(onlineStatus)
    UpdateOnlineStatusForm.onlineStatus = onlineStatus
    const result = (await UpdateOnlineStatus(
        UpdateOnlineStatusForm
    )) as response<string>
    if (!result.success) {
        _authStore.setOnlineStatus(previosOnlineStatus as number)
        ElMessage.error(result.message)
    }
}
</script>

<style lang="scss" scoped>
.states {
    display: flex;

    .state {
        &:hover {
            cursor: pointer;
        }
    }
    .state:nth-child(n + 2) {
        margin-left: 8px !important;
    }

    .offline {
        color: #ccc;

        &:hover {
            color: #d74747;
        }
    }

    .offline.active {
        color: #d74747;
    }

    .online {
        color: #ccc;

        &:hover {
            color: var(--el-color-primary);
        }
    }

    .online.active {
        color: var(--el-color-primary);
    }

    .ingame {
        color: #ccc;

        &:hover {
            color: #47d747;
        }
    }

    .ingame.active {
        color: #47d747;
    }

    .poweroff {
        color: #ccc;
        transform: color 0.3s ease-in-out;
        &:hover {
            color: var(--el-color-danger);
        }
    }
}
</style>
