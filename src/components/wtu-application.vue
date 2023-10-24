<template>
    <div class="c-p hover-color-blue">
        <el-badge
            @click="visible = true"
            :value="lengthInTotal"
            :hidden="bothEmpty"
            :max="99"
            type="warning"
        >
            <span class="i-ant-design:user-switch-outlined"></span>
        </el-badge>

        <el-drawer
            append-to-body
            v-model="visible"
            :size="_layoutStore.isWide() ? '60%' : '100%'"
        >
            <template #header>
                <div class="vertical-middle panels">
                    <el-badge
                        :value="applicationLength"
                        type="primary"
                        :hidden="isEmptyGroup"
                        :max="99"
                    >
                        <span
                            @click="_teamStore.setPanel(true)"
                            class="option"
                            :class="{ active: panel, inactive: !panel }"
                            >入队申请</span
                        >
                    </el-badge>
                    <span>&nbsp;/&nbsp;</span>
                    <el-badge
                        :value="resultLength"
                        type="primary"
                        :hidden="isEmptyResult"
                        :max="99"
                    >
                        <span
                            class="option"
                            :class="{ active: !panel, inactive: panel }"
                            @click="_teamStore.setPanel(false)"
                        >
                            申请结果
                        </span>
                    </el-badge>
                </div>
            </template>
            <ryu-loading :loading="loading">
                <ryu-empty :empty="whichIsEmpty">
                    <div v-for="group in groups" v-if="panel" class="wrapper">
                        <el-card shadow="hover">
                            <template #header>
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
                                <div>
                                    {{ group.title }}
                                </div>
                            </template>
                            <ryu-empty :empty="group.applications.length === 0">
                                <el-row>
                                    <el-col
                                        :span="4"
                                        v-for="application in group.applications"
                                        class="animate__animated animate__faster"
                                        :class="{
                                            animate__bounceInRight:
                                                !isEmptyGroup,
                                        }"
                                    >
                                        <el-popover
                                            placement="bottom"
                                            trigger="hover"
                                            width="auto"
                                        >
                                            <template #reference>
                                                <div
                                                    class="flex-col justify-center items-center"
                                                >
                                                    <div
                                                        class="pt-5px pb-5px font-size-sm color-gray"
                                                    >
                                                        {{
                                                            application.from
                                                                .accelerator
                                                        }}
                                                    </div>
                                                    <wtu-warframe
                                                        :class="{
                                                            active: isSeleted(
                                                                application.from
                                                                    .uuid
                                                            ),
                                                        }"
                                                        @mouseenter="
                                                            addBooster(
                                                                application
                                                            )
                                                        "
                                                        @mouseleave="
                                                            removeBooster(
                                                                application
                                                            )
                                                        "
                                                        :modelValue="
                                                            application.build
                                                                .warframe
                                                        "
                                                        :showName="false"
                                                    />
                                                    <div class="options">
                                                        <el-button
                                                            :type="
                                                                application.status ===
                                                                APPLICATION_STATUS.accepted
                                                                    ? 'success'
                                                                    : 'default'
                                                            "
                                                            size="small"
                                                            @click="
                                                                invite(
                                                                    application
                                                                )
                                                            "
                                                        >
                                                            <div
                                                                class="i-ep:check"
                                                            ></div>
                                                        </el-button>
                                                        <el-button
                                                            size="small"
                                                            :type="
                                                                application.status ===
                                                                APPLICATION_STATUS.rejected
                                                                    ? 'info'
                                                                    : 'default'
                                                            "
                                                            @click="
                                                                reject(
                                                                    application
                                                                )
                                                            "
                                                        >
                                                            <div
                                                                class="i-ep:close"
                                                            ></div>
                                                        </el-button>
                                                    </div>
                                                </div>
                                            </template>
                                            <div class="flex-col">
                                                <div
                                                    class="flex-between items-center"
                                                >
                                                    <div
                                                        @click="
                                                            inviteMessage(
                                                                application.team
                                                                    .title,
                                                                application.from
                                                                    .name
                                                            )
                                                        "
                                                        class="select-none text-size-[1.1em] font-bold cursor-pointer hover-color-blue"
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
                                    </el-col>
                                </el-row>
                            </ryu-empty>
                        </el-card>
                    </div>
                    <div v-for="result in resultList" v-else class="wrapper">
                        <el-card shadow="hover">
                            <el-row>
                                <el-col :span="23">
                                    {{ result.team.title }}
                                </el-col>
                                <el-col :span="1">
                                    <ryu-result-icon
                                        v-if="accepted(result.status)"
                                        class="accepted"
                                    >
                                        <span class="i-ep:check c-p"></span>
                                    </ryu-result-icon>
                                    <ryu-result-icon
                                        v-if="rejected(result.status)"
                                        class="rejected"
                                    >
                                        <span class="i-ep:close c-p"></span>
                                    </ryu-result-icon>
                                </el-col>
                            </el-row>
                            <ryu-clipboard
                                v-if="accepted(result.status)"
                                :content="result.receiver.name"
                                prefix="/join"
                            >
                            </ryu-clipboard>
                        </el-card>
                    </div>
                </ryu-empty>
            </ryu-loading>
            <template #footer>
                <div class="flex-between">
                    <ryu-sponsor />
                    <el-button
                        @click="
                            panel
                                ? _teamStore.clearApplicationGroup()
                                : _teamStore.clearResultList()
                        "
                    >
                        清空
                    </el-button>
                </div>
            </template>
        </el-drawer>
    </div>
