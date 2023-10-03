<template>
    <div>
        <el-badge
            :value="_teamStore.getApplicationGroup().length"
            :hidden="_teamStore.getApplicationGroup().length === 0"
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
            <template #header>
                <div class="vertical-middle">
                    <span class="i-ep:info-filled icon"></span>
                    <span class="color-gray">入队申请只保存10分钟</span>
                </div>
            </template>
            <ryu-loading :loading="loading">
                <ryu-empty :empty="empty">
                    <div v-for="group in _teamStore.getApplicationGroup()">
                        <el-card shadow="hover">
                            <template #header>
                                <div class="flex-between">
                                    <div>
                                        {{ group.title }}
                                    </div>
                                    <div>
                                        <wtu-booster
                                            size="2.3em"
                                            active-size="2.3em"
                                            class="booster"
                                            v-for="(booster, index) in boosters"
                                            :key="index"
                                            :src="
                                                group.booster[booster.en]
                                                    ? booster.valid
                                                    : booster.invalid
                                            "
                                            :active="
                                                group.booster[booster.en] ===
                                                BOOSTER_STATUS.ACTIVE
                                            "
                                        />
                                    </div>
                                </div>
                            </template>
                            <el-row>
                                <el-col
                                    :span="6"
                                    v-for="application in group.applications"
                                >
                                    <div class="flex-col">
                                        <wtu-warframe
                                            :modelValue="
                                                application.build.warframe
                                            "
                                            :showName="false"
                                        />
                                        <div
                                            className="display_none_block-900-1920"
                                        >
                                            {{ application.from.name }}
                                        </div>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-card>
                    </div>
                </ryu-empty>
            </ryu-loading>
            <template #footer>
                <div class="flex-between">
                    <ryu-sponsor />
                    <el-button @click="_teamStore.clearApplicationGroup()">
                        清空
                    </el-button>
                </div>
            </template>
        </el-drawer>
    </div>
</template>

<script setup lang="ts">
//@ts-nocheck
import type { JoinTeamDTO, ApplicationGroup } from '@/composables/team'
import { layoutStore, teamStore } from '@/store'
import { boosters } from '@/composables/booster'
import { BOOSTER_STATUS } from '@/composables/enums'
const _layoutStore = layoutStore()
const _teamStore = teamStore()
const visible = ref<boolean>(false)
const loading = _teamStore.getApplicationGroupLoading()
const group: Array<ApplicationGroup> = _teamStore.getApplicationGroup()
const length = computed(() => group.length)
const empty = computed(() => length.value === 0)
const acceptApplication = (application: JoinTeamDTO) => {
    console.log(application)
}
const rejectApplication = (application: JoinTeamDTO) => {
    console.log(application)
}
</script>

<style lang="scss" scoped></style>
