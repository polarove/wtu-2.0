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
import { TeamList, TeamPage } from '@/composables/team'
import { teamStore } from '@/store'
import { GetTeamList } from '@api/team'
import type { response } from '@/composables/types'
const _teamStore = teamStore()
const route = useRoute()

const wideMode = ref(true)

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

const autoRefresh = (interval: number) => {
    setInterval(() => {
        GetTeamList(_teamStore.getParam()).then(
            (res: response<TeamPage> | any) => {
                _teamStore.setTeam(res.data.records as Array<TeamList>)
            }
        )
        console.log('重新获取队伍列表中...')
    }, interval)
}

onMounted(() => {
    initLayouts()
    _teamStore.initTeamList(route.name)
    autoRefresh(1000 * 60 * 10)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', () => {
        initLayouts()
    })
})

onBeforeRouteUpdate((to) => {
    _teamStore.initTeamList(to.name)
})
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
