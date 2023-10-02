<template>
    <RyuLoading :loading="_teamStore.getTeamListLoading()" class="mt-1em">
        <RyuEmpty iconSize="6em" tip="当前暂无组队信息" :empty="empty">
            <el-card
                class="team animate__animated animate__faster"
                :class="{
                    animate__fadeOutDown:
                        instance.team.isDeleted === DELETE_OR_NOT.DELETE,
                    animate__fadeInUp:
                        instance.team.isDeleted === DELETE_OR_NOT.NOT_DELETE,
                }"
                :key="index"
                v-for="(instance, index) in _teamStore.getTeam()"
            >
                <template #header>
                    <div class="flex-between">
                        <div class="vertical-middle">
                            <el-tag
                                v-if="showChannel"
                                :effect="isDark ? 'plain' : 'dark'"
                            >
                                {{ getChannel(instance.team.channel) }}
                            </el-tag>
                            <span class="ml-5px">
                                {{ instance.team.title }}
                            </span>
                        </div>
                        <div class="text-end">
                            <span class="date">
                                {{ TimePassed(instance.team.updateTime) }}
                            </span>
                            <div
                                class="flex justify-end mt-3px"
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
                                    @click="toggleTeamStatus(instance)"
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
                                    @confirm="
                                        removeTeam(
                                            instance.team.id,
                                            instance.team.server,
                                            instance.team.channel
                                        ),
                                            (instance.team.isDeleted = 1)
                                    "
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
                        </div>
                    </div>
                </template>
                <el-row>
                    <el-col :span="6" v-for="build in instance.members">
                        <wtu-team-member
                            :member="build"
                            @click="
                                isCreator(instance.team.creatorUuid)
                                    ? check(build)
                                    : aqua(instance.team, build)
                            "
                        />
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
                            <span>入队要求</span>
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
                        <ryu-clipboard
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
                        </ryu-clipboard>
                    </el-collapse-item>
                </el-collapse>
                <ryu-clipboard
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
                </ryu-clipboard>
            </el-card>
        </RyuEmpty>
    </RyuLoading>
</template>

<script setup lang="ts">
import { response } from '@/composables/types'
import {
    ToggleTeamStatus,
    RemoveTeam,
    BroadcastDeleteTeam,
    BroadcastToggleTeamStatus,
    JoinTeam,
} from '@api/team'
import { teamStore, authStore } from '@/store'
import { isDark } from '@composables/theme'
import { TimePassed } from '@util/DateUtil'
import { DELETE_OR_NOT } from '@/composables/enums'
import type {
    TeamBO,
    TeamMemberBO,
    JoinTeamDTO,
    TeamVO,
} from '@/composables/team'

const route = useRoute()

defineProps({
    showChannel: {
        type: Boolean,
        default: true,
    },
})

const _teamStore = teamStore()
const _authStore = authStore()
const Router = useRouter()

const empty = computed(() => {
    if (_teamStore.getTeam() !== undefined) {
        return _teamStore.getTeam().length === 0
    } else {
        return false
    }
})

const getChannel = (routeName: string) => {
    return Router.getRoutes().filter((item) => item.name === routeName)[0].meta
        .forehead
}

const activeNames = ref<string>()
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

const toggleTeamStatus = async (instance: TeamVO) => {
    loading.status = true
    instance.team.status = instance.team.status ? 0 : 1
    const result = (await ToggleTeamStatus({
        teamId: instance.team.id,
        status: instance.team.status,
    })) as response<string>
    if (result.success) {
        BroadcastToggleTeamStatus(instance)
        loading.status = false
        return
    } else {
        loading.status = false
        ElMessage.error(result.message)
    }
}

const removeTeam = async (id: number, server: number, channel: string) => {
    loading.delete = true
    const result = (await RemoveTeam(id)) as response<string>
    if (result.success) {
        loading.delete = false
        if (route.name === 'team') {
            _teamStore.removeTeam(id)
        }
        BroadcastDeleteTeam({
            teamId: id,
            server: server,
            route: channel,
        })
        return
    } else {
        loading.delete = false
        ElMessage.error(result.message)
    }
}

const joinTeamParam: JoinTeamDTO = reactive({
    receiver: '',
    from: {
        uuid: '',
        name: '',
        avatar: '',
        onlineStatus: 0,
        affinityBooster: 0,
        creditBooster: 0,
        resourceBooster: 0,
        resourceDropRateBooster: 0,
        modDropRateBooster: 0,
        accelerator: '',
    },
    team: {
        uuid: '',
        server: 1,
        channel: '',
        creatorUuid: '',
        title: '',
    },
    build: {
        focus: '',
        warframe: {
            en: '',
            cn: '',
        },
    },
})

const check = (build: TeamMemberBO) => {
    console.log('checking' + build)
}

const prepareJoinTeamParma = (team: TeamBO, member: TeamMemberBO): boolean => {
    joinTeamParam.receiver = team.creatorUuid
    joinTeamParam.from = _authStore.getUser()
    joinTeamParam.team = {
        ...team,
    }
    joinTeamParam.build = {
        focus: member.focus,
        warframe: {
            en: member.warframe.en,
            cn: member.warframe.cn,
        },
    }
    return true
}
const aqua = (team: TeamBO, member: TeamMemberBO) => {
    if (
        member.leader ||
        team.creatorUuid === _authStore.getUUID() ||
        member.occupied
    ) {
        return
    }
    prepareJoinTeamParma(team, member)
    JoinTeam(joinTeamParam)
    console.log(joinTeamParam)
    // JoinTeam(joinTeamParam)
    // console.log(_teamStore.getTeam())
}
</script>

<style lang="scss" scoped>
.team {
    margin: 1em 0;
    border-radius: 0.5rem;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    cursor: pointer;
    position: relative;

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
.date {
    font-size: 0.8em;
    color: #909399;
}
</style>
