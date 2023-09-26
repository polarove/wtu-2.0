<template>
    <RyuLoading :loading="_teamStore.getLoading()" class="mt-1em">
        <RyuEmpty
            iconSize="6em"
            tip="当前暂无组队信息"
            :empty="empty"
            class="mt-1em"
        >
            <el-card
                class="team"
                v-for="(instance, index) in _teamStore.getTeam()"
            >
                <template #header>
                    <div class="flex-between">
                        <div class="vertical-middle">
                            <el-tag v-if="showChannel" effect="dark">
                                {{ getChannel(instance.team.channel) }}
                            </el-tag>
                            <span class="ml-5px">
                                {{ instance.team.title }}
                            </span>
                        </div>
                        <div
                            class="invisible-min-900px flex"
                            v-if="isCreator(instance.team.creatorUuid)"
                        >
                            <el-button
                                v-if="
                                    instance.team.creatorUuid ===
                                    _authStore.getUUID()
                                "
                                :loading="loading.status"
                                size="small"
                                :type="
                                    isPublic(
                                        instance.team.creatorUuid,
                                        instance.team.status
                                    )
                                        ? 'success'
                                        : 'danger'
                                "
                                @click="
                                    toggleTeamStatus(
                                        instance.team.uuid,
                                        isPublic(
                                            instance.team.creatorUuid,
                                            instance.team.status
                                        )
                                            ? 0
                                            : 1
                                    )
                                "
                            >
                                <div
                                    :class="
                                        isPublic(
                                            instance.team.creatorUuid,
                                            instance.team.status
                                        )
                                            ? 'i-ep:view'
                                            : 'i-ep:hide'
                                    "
                                ></div>
                            </el-button>
                            <el-popconfirm
                                title="删除？"
                                width="40"
                                confirm-button-text="是"
                                cancel-button-text="不了"
                                v-if="isCreator(instance.team.creatorUuid)"
                                @confirm="removeTeam(instance.team.id)"
                                :hide-icon="true"
                                confirm-button-type="default"
                            >
                                <template #reference>
                                    <el-button size="small">
                                        <div class="i-ep:close"></div>
                                    </el-button>
                                </template>
                            </el-popconfirm>
                        </div>

                        <div class="invisible-max-900px">
                            <el-dropdown
                                :hide-on-click="false"
                                v-if="isCreator(instance.team.creatorUuid)"
                            >
                                <span class="i-ep:arrow-down"> </span>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item>
                                            <el-button
                                                v-if="
                                                    instance.team
                                                        .creatorUuid ===
                                                    _authStore.getUUID()
                                                "
                                                :loading="loading.status"
                                                size="small"
                                                :type="
                                                    isPublic(
                                                        instance.team
                                                            .creatorUuid,
                                                        instance.team.status
                                                    )
                                                        ? 'success'
                                                        : 'danger'
                                                "
                                                @click="
                                                    toggleTeamStatus(
                                                        instance.team.uuid,
                                                        isPublic(
                                                            instance.team
                                                                .creatorUuid,
                                                            instance.team.status
                                                        )
                                                            ? 0
                                                            : 1
                                                    )
                                                "
                                            >
                                                <div
                                                    :class="
                                                        isPublic(
                                                            instance.team
                                                                .creatorUuid,
                                                            instance.team.status
                                                        )
                                                            ? 'i-ep:view'
                                                            : 'i-ep:hide'
                                                    "
                                                ></div> </el-button
                                        ></el-dropdown-item>
                                        <el-dropdown-item>
                                            <el-popconfirm
                                                title="删除？"
                                                width="40"
                                                confirm-button-text="是"
                                                cancel-button-text="不了"
                                                v-if="
                                                    isCreator(
                                                        instance.team
                                                            .creatorUuid
                                                    )
                                                "
                                                @confirm="
                                                    removeTeam(instance.team.id)
                                                "
                                                :hide-icon="true"
                                                confirm-button-type="default"
                                            >
                                                <template #reference>
                                                    <el-button size="small">
                                                        <div
                                                            class="i-ep:close"
                                                        ></div>
                                                    </el-button>
                                                </template>
                                            </el-popconfirm>
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                        </div>
                    </div>
                </template>
                <el-row>
                    <el-col :span="6" v-for="build in instance.members">
                        <WtuTeamMember :member="build"> </WtuTeamMember>
                    </el-col>
                </el-row>
                <el-collapse
                    class="mt-1"
                    v-model="activeNames"
                    v-if="instance.requirements.length > 0"
                    accordion
                >
                    <el-collapse-item :name="index">
                        <template #title>
                            <span class="font-bold">
                                {{ instance.requirements.length }}&nbsp;
                            </span>
                            <span> 入队要求 </span>
                        </template>
                        <div
                            v-for="requirement in instance.requirements"
                            class="requirement"
                        >
                            <span class="type">
                                {{ requirement.type }}&nbsp;&nbsp;</span
                            >
                            <span class="content">
                                {{ requirement.content }}
                            </span>
                        </div>
                        <RyuClipboard
                            :content="
                                instance.members.find((member) => member.leader)
                                    ?.user.name
                            "
                            prefix="/join"
                            icon="i-ep:document"
                            checked="i-ep:document-checked"
                        >
                            <template #append>
                                <div
                                    class="i-ep:chat-dot-square hover-color-blue ml-5px text-size-[1.4em]"
                                ></div>
                            </template>
                        </RyuClipboard>
                    </el-collapse-item>
                </el-collapse>
                <RyuClipboard
                    v-else
                    :content="
                        instance.members.find((member) => member.leader)?.user
                            .name
                    "
                    prefix="/join"
                    icon="i-ep:document"
                    checked="i-ep:document-checked"
                    fontSize="0.8em"
                >
                    <template #append>
                        <div
                            class="i-ep:chat-dot-square hover-color-blue ml-5px text-size-[1.4em]"
                        ></div>
                    </template>
                </RyuClipboard>
            </el-card>
        </RyuEmpty>
    </RyuLoading>
