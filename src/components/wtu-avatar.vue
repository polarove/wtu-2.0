<template>
    <el-popover
        :width="320"
        :disabled="PopDisabled || isBlank(_authStore.getUUID())"
        popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; border-radius: 0.5em; padding: 20px;"
    >
        <template #reference>
            <el-avatar
                @click="NaviPrivateHome()"
                :src="
                    isBlank(_authStore.getUUID())
                        ? avatar
                        : _authStore.getAvatar()
                "
                fit="cover"
                :shape="shape"
                :size="size"
                @error="avatarLoadingErrorHandler"
                class="avatar"
                :class="{
                    unknown: user_unknown,
                    offline: user_offline,
                    online: user_online,
                    ingame: user_ingame,
                }"
            >
            </el-avatar>
        </template>
        <template #default>
            <wtu-booster-list
                :booster="_authStore.getUserBooster()"
                @toggle="toggleBooster($event)"
                :direction="DIRECTION_ENUM.horizental"
                size="2.7em"
                activeSize="2.7em"
            />

            <div class="lg:display-none">
                <wtu-online-state
                    :tooltipDisabled="true"
                    size="1.8rem"
                    class="status"
                />
            </div>
        </template>
    </el-popover>
</template>

<script setup lang="ts">
import router from '@/router'
import { authStore } from '@/store'
import { isBlank } from '@util/StrUtil'
import { ONLINE_STATUS, DIRECTION_ENUM } from '@composables/enums'
import { UpdateUserBooster } from '@api/account'
const _authStore = authStore()

const user_unknown = computed(() => {
    return isBlank(_authStore.getUUID())
})

const user_offline = computed(() => {
    return _authStore.getOnlineStatus() === ONLINE_STATUS.offline
})

const user_online = computed(() => {
    return _authStore.getOnlineStatus() === ONLINE_STATUS.online
})

const user_ingame = computed(() => {
    return _authStore.getOnlineStatus() === ONLINE_STATUS.online_in_game
})

defineProps({
    shape: {
        type: String,
        default: 'square',
    },
    size: {
        type: Number,
        default: 60,
    },
    avatar: {
        type: String,
        default:
            'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    },
    PopDisabled: {
        type: Boolean,
        default: false,
    },
})

const NaviPrivateHome = () => {
    if (isBlank(_authStore.getUUID())) {
        router.push({ name: 'login' })
        return
    }
    router.push({ name: 'profile' })
}
const toggleBooster = (booster: string) => {
    if (_authStore.hasBooster(booster)) {
        _authStore.removeBooster(booster)
    } else {
        _authStore.setBooster(booster)
    }
    UpdateUserBooster(_authStore.getUserBooster())
}

const avatarLoadingErrorHandler = (e: Event) => {
    console.log(e)
}
</script>

<style lang="scss" scoped>
.avatar {
    cursor: pointer;
}

.avatar.unknown {
    box-shadow: 0 0 0 2px rgba($color: #717171, $alpha: 0.7) inset;
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

.status {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-top: 0.5em;
    margin-top: 0.5em;
    border-top: 1px solid var(--el-border-color);
}
</style>
