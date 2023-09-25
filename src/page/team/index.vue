<template>
    <WtuHeader />
    <div class="selections">
        <WtuDifficulty />
    </div>
    <div class="wrapper">
        <div :class="{ wideScreen: wideMode, compactScreen: !wideMode }">
            <div>
                <WtuActivity class="mb-0.75em mt-0.5em" />
                <WtuTeamSet class="center-min-900px" />
            </div>
            <WtuEntries
                :class="{ compactOnly: !wideMode }"
                :scale="wideMode ? 1 : 0.8"
            />
        </div>
        <div class="w-70vw h-100% ma-auto"><RouterView /></div>
    </div>
    <WtuFooter />
</template>

<script setup lang="ts">
import { teamStore, authStore } from '@/store'
import type { TeamListParams } from '@composables/team'
import { RouteRecordName } from 'vue-router'
const _teamStore = teamStore()
const _authStore = authStore()
const route = useRoute()

const wideMode = ref(true)

const param = reactive<TeamListParams>({
    page: 1,
    size: 5,
    server: _authStore.getServer(),
    channel: null,
})

const initLayouts = () => {
    if (document.body.clientWidth < 900) {
        wideMode.value = false
    } else {
        wideMode.value = true
    }
}
window.addEventListener('resize', () => {
    initLayouts()
})

onMounted(() => {
    initLayouts()
    initTeamList(route.name)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', () => {
        initLayouts()
    })
})

onBeforeRouteUpdate((to) => {
    initTeamList(to.name)
})

const initTeamList = (channel: RouteRecordName | undefined | null) => {
    param.channel = channel
    _teamStore.initTeamList(param)
}
</script>

<style lang="scss" scoped>
.selections {
    position: fixed;
    right: 0.75rem;
    top: 50%;
}
.wrapper {
    padding: 1em 2em;
    .wideScreen {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .compactScreen {
        display: flex;
        flex-direction: column-reverse;
        justify-content: center;
        align-items: center;
    }

    .compactOnly {
        margin: 1em 0;
    }
}

@media screen and (max-width: 900px) {
    .center-min-900px {
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>