</template>

<script setup lang="ts">
import type { ApplicationDTO, ApplicationGroup } from '@/composables/team'
import { layoutStore, teamStore } from '@/store'
import { boosters } from '@/composables/booster'
import { BOOSTER_STATUS } from '@/composables/enums'
import { APPLICATION_STATUS } from '@composables/wss'
import { UserBooster } from '@/composables/user'
import { ApplicationResult } from '@api/team'
import { authStore } from '@/store'

const accepted = (type: string) => {
    return type === APPLICATION_STATUS.accepted
}

const rejected = (type: string) => {
    return type === APPLICATION_STATUS.rejected
}

const _layoutStore = layoutStore()
const _authStore = authStore()

const panel = computed(() => {
    return _teamStore.getPanel()
})

const _teamStore = teamStore()

const visible = ref<boolean>(false)

const loading = _teamStore.getApplicationGroupLoading()

const groups: ComputedRef<Array<ApplicationGroup>> = computed(() => {
    return _teamStore.getApplicationGroups()
})

const applicationLength = computed(() => {
    return groups.value.length
})

const isEmptyGroup = computed(() => applicationLength.value === 0)

interface dsdsd {
    uuid: string
    name: string
}

const selected = reactive<dsdsd[]>([])

const whichIsEmpty = computed(() => {
    return panel.value ? isEmptyGroup.value : isEmptyResult.value
})

const lengthInTotal = computed(() => {
    return applicationLength.value + resultLength.value
})

const bothEmpty = computed(() => {
    return isEmptyGroup.value && isEmptyResult.value
})

const isSeleted = (uuid: string): boolean => {
    return selected.some((item) => item.uuid === uuid)
}

const addBooster = (application: ApplicationDTO) => {
    if (application.status !== APPLICATION_STATUS.pending) return
    let uuid = application.team.uuid
    let booster: UserBooster = application.from.booster
    _teamStore.addMatrixColumnForGroup(uuid, booster, (result: boolean) => {
        if (result) {
            _teamStore.updateGroupBooster(uuid)
        }
    })
}

const removeBooster = (application: ApplicationDTO) => {
    if (application.status !== APPLICATION_STATUS.pending) return
    let uuid = application.team.uuid
    let booster: UserBooster = application.from.booster
    _teamStore.removeMatrixColumnForGroup(uuid, booster, (result: boolean) => {
        if (result) {
            _teamStore.updateGroupBooster(uuid)
        }
    })
}

const invite = (application: ApplicationDTO) => {
    if (application.status === APPLICATION_STATUS.pending) {
        addBooster(application)
        application.status =
            APPLICATION_STATUS.accepted as keyof typeof APPLICATION_STATUS
        application.receiver.name = _authStore.getName()
        ApplicationResult(application)
        inviteMessage(application.team.title, application.from.name)
        return
    }
}

const reject = (application: ApplicationDTO) => {
    if (application.status === APPLICATION_STATUS.pending) {
        application.status =
            APPLICATION_STATUS.rejected as keyof typeof APPLICATION_STATUS
        application.receiver.name = _authStore.getName()
        application.receiver.avatar = _authStore.getAvatar()
        ApplicationResult(application)
    }
    _teamStore.removeApplication(application)
}

const resultList: ComputedRef<Array<ApplicationDTO>> = computed(() => {
    return _teamStore.getApplicationResultList()
})

const resultLength: ComputedRef<number> = computed(
    () => resultList.value.length
)

const isEmptyResult: ComputedRef<boolean> = computed(
    () => resultLength.value === 0
)

const inviteMessage = (title: string, name: string) => {
    navigator.clipboard.writeText(
        '/w ' + name + ' ' + '加入我的队伍吧：' + title + ' (warframe.team.up)'
    )
}
</script>

<style lang="scss" scoped>
.panels {
    .option {
        cursor: pointer;
    }

    .option.active {
        color: var(--el-color-primary);

        &:hover {
            color: var(--el-color-primary);
        }
    }

    .option.inactive {
        color: var(--el-color-secondary);

        &:hover {
            color: var(--el-color-primary);
        }
    }
}

.wrapper {
    .accepted {
        background-color: var(--el-color-success);
        color: var(--el-color-white);
    }

    .rejected {
        background-color: var(--el-color-danger);
        color: var(--el-color-white);
    }
}

.wrapper:nth-child(n + 2) {
    margin-top: 1em;
}

.options > * {
    margin: 0 !important;
}
</style>
