<template>
    <RyuLoading :loading="_teamStore.getLoading()">
        <RyuEmpty
            iconSize="6em"
            tip="当前暂无组队信息"
            :empty="_teamStore.isEmpty()"
        >
            <el-card
                class="team"
                v-for="(instance, index) in _teamStore.getTeam()"
            >
                <template #header>
                    <div class="flex-between">
                        <span>{{ instance.team.title }}</span>
                        <div>
                            <el-button
                                size="small"
                                type="success"
                                v-if="copyHistory.includes(instance.team.id)"
                            >
                                <span
                                    class="i-ep:document-checked"
                                    @click="
                                        joinTeam(
                                            instance.team.id,
                                            instance.members.find(
                                                (member) => member.leader
                                            )?.user.name
                                        )
                                    "
                                ></span>
                            </el-button>
                            <el-button
                                size="small"
                                v-else
                                @click="
                                    joinTeam(
                                        instance.team.id,
                                        instance.members.find(
                                            (member) => member.leader
                                        )?.user.name
                                    )
                                "
                            >
                                <span class="i-ep:document"></span>
                            </el-button>
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
                                <div>
                                    {{
                                        isPublic(
                                            instance.team.creatorUuid,
                                            instance.team.status
                                        )
                                            ? '公开'
                                            : '隐藏'
                                    }}
                                </div>
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
                    @change="
                        joinTeam(
                            instance.team.id,
                            instance.members.find((member) => member.leader)
                                ?.user.name
                        )
                    "
                >
                    <el-collapse-item :name="index">
                        <template #title>
                            <div class="flex-center select-none">
                                <span
                                    v-if="
                                        copyHistory.includes(instance.team.id)
                                    "
                                    class="i-ep:document-checked text-size-[1.4em] color-green-500"
                                ></span>
                                <span
                                    v-else
                                    class="i-ep:document text-size-[1.4em]"
                                ></span>
                                <span class="text-size-[1.11em]">
                                    &nbsp;入队要求
                                </span>
                            </div>
                        </template>
                        <div
                            v-for="requirement in instance.requirements"
                            class="requirement"
                        >
                            <span class="type"
                                >{{ requirement.type }}&nbsp;&nbsp;></span
                            >
                            <span class="content">
                                {{ requirement.content }}
                            </span>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </el-card>
        </RyuEmpty>
    </RyuLoading>
</template>

<script setup lang="ts">
import { response } from '@/composables/types'
import { ToggleTeamStatus, RemoveTeam } from '@api/team'
import { teamStore, authStore } from '@/store'
import { ElNotification } from 'element-plus'
const _teamStore = teamStore()
const _authStore = authStore()
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

const toggleTeamStatus = async (uuid: string, status: number) => {
    loading.status = true
    _teamStore.toggleTeamStatus(uuid, status)
    let param = {
        uuid: uuid,
        status: status,
    }
    const result = (await ToggleTeamStatus(param)) as response
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
    const result = (await RemoveTeam(id)) as response
    if (result.success) {
        loading.delete = false
        _teamStore.removeTeam(id)
        return
    } else {
        loading.delete = false
        ElMessage.error(result.message)
    }
}

const copyHistory = reactive<Array<number>>([])
const joinTeam = (teamId: number, name: string | undefined) => {
    if (!name) {
        return
    }
    let prefix = '/join '
    let result = prefix + name

    navigator.clipboard.writeText(result)
    if (copyHistory.includes(teamId)) {
        return
    }
    copyHistory.push(teamId)
    ElNotification.success({
        title: '已复制入队指令',
        message: '请在游戏内聊天框粘贴',
        offset: 20,
        position: 'bottom-right',
    })
}
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
