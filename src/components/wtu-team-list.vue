<template>
    <RyuEmpty
        iconSize="6em"
        tip="当前暂无组队信息"
        :empty="_teamStore.isEmpty()"
    >
        <el-card class="team" v-for="instance in TeamList">
            <template #header>
                {{ instance.team.title }}
            </template>
            <div></div>
        </el-card>
    </RyuEmpty>
</template>

<script setup lang="ts">
import { teamStore } from '@/store'
import { storeToRefs } from 'pinia'

const _teamStore = teamStore()

const { TeamList } = storeToRefs(_teamStore)
console.log(TeamList.value)
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
