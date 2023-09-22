<template>
    <div class="teamset" v-if="_authStore.isLogin()">
        <WtuAvatar :size="40" :PopDisabled="true" />
        <div class="plus" v-if="emptyTeam">
            <RyuSvg name="plus" size="40%" class="icon" />
        </div>
        <div class="teammates" v-else>
            <el-avatar
                shape="sqare"
                class="teammate"
                v-for="teammate in teammates"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { authStore } from '@/store'
const _authStore = authStore()
const teammates = reactive([])
const emptyTeam = computed(() => teammates.length === 0)
</script>

<style lang="scss" scoped>
.teamset {
    display: flex;
    align-items: center;
    .plus {
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 0 0 1px #7d7d7d inset;
        margin-left: 1em;
        border-radius: 0.2em;
        cursor: pointer;
        &:hover {
            box-shadow: 0 0 0 1px var(--el-color-primary) inset;

            .icon {
                opacity: 1;
                color: var(--el-color-primary);
            }
        }

        .icon {
            opacity: 0.4;
        }
    }
    .teammates {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        width: 150px;
        height: 40px;
    }
    .teammate {
        width: 40px;
        height: 40px;
    }
}
</style>
