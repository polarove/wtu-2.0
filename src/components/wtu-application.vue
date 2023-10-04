<template>
    <div @click="visible = true">
        <el-badge
            :value="_teamStore.getApplicationGroup().length"
            :hidden="_teamStore.getApplicationGroup().length === 0"
            type="warning"
        >
            <span class="i-ant-design:user-switch-outlined"></span>
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
                                    class="animate__animated animate__faster"
                                    :class="{ animate__bounceInRight: !empty }"
                                >
                                    <div class="flex-col items-center">
                                        <el-popover
                                            placement="bottom"
                                            trigger="hover"
                                            width="auto"
                                        >
                                            <template #reference>
                                                <wtu-warframe
                                                    :modelValue="
                                                        application.build
                                                            .warframe
                                                    "
                                                    :showName="false"
                                                />
                                            </template>
                                            <div class="flex-col">
                                                <div
                                                    class="flex-between items-center"
                                                >
                                                    <div
                                                        class="select-none text-size-[1.1em] font-bold cursor-pointer hover-color-blue"
                                                        @click="
                                                            invite(application)
                                                        "
                                                    >
                                                        {{
                                                            application.from
                                                                .name
                                                        }}
                                                    </div>
                                                    <wtu-focus
                                                        :name="
                                                            application.build
                                                                .focus
                                                        "
                                                        size="2em"
                                                    />
                                                </div>
                                                <wtu-booster-list
                                                    :booster="
                                                        application.from.booster
                                                    "
                                                    size="2em"
                                                    active-size="2em"
                                                />
                                            </div>
                                        </el-popover>
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
import { layoutStore, teamStore, authStore } from '@/store'
import { boosters } from '@/composables/booster'
import { BOOSTER_STATUS } from '@/composables/enums'
const _layoutStore = layoutStore()
const _teamStore = teamStore()
const _authStore = authStore()
const visible = ref<boolean>(false)
const loading = _teamStore.getApplicationGroupLoading()
const group: Array<ApplicationGroup> = _teamStore.getApplicationGroup()
const length = computed(() => group.length)
const empty = computed(() => length.value === 0)
const invite = (application: JoinTeamDTO) => {
    console.log(application)
}
const rejectApplication = (application: JoinTeamDTO) => {
    console.log(application)
}
</script>

<style lang="scss" scoped></style>
