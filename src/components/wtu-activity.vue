<template>
    <div class="tabs flex-between">
        <span
            @click="router.push({ name: 'origin' })"
            class="tab"
            :class="{ active: routes.name === entries.origin }"
        >
            <RyuSvg name="planet" size="1.4em" />
        </span>

        <span v-if="_authStore.getDifficulty()">
            <span
                class="tab"
                @click="touch(activity)"
                :class="{ active: activity.name === routes.name }"
                v-for="(activity, index) in childRoutes"
            >
                <RyuSvg :index="index" :name="activity.name" size="1.4em" />
            </span>
        </span>
        <span v-else>
            <span
                class="tab"
                @click="touch(activity)"
                :class="{ active: activity.name === routes.name }"
                v-for="(activity, index) in easyModeRoutes"
            >
                <RyuSvg :index="index" :name="activity.name" size="1.4em" />
            </span>
        </span>
    </div>
</template>

<script setup lang="ts">
import { authStore } from '@/store'
import entries from '@composables/entries'
import router from '@/router'
const routes = useRoute()
const _authStore = authStore()
const childRoutes = routes.matched
    .find((item) => item.name === 'index')
    ?.children.find((item) => item.name === 'activity')?.children

const easyModeRoutes = childRoutes?.filter((item) => item.name !== 'steelpath')
const touch = (activity: any) => {
    router.push({ name: activity.name })
}
</script>

<style lang="scss" scoped>
.tabs {
    user-select: none;
    .tab {
        cursor: pointer;
        user-select: none;
        font-size: 1.1em;
        text-align: center;
        margin: 0 0.15em;
        &:hover {
            color: var(--el-color-primary);
        }
    }
    .tab {
        > * {
            vertical-align: middle;
        }
    }

    .active {
        color: var(--el-color-primary);
    }
}
</style>