</template>

<script setup lang="ts">
import { response } from '@/composables/types'
import { ToggleTeamStatus, RemoveTeam } from '@api/team'
import { teamStore, authStore } from '@/store'
defineProps({
    showChannel: {
        type: Boolean,
        default: true,
    },
})
const _teamStore = teamStore()
const _authStore = authStore()
const route = useRouter()
const getChannel = (routeName: string) => {
    return route.getRoutes().filter((item) => item.name === routeName)[0].meta
        .forehead
}

const activeNames = ref<string>()
const empty = ref<boolean>(false)
const loading = reactive({
    delete: false,
    status: false,
})

const isPublic = (uuid: string, status: number) => {
    return _authStore.getUser().uuid === uuid && status
}
const isCreator = (uuid: string) => {
    return _authStore.getUser().uuid === uuid
}

const toggleTeamStatus = async (uuid: string, status: number) => {
    loading.status = true
    _teamStore.toggleTeamStatus(uuid, status)
    let param = {
        uuid: uuid,
        status: status,
    }
    const result = (await ToggleTeamStatus(param)) as response<string>
    if (result.success) {
        loading.status = false
        return
    } else {
        loading.status = false
        _teamStore.toggleTeamStatus(uuid, status ? 0 : 1)
        ElMessage.error(result.message)
    }
}
const removeTeam = async (id: number) => {
    loading.delete = true
    const result = (await RemoveTeam(id)) as response<string>
    if (result.success) {
        loading.delete = false
        _teamStore.removeTeam(id)
        return
    } else {
        loading.delete = false
        ElMessage.error(result.message)
    }
}

watchEffect(() => {
    if (_teamStore.getTeam() !== undefined) {
        empty.value = _teamStore.getTeam().length === 0
    }
})
</script>

<style lang="scss" scoped>
.team {
    margin: 1em 0;
    width: 100%;
    border-radius: 0.5rem;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    cursor: pointer;

    .requirement {
        user-select: none;
        .type {
            width: 4em;
            text-align: right;
            margin-right: 0.5em;
        }
        .content {
            flex: 1;
        }
    }

    .requirement:nth-child(n + 2) {
        margin-top: 0.3em;
    }
}
</style>
