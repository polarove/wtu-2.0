<template>
    <el-popover :width="200" :disabled="PopDisabled"
        popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; border-radius: 0.5em; padding: 20px;">
        <template #reference>
            <el-avatar @click="NaviPrivateHome()" :src="isBlank(_authStore.getUUID()) ? avatar : _authStore.getAvatar()"
                fit="cover" :shape="shape" :size="size" @error="avatarLoadingErrorHandler" class="avatar"
                :class="{ offline: user_offline, online: user_online, ingame: user_ingame }">
            </el-avatar>
        </template>
        <template #default>
            <div v-if="isBlank(_authStore.getUUID())" class="text-center text-size-[1.0rem]">点击登录&nbsp;/&nbsp;注册</div>
            <div v-else class="flex-between">
                <div class="user-state">
                    <div class="name">{{ _authStore.getName() }}</div>
                    <div class="states">
                        <el-tooltip :content="OnlineStatusEnum.offline.getType()">
                            <RyuSvg @click="toggleOnlineStatus(OnlineStatusEnum.offline.getCode())" name="offline"
                                size="1.3rem" class="state offline" :class="{ active: user_offline }">
                            </RyuSvg>
                        </el-tooltip>
                        <el-tooltip :content="OnlineStatusEnum.online.getType()">
                            <RyuSvg @click="toggleOnlineStatus(OnlineStatusEnum.online.getCode())" name="online"
                                size="1.3rem" class="state online" :class="{ active: user_online }">
                            </RyuSvg>
                        </el-tooltip>
                        <el-tooltip :content="OnlineStatusEnum.online_in_game.getType()">
                            <RyuSvg @click="toggleOnlineStatus(OnlineStatusEnum.online_in_game.getCode())" name="wifi-solid"
                                size="1.3rem" class="state ingame" :class="{ active: user_ingame }">
                            </RyuSvg>
                        </el-tooltip>

                    </div>
                </div>
                <el-tooltip content="退出登录">
                    <div class="i-ant-design:poweroff-outlined text-size-[1.5rem] cursor-pointer hover-color-red"
                        @click="logout()"></div>
                </el-tooltip>
            </div>
        </template>
    </el-popover>
</template>

<script setup lang="ts">
import router from '@/router';
import { authStore } from '@/store';
import { isBlank } from '@util/StrUtil'
import { Logout, UpdateOnlineStatus } from '@api/account'
import { response } from '@/composables/types';
import { ElMessage } from 'element-plus';
import { OnlineStatusEnum } from "@composables/enums"

const _authStore = authStore();

const user_offline = computed(() => {
    return _authStore.getOnlineStatus() === OnlineStatusEnum.offline.getCode()
})

const user_online = computed(() => {
    return _authStore.getOnlineStatus() === OnlineStatusEnum.online.getCode()
})

const user_ingame = computed(() => {
    return _authStore.getOnlineStatus() === OnlineStatusEnum.online_in_game.getCode()
})

defineProps({
    shape: {
        type: String,
        default: 'square'
    },
    size: {
        type: Number,
        default: 60
    },
    avatar: {
        type: String,
        default: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    },
    PopDisabled: {
        type: Boolean,
        default: false
    }
})

const NaviPrivateHome = () => {
    if (isBlank(_authStore.getUUID())) {
        router.push({ name: 'login' })
        return
    }
    router.push({ name: 'profile' })
}

const logout = async () => {
    const result = await Logout(_authStore.getUUID()) as response
    if (result.code === 200) {
        _authStore.$reset()
        router.replace({ name: 'login' })
    } else {
        ElMessage.error(result.message)
    }
}

const avatarLoadingErrorHandler = (e: Event) => {
    console.log(e)
}

interface UpdateOnlineStatusFormType {
    onlineStatus: number | null,
    uuid: string
}
const UpdateOnlineStatusForm = reactive<UpdateOnlineStatusFormType>({
    onlineStatus: null,
    uuid: _authStore.getUUID()
})
const toggleOnlineStatus = async (onlineStatus: number) => {
    if (onlineStatus === _authStore.getOnlineStatus()) {
        return
    }
    const previosOnlineStatus = _authStore.getOnlineStatus()
    _authStore.setOnlineStatus(onlineStatus)
    UpdateOnlineStatusForm.onlineStatus = onlineStatus
    const result = await UpdateOnlineStatus(UpdateOnlineStatusForm) as response
    if (!result.success) {
        _authStore.setOnlineStatus(previosOnlineStatus)
        ElMessage.error(result.message)
    }
}
</script>

<style lang="scss" scoped>
.avatar {
    cursor: pointer;
}

.avatar.offline {
    box-shadow: 0 0 0 2px rgba($color: #d74747, $alpha: 0.7) inset;
}

.avatar.online {
    box-shadow: 0 0 0 2px var(--el-color-primary) inset;
}

.avatar.ingame {
    box-shadow: 0 0 0 2px rgba($color: #3dc468, $alpha: 0.7) inset;
}

.user-state {
    .name {
        font-size: 1.2em;
        font-weight: bold;
    }

    .states {
        display: flex;
        justify-content: space-between;

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
}
</style>
