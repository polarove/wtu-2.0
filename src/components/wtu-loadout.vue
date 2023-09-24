<template>
    <div class="loadouts">
        <el-popover
            placement="bottom"
            :width="150"
            trigger="hover"
            :disabled="disabled"
        >
            <template #reference>
                <div
                    class="loadout"
                    @mouseenter="toggleAvatar()"
                    @mouseleave="toggleAvatar()"
                    @click="$emit('emitCreateTeam'), disablePopover()"
                >
                    <div
                        class="avatar warframe"
                        :style="{
                            display: mouseEnter ? 'inline-block' : 'none',
                        }"
                    >
                        <el-image
                            shape="sqare"
                            :src="warframe_avatar"
                            :style="{
                                width: size,
                                height: size,
                            }"
                        ></el-image>
                    </div>
                    <div
                        class="avatar user"
                        v-if="isNotBlank(user_avatar)"
                        :style="{
                            display: mouseEnter ? 'none' : 'inline-block',
                        }"
                    >
                        <el-image
                            shape="sqare"
                            :src="user_avatar"
                            :style="{
                                width: size,
                                height: size,
                            }"
                        ></el-image>
                    </div>
                    <div
                        class="avatar plus"
                        v-else
                        :style="{
                            display: mouseEnter ? 'none' : 'inline-block',
                        }"
                    >
                        <div class="i-ep:plus icon"></div>
                    </div>
                </div>
            </template>
            <div class="flex-between" v-if="isNotBlank(teammate.user.uuid)">
                <span @click="toggleUserInfoDialog" class="name">
                    {{ props.teammate.user.name }}
                </span>
                <span>{{ props.teammate.user.level }}</span>
            </div>
            <div v-else>
                <span>等待玩家加入</span>
            </div>
            <slot name="loadout"> </slot>
        </el-popover>
    </div>
</template>

<script setup lang="ts">
const IMAGE_ORIGIN = import.meta.env.VITE_APP_IMAGE_ORIGIN as string
import { type TeamMate } from '@/composables/types'
import { isNotBlank } from '@/util/StrUtil'
const disabled = ref(false)
const disablePopover = () => {
    disabled.value = true
}
const enablePopover = () => {
    disabled.value = false
}

const props = defineProps({
    teammate: {
        type: Object as PropType<TeamMate>,
        default: '一般路过Tenno',
    },
    size: {
        type: String,
        default: '2.5em',
    },
})

const mouseEnter = ref(false)
const toggleAvatar = () => {
    mouseEnter.value = !mouseEnter.value
}

const warframe_avatar = computed(() => {
    return IMAGE_ORIGIN + '/warframe/' + props.teammate.warframe.en + '.webp'
})

const user_avatar = computed(() => {
    return props.teammate.user.avatar
})
const toggleUserInfoDialog = () => {
    console.log('toggleUserInfoDialog')
}
defineExpose({
    enablePopover,
})
</script>

<style lang="scss" scoped>
.loadouts {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 4px;
    user-select: none;
    border: 1px solid var(--el-border-color-light);
    &:hover {
        border-color: var(--el-color-primary);
    }

    .loadout {
        position: relative;

        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;

        .avatar {
            position: absolute;
            height: 100%;
            width: 100%;
        }

        .warframe {
            z-index: 1;
        }

        .user {
            display: none;
            z-index: -1;
        }

        .plus {
            text-align: center;
            z-index: 1;
            line-height: 35px;
            vertical-align: middle;
            .icon {
                font-size: 1.5em;
                color: gray;
                opacity: 0.5;
            }
        }
    }
}

.name {
    cursor: pointer;
    user-select: none;
    &:hover {
        color: var(--el-color-primary);
    }
}
</style>
