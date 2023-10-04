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
                            <ryu-empty :empty="group.applications.length === 0">
                                <el-row>
                                    <el-col
                                        :span="6"
                                        v-for="application in group.applications"
                                        class="animate__animated animate__faster"
                                        :class="{
                                            animate__bounceInRight:
                                                !isEmptyGroup,
                                        }"
                                    >
                                        <div class="flex-col items-center">
                                            <el-popover
                                                placement="bottom"
                                                trigger="hover"
                                                width="auto"
                                            >
                                                <template #reference>
                                                    <div
                                                        class="flex-col justify-center items-center"
                                                    >
                                                        <wtu-warframe
                                                            :class="{
                                                                active: isSeleted(
                                                                    application
                                                                        .from
                                                                        .uuid
                                                                ),
                                                            }"
                                                            @mouseenter="
                                                                toggleSelect(
                                                                    application
                                                                        .from
                                                                        .uuid,
                                                                    application
                                                                )
                                                            "
                                                            @mouseleave="
                                                                toggleSelect(
                                                                    application
                                                                        .from
                                                                        .uuid,
                                                                    application
                                                                )
                                                            "
                                                            :modelValue="
                                                                application
                                                                    .build
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
                                                                    ),
                                                                        (application.status =
                                                                            APPLICATION_STATUS.accepted as keyof typeof APPLICATION_STATUS)
                                                                "
                                                                ><div
                                                                    class="i-ep:check"
                                                                ></div> </el-button
                                                            ><el-button
                                                                size="small"
                                                                :type="
                                                                    application.status ===
                                                                    APPLICATION_STATUS.rejected
                                                                        ? 'info'
                                                                        : 'default'
                                                                "
                                                                @click="
                                                                    rejectApplication(
                                                                        application
                                                                    ),
                                                                        (application.status =
                                                                            APPLICATION_STATUS.rejected as keyof typeof APPLICATION_STATUS)
                                                                "
                                                            >
                                                                <div
                                                                    class="i-ep:close"
                                                                ></div
                                                            ></el-button>
                                                        </div>
                                                    </div>
                                                </template>
                                                <div class="flex-col">
                                                    <div
                                                        class="flex-between items-center"
                                                    >
                                                        <div
                                                            class="select-none text-size-[1.1em] font-bold cursor-pointer hover-color-blue"
                                                        >
                                                            {{
                                                                application.from
                                                                    .name
                                                            }}
                                                        </div>

                                                        <wtu-focus
                                                            :name="
                                                                application
                                                                    .build.focus
                                                            "
                                                            size="2em"
                                                        />
                                                    </div>
                                                    <div class="pt-5px pb-5px">
                                                        {{
                                                            application.from
                                                                .accelerator
                                                        }}
                                                    </div>
                                                    <wtu-booster-list
                                                        :booster="
                                                            application.from
                                                                .booster
                                                        "
                                                        size="2em"
                                                        active-size="2em"
                                                    />
                                                </div>
                                            </el-popover>
                                        </div>
                                    </el-col>
                                </el-row>
                            </ryu-empty>
                            <ryu-clipboard
                                v-for="item in selected"
                                :content="item.name"
                                prefix="/join"
                                :ref="(el:any)=> el && el.copy()"
                                @copied="broadcastInvite(group, item.uuid)"
                            >
                            </ryu-clipboard>
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
import type { ApplicationDTO, ApplicationGroup } from '@/composables/team'
import { layoutStore, teamStore } from '@/store'
import { boosters } from '@/composables/booster'
import { BOOSTER_STATUS, APPLICATION_STATUS } from '@/composables/enums'
import { UserBooster } from '@/composables/user'
const _layoutStore = layoutStore()
const _teamStore = teamStore()
const visible = ref<boolean>(false)
const loading = _teamStore.getApplicationGroupLoading()
const groups: ComputedRef<Array<ApplicationGroup>> = computed(() => {
    return _teamStore.getApplicationGroups()
})
const groupLength = computed(() => groups.value.length)
const isEmptyGroup = computed(() => groupLength.value === 0)
interface dsdsd {
    uuid: string
    name: string
}
const selected = ref<dsdsd[]>([])
const isSeleted = (uuid: string): boolean => {
    return selected.value.some((item) => item.uuid === uuid)
}
const toggleSelect = (from: string, application: ApplicationDTO) => {
    isSeleted(from) ? removeBooster(application) : addBooster(application)
}

const addBooster = (application: ApplicationDTO) => {
    let uuid = application.team.uuid
    let from = application.from.uuid
    if (isSeleted(from)) {
        return
    }
    let name: string = application.from.name
    let booster: UserBooster = application.from.booster
    _teamStore.addMatrixColumnForGroup(uuid, booster, (result: boolean) => {
        if (result) {
            _teamStore.updateGroupBooster(uuid)
            selected.value.push({
                uuid: from,
                name: name,
            })
        }
    })
}

const removeBooster = (application: ApplicationDTO) => {
    let uuid = application.team.uuid
    let name = application.from.name
    let from = application.from.uuid
    if (!isSeleted(from)) {
        return
    }
    let booster: UserBooster = application.from.booster
    _teamStore.removeMatrixColumnForGroup(uuid, booster, (result: boolean) => {
        if (result) {
            _teamStore.updateGroupBooster(uuid)
            selected.value.splice(
                selected.value.indexOf({ uuid: from, name: name }),
                1
            )
        }
    })
}

const invite = (application: ApplicationDTO) => {
    let name = application.from.name
    let from = application.from.uuid
    if (!isSeleted(from)) {
        selected.value.push({
            uuid: from,
            name: name,
        })
    }
}
const rejectApplication = (application: ApplicationDTO) => {
    let uuid = application.team.uuid
    let name = application.from.name
    let from = application.from.uuid
    selected.value.splice(selected.value.indexOf({ uuid: from, name: name }), 1)
    _teamStore.removeApplication(uuid, application)
}
const broadcastInvite = (ApplicationGroup: ApplicationGroup, uuid: string) => {
    console.log(ApplicationGroup, uuid)
}
</script>

<style lang="scss" scoped>
.active {
    transform: scale(1.05);

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

.options > * {
    margin: 0 !important;
}
</style>
