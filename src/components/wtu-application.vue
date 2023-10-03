<template>
    <div>
        <el-badge
            :value="_teamStore.getApplicationList().length"
            :hidden="_teamStore.getApplicationList().length === 0"
        >
            <span
                class="i-ant-design:user-switch-outlined"
                @click="visible = true"
            ></span>
        </el-badge>

        <el-drawer
            append-to-body
            v-model="visible"
            :size="_layoutStore.isWide() ? '40%' : '100%'"
        >
            <template #header> <div>入队申请列表</div> </template>
            <ryu-loading :loading="loading">
                <ryu-empty :empty="empty">
                    <div v-for="application in _teamStore.getApplicationList()">
                        {{ application }}
                    </div>
                </ryu-empty>
            </ryu-loading>
            <template #footer>
                <div class="flex-between">
                    <ryu-sponsor />
                    <div class="vertical-middle">
                        <span class="i-ep:info-filled icon"></span>
                        <span class="color-gray">入队申请只保存10分钟</span>
                    </div>
                </div>
            </template>
        </el-drawer>
    </div>
</template>

<script setup lang="ts">
import { JoinTeamDTO } from '@/composables/team'
import { layoutStore, teamStore } from '@/store'
const _layoutStore = layoutStore()
const _teamStore = teamStore()
const visible = ref<boolean>(false)
const loading = _teamStore.getApplicationListLoading()
const list: Array<JoinTeamDTO> = _teamStore.getApplicationList()
const length = computed(() => list.length)
const empty = computed(() => length.value === 0)
</script>

<style lang="scss" scoped></style>
