<template>
    <div class="states">
        <el-tooltip
            :content="OnlineStatusEnum.offline.getType()"
            :disabled="tooltipDisabled"
        >
            <RyuSvg
                @click="toggleOnlineStatus(OnlineStatusEnum.offline.getCode())"
                name="offline"
                :size="size"
                class="state offline"
                :class="{ active: user_offline }"
            >
            </RyuSvg>
        </el-tooltip>
        <el-tooltip
            :content="OnlineStatusEnum.online.getType()"
            :disabled="tooltipDisabled"
        >
            <RyuSvg
                @click="toggleOnlineStatus(OnlineStatusEnum.online.getCode())"
                name="online"
                :size="size"
                style="margin: 0 18px"
                class="state online"
                :class="{ active: user_online }"
            >
            </RyuSvg>
        </el-tooltip>
        <el-tooltip
            :content="OnlineStatusEnum.online_in_game.getType()"
            :disabled="tooltipDisabled"
        >
            <RyuSvg
                @click="
                    toggleOnlineStatus(
                        OnlineStatusEnum.online_in_game.getCode()
                    )
                "
                name="wifi-solid"
                :size="size"
                class="state ingame"
                :class="{ active: user_ingame }"
            >
            </RyuSvg>
        </el-tooltip>
    </div>
</template>

<script setup lang="ts">
import { UpdateOnlineStatus } from '@api/account'
import { response } from '@/composables/types'
import { ElMessage } from 'element-plus'
import { OnlineStatusEnum } from '@composables/enums'
import { authStore } from '@/store'
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
    return _authStore.getOnlineStatus() === OnlineStatusEnum.offline.getCode()
})

const user_online = computed(() => {
    return _authStore.getOnlineStatus() === OnlineStatusEnum.online.getCode()
})

const user_ingame = computed(() => {
    return (
        _authStore.getOnlineStatus() ===
        OnlineStatusEnum.online_in_game.getCode()
    )
})
interface UpdateOnlineStatusFormType {
    onlineStatus: number | null
    uuid: string
}
const UpdateOnlineStatusForm = reactive<UpdateOnlineStatusFormType>({
    onlineStatus: null,
    uuid: _authStore.getUUID(),
})

const toggleOnlineStatus = async (onlineStatus: number) => {
    if (onlineStatus === _authStore.getOnlineStatus()) {
        return
    }
    const previosOnlineStatus = _authStore.getOnlineStatus()
    _authStore.setOnlineStatus(onlineStatus)
    UpdateOnlineStatusForm.onlineStatus = onlineStatus
    const result = (await UpdateOnlineStatus(
        UpdateOnlineStatusForm
    )) as response
    if (!result.success) {
        _authStore.setOnlineStatus(previosOnlineStatus)
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
}
</style>
