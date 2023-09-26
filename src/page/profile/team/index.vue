<template>
    <div class="w-55vw">
        <WtuTeamList />
    </div>
</template>

<script setup lang="ts">
import type { TeamListParams } from '@/composables/team'
import { teamStore, authStore } from '@/store'
const _teamStore = teamStore()
const _authStore = authStore()
const TeamParams = reactive<TeamListParams>({
    page: 1,
    size: 5,
    server: _authStore.getServer(),
    channel: null,
    uuid: _authStore.getUUID(),
})

onMounted(() => {
    _teamStore.setParam(TeamParams)
    _teamStore.initTeamList()
})
</script>

<style lang="scss" scoped>
.card {
    margin: 1em;
}
</style>
