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
                <WtuBooster :src="'23'" v-for="booster in BoosterEnum.types">
                    <template #img>
                        <img
                            :class="{
                                active: _authStore.hasBooster(booster.type),
                            }"
                            @click="toggleBooster(booster.type)"
                            :src="_authStore.hasBooster(booster.type) ?
                            (booster.Gold.getComment() as string)
                            : (booster.Invalid.getComment() as string)"
                            alt="booster"
                            class="booster-img"
                        />
                    </template>
                </WtuBooster>
            </div>
            <div class="invisible-max-900px">
                <WtuOnlineState :tooltipDisabled="true" size="1.8rem" />
            </div>
        </template>
    </el-popover>
</template>

<script setup lang="ts">
import router from '@/router'
import { authStore } from '@/store'
import { isBlank } from '@util/StrUtil'
import { OnlineStatusEnum, BoosterEnum, ActionEnum } from '@composables/enums'
import { UpdateUserBooster } from '@api/account'
const _authStore = authStore()

const user_unknown = computed(() => {
    return isBlank(_authStore.getUUID())
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

interface UpdateBoosterForm {
    uuid: string
    action: number
    booster: string
}
const UpdateBoosterForm = reactive<UpdateBoosterForm>({
    uuid: _authStore.getUUID(),
    action: 0,
    booster: '',
})
const toggleBooster = async (booster: string) => {
    if (_authStore.hasBooster(booster)) {
        _authStore.removeBooster(booster)
        UpdateBoosterForm.action = ActionEnum.REMOVE
    } else {
        _authStore.addBooster(booster)
        UpdateBoosterForm.action = ActionEnum.ADD
    }
    UpdateBoosterForm.booster = booster
    await UpdateUserBooster(UpdateBoosterForm)
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
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #ebeef5;
    margin-bottom: 7px;
    padding-bottom: 7px;

    .active {
        opacity: 1 !important;
        transform: scale(1.2);
    }
    .booster-img {
        width: 50px;
        margin: 0 5px;
        cursor: pointer;
        opacity: 0.4;

        &:hover {
            opacity: 1;
            transform: scale(1.1);
        }
    }
}
</style>
