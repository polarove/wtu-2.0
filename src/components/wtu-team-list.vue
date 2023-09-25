<template>
    <RyuEmpty
        iconSize="6em"
        tip="当前暂无组队信息"
        :empty="_teamStore.isEmpty()"
    >
        <el-card class="team" v-for="team in _teamStore.getTeam()">
            <template #header>
                {{ team.title }}
            </template>
            <WtuWarframe
                :warframe="build.warframe"
                v-for="build in team.members"
            />
        </el-card>
    </RyuEmpty>
</template>

<script setup lang="ts">
import WtuWarframe from '@/components/wtu-warframe.vue'
import { teamStore } from '@/store'
const _teamStore = teamStore()
</script>

<style lang="scss" scoped>
.team {
    margin: 1em 0;
    height: 100px;
    width: 100%;
    border-radius: 0.5rem;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    cursor: pointer;
}
</style>
