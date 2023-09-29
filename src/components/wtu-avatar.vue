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
            <div class="booster-list">
                <WtuBooster
                    v-for="(booster, index) in boosters"
                    :key="index"
                    :src="
                        _authStore.getBooster(booster.en)
                            ? booster.valid
                            : booster.invalid
                    "
                    @click="toggleBooster(booster.en)"
                    :active="_authStore.hasBooster(booster.en)"
                    size="2.7em"
                    activeSize="2.5em"
                >
                </WtuBooster>
            </div>
            <div class="flex">
                <div class="invisible-max-900px inline-block">
                    <WtuOnlineState :tooltipDisabled="true" size="1.8rem" />
                </div>
            </div>
        </template>
    </el-popover>
</template>

<script setup lang="ts">
import router from '@/router'
import { authStore } from '@/store'
import { isBlank } from '@util/StrUtil'
import { OnlineStatusEnum } from '@composables/enums'
import { boosters } from '@composables/booster'
import { UpdateUserBooster } from '@api/account'
const _authStore = authStore()

const user_unknown = computed(() => {
    return isBlank(_authStore.getUUID())
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

const toggleBooster = async (booster: string) => {
    if (_authStore.hasBooster(booster)) {
        _authStore.removeBooster(booster)
    } else {
        _authStore.setBooster(booster)
    }
    await UpdateUserBooster(_authStore.getUser())
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

.booster-list {
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid #ebeef5;
    margin-bottom: 7px;
    padding-bottom: 7px;
}
</style>
