<template>
    <div class="tools">
        <RyuSvg
            class="tool"
            name="steelpath"
            size="2rem"
            :class="{ invisible: !_authStore.getDifficulty() }"
            @click="updateDifficulty(false)"
        />
        <RyuSvg
            class="tool"
            name="origin"
            size="2rem"
            :class="{ invisible: _authStore.getDifficulty() }"
            @click="updateDifficulty(true)"
        />
    </div>
</template>

<script setup lang="ts">
import { authStore, teamStore } from '@/store'
import router from '@/router'
const _authStore = authStore()
const _teamStore = teamStore()
const route = useRoute()
const updateDifficulty = (difficulty: boolean) => {
    _authStore.setDifficulty(difficulty)
    if (difficulty) {
        router.push({ name: 'steelpath' })
        _teamStore.initTeamList(route.name)
    } else {
        router.push({ name: 'origin' })
    }
}
</script>

<style lang="scss" scoped>
.tools {
    display: flex;
    flex-direction: column;
    align-items: center;
    .tool {
        cursor: pointer;
        &:hover {
            color: var(--el-color-primary);
        }
    }
    .tool.invisible {
        display: none;
    }
}
</style>
