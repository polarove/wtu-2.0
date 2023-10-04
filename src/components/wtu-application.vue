<template>
    <div @click="visible = true">
        <el-badge :value="groupLength" :hidden="isEmptyGroup" type="warning">
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
                <ryu-empty :empty="isEmptyGroup">
                    <div v-for="group in groups">
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
                                    :class="{
                                        animate__bounceInRight: !isEmptyGroup,
                                    }"
                                >
                                    <div class="flex-col items-center">
                                        <el-popover
                                            placement="bottom"
                                            trigger="hover"
                                            width="auto"
                                        >
                                            <template #reference>
                                                <wtu-warframe
                                                    :class="{
                                                        selected:
                                                            selected.includes(
                                                                group.uuid
                                                            ),
                                                    }"
                                                    @click="
                                                        toggleSelect(
                                                            group.uuid,
                                                            application.from
                                                                .booster
                                                        )
                                                    "
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
                                        <div>
                                            {{ application.from.accelerator }}
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
import { layoutStore, teamStore, authStore } from '@/store'
import { boosters } from '@/composables/booster'
import { BOOSTER_STATUS } from '@/composables/enums'
import { UserBooster } from '@/composables/user'
const _layoutStore = layoutStore()
const _teamStore = teamStore()
const _authStore = authStore()
const visible = ref<boolean>(false)
const loading = _teamStore.getApplicationGroupLoading()
const groups: Array<ApplicationGroup> = _teamStore.getApplicationGroups()
const groupLength = computed(() => groups.length)
const isEmptyGroup = computed(() => groupLength.value === 0)

const selected = ref<string[]>([])
const toggleSelect = (uuid: string, booster: UserBooster) => {
    if (selected.value.includes(uuid)) {
        selected.value = selected.value.filter((item) => item !== uuid)
        removeBooster(uuid, booster)
    } else {
        selected.value.push(uuid)
        addBooster(uuid, booster)
    }
}

const addBooster = (uuid: string, booster: UserBooster) => {
    _teamStore.addMatrixColumnForGroup(uuid, booster, (result) => {
        if (result) {
            _teamStore.updateGroupBooster(uuid, booster)
        }
    })
}

const removeBooster = (uuid: string, booster: UserBooster) => {
    _teamStore.removeMatrixColumnForGroup(uuid, booster, (result) => {
        if (result) {
            _teamStore.updateGroupBooster(uuid, booster)
        }
    })
}

const invite = (application: JoinTeamDTO) => {
    console.log(application)
}
const rejectApplication = (application: JoinTeamDTO) => {
    console.log(application)
}
</script>

<style lang="scss" scoped>
.selected {
    transform: scale(1.2);

    &::after {
        content: '✔';
        position: absolute;
        top: -10px;
        right: 0;
        margin: 0;
        padding: 0;
        font-size: 1.3em;
        color: var(--el-color-primary);
    }
}
</style>
