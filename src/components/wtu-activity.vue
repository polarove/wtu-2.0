<template>
    <div class="tabs flex-between">
        <div v-if="_authStore.getDifficulty()">
            <span
                class="tab"
                @click="touch(activity)"
                :class="{ active: activity.name === routes.name }"
                v-for="(activity, index) in childRoutes"
            >
                <el-badge
                    :value="clients"
                    :hidden="activity.name !== routes.name"
                >
                    <RyuSvg :index="index" :name="activity.name" size="1.4em" />
                </el-badge>
            </span>
        </div>
        <div v-else>
            <span
                class="tab"
                @click="touch(activity)"
                :class="{ active: activity.name === routes.name }"
                v-for="(activity, index) in childRoutes?.filter(
                    (item) => item.name !== 'steelpath'
                )"
            >
                <el-badge
                    :value="clients"
                    :hidden="activity.name !== routes.name"
                >
                    <RyuSvg :index="index" :name="activity.name" size="1.4em" />
                </el-badge>
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { authStore } from '@/store'
import entries from '@composables/entries'
import router from '@/router'
import { RouteRecord } from 'vue-router'
const routes = useRoute()
const _authStore = authStore()

defineProps({
    clients: {
        type: Number,
        default: 0,
    },
})

const childRoutes = routes.matched
    .find((item) => item.name === 'index')
    ?.children.filter((item) => item.path.includes('/team'))
    .filter((item) => {
        if (item.name === 'activity') {
            let origin = routes.matched
                .find((item) => item.redirect == '/team/origin')
                ?.children.find(
                    (item) => item.name === entries.origin
                ) as RouteRecord
            if (item.children?.includes(origin)) {
                return item.children
            } else {
                return item.children?.unshift(origin)
            }
        }
    })[0].children

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
