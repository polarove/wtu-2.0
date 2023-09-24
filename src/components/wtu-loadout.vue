<template>
    <div class="loadouts">
        <el-popover placement="bottom" :width="150" trigger="hover">
            <template #reference>
                <div
                    class="loadout"
                    @mouseenter="toggleAvatar()"
                    @mouseleave="toggleAvatar()"
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
                <span>
                    {{ props.teammate.user.name }}
                </span>
                <span>{{ props.teammate.user.level }}</span>
            </div>
            <div v-else>
                <span>等待加入</span>
            </div>
            <slot name="loadout"> </slot>
        </el-popover>
    </div>
</template>

<script setup lang="ts">
const IMAGE_ORIGIN = import.meta.env.VITE_APP_IMAGE_ORIGIN as string
import { type TeamMate } from '@/composables/types'
import { isNotBlank } from '@/util/StrUtil'

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
</script>

<style lang="scss" scoped>
.loadouts {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2) inset;
    border-radius: 3px;
    user-select: none;

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
</style>
