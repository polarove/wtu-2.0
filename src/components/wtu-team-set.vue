<template>
    <div>
        <div class="teamset" v-if="_authStore.isLogin()">
            <wtu-loadout
                v-for="(teammate, index) in createTeamForm.members"
                :teammate="teammate"
                :index="index"
                :ref="(el: Component) => setLoadoutRef(el, index)"
                class="teammate"
                @emitCreateTeam="toggleCreateTeamDrawer(index)"
            >
                <template #loadout>
                    <div>
                        {{ teammate.warframe[_authStore.getServerChar()] }}
                    </div>
                </template>
            </wtu-loadout>
        </div>
        <el-drawer
            v-model="teamDrawer.visible"
            :size="_layoutStore.isWide() ? '40%' : '100%'"
            :title="teamDrawer.title"
            :direction="teamDrawer.direction"
            @close="toggleTooltipDisabled()"
        >
            <el-form
                :model="createTeamForm"
                ref="createTeamFormRef"
                :rules="createTeamFormRules"
                label-position="top"
            >
                <el-form-item prop="title" label="标题">
                    <el-input
                        placeholder="请输入标题"
                        v-model="createTeamForm.title"
                    />
                </el-form-item>
                <el-form-item> 队伍类型 </el-form-item>
                <el-form-item>
                    <el-select
                        placeholder="请选择队伍类型"
                        v-model="createTeamForm.isPublic"
                    >
                        <el-option label="公开可见" :value="true"></el-option>
                        <el-option label="仅限邀请" :value="false"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item> 进队要求 </el-form-item>
                <el-form-item
                    v-for="(requirement, index) in createTeamForm.requirements"
                    :key="index"
                >
                    <el-input
                        placeholder="请输入要求"
                        v-model="requirement.content"
                    >
                        <template #prepend>
                            <el-select
                                style="width: 110px"
                                v-model="requirement.type"
                            >
                                <el-option
                                    v-for="(requirement, index) in requirements"
                                    :key="index"
                                    :value="requirement.name"
                                    :label="requirement.name"
                                />
                            </el-select>
                        </template>
                        <template #append>
                            <el-button
                                class="mt-2"
                                @click.prevent="removeRequirement(requirement)"
                            >
                                移除
                            </el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <div class="addFormItem">
                        <div
                            class="i-ant-design:appstore-add-outlined icon"
                            @click.prevent="addRequirement()"
                        ></div>
                    </div>
                </el-form-item>
                <el-form-item> 队伍配置 </el-form-item>
                <el-form-item
                    v-for="(member, index) in createTeamForm.members"
                    :key="index"
                    :label="!index ? '我' : '队友_' + index + ':'"
                    class="member"
                >
                    <div class="flex-between w-100%">
                        <div class="flex-start w-100%">
                            <wtu-warframe
                                v-model="member.warframe"
                                @click="toggleWarframeDrawer(index)"
                            />
                            <wtu-focus-list
                                v-model="member.focus"
                                size="3em"
                                :rows="_layoutStore.isWide() ? 1 : 2"
                                simplified
                            />
                        </div>
                        <div
                            v-if="index !== 0 && index !== 1"
                            class="i-ant-design:usergroup-delete-outlined icon"
                            @click.prevent="removeMember(member)"
                        ></div>
                    </div>
                </el-form-item>
                <el-form-item>
                    <div class="addFormItem">
                        <div
                            class="i-ant-design:usergroup-add-outlined icon mr-4"
                            @click.prevent="addMember()"
                        ></div>
                    </div>
                </el-form-item>
            </el-form>

            <el-drawer
                v-model="warframeListDrawer.visible"
                :title="title"
                :size="_layoutStore.isWide() ? '40%' : '100%'"
                :direction="warframeListDrawer.direction"
                destroy-on-close
                @close="toggleTooltipDisabled()"
                :append-to-body="true"
            >
                <wtu-warframe-list
                    @emitToggleWarframeDrawer="toggleWarframeDrawer($event)"
                    @updateModelValue="selectWarframe($event)"
                />
            </el-drawer>
            <template #footer>
                <div class="flex-between">
                    <ryu-sponsor />
                    <el-button
                        :loading="loading"
                        @click="publishTeam(createTeamFormRef)"
                    >
                        发布
                    </el-button>
                </div>
            </template>
        </el-drawer>
    </div>
</template>

<script setup lang="ts">
import { authStore, layoutStore } from '@/store'
import { type FormInstance, type FormRules } from 'element-plus'
import { type TeamDTO, type TeamVO } from '@/composables/team'
import { type warframe } from '@/composables/warframe'
import { requirements } from '@composables/requirement'
import { CreateTeam, GetTeamById, BroadcastTeam } from '@api/team'
import type { response } from '@/composables/types'
import { SERVER_CODE } from '@/composables/enums'

const route = useRoute()
const _authStore = authStore()
const _layoutStore = layoutStore()
const createTeamFormRef = ref<FormInstance>()
const createTeamFormRules = reactive<FormRules>({
    title: [
        {
            required: true,
            message: '请输入标题',
            trigger: 'blur',
        },
    ],
})
const createTeamForm = reactive<TeamDTO>({
    title: '未修改的标题',
    server: 1,
    channel: null,
    isPublic: true,
    requirements: [],
    members: [
        {
            user: {
                uuid: _authStore.getUUID(),
                name: _authStore.getName(),
                avatar: _authStore.getAvatar(),
                level: _authStore.getLevel(),
            },
            warframe: {
                en: 'any',
                cn: '任意',
            },
            focus: 'any',
            leader: 1,
            occupied: 1,
        },
        {
            user: {
                uuid: '',
                name: '',
                avatar: '',
                level: 0,
            },
            warframe: {
                en: 'any',
                cn: '任意',
            },
            focus: 'any',
            leader: 0,
            occupied: 0,
        },
    ],
})

const addMember = () => {
    if (createTeamForm.members.length > 3) {
        return
    }
    createTeamForm.members.push({
        user: {
            uuid: '',
            name: '',
            avatar: '',
            level: 0,
        },
        warframe: {
            en: 'any',
            cn: '任意',
        },
        focus: 'any',
        leader: 0,
        occupied: 0,
    })
}

const removeMember = (member: any) => {
    const index = createTeamForm.members.indexOf(member)
    if (index === 0 || index === 1) {
        return
    }
    if (index !== -1) {
        createTeamForm.members.splice(index, 1)
    }
}

const removeRequirement = (requirement: any) => {
    const index = createTeamForm.requirements.indexOf(requirement)
    if (index !== -1) {
        createTeamForm.requirements.splice(index, 1)
    }
}
const addRequirement = () => {
    if (createTeamForm.requirements.length > 7) {
        return
    }
    createTeamForm.requirements.push({
        type: '任意',
        content: '',
    })
}

const teamDrawer = reactive({
    visible: false,
    title: '',
    direction: 'rtl',
    from: 0,
    edit: 0,
})

const warframeListDrawer = reactive({
    visible: false,
    title: '选择一个战甲',
    direction: 'rtl',
})

const toggleWarframeDrawer = (index: number) => {
    warframeListDrawer.visible = !warframeListDrawer.visible
    if (index === undefined) {
        return
    }
    teamDrawer.edit = index
}

const selectWarframe = (target: warframe) => {
    createTeamForm.members[teamDrawer.edit as number].warframe = target
}

const title = computed(() => {
    if (teamDrawer.edit === 0) {
        return '选择你的战甲'
    }
    return '选择第' + teamDrawer.edit + '个队友的战甲'
})

const toggleCreateTeamDrawer = (index: number) => {
    teamDrawer.visible = true
    teamDrawer.title = '在 ' + route.meta.forehead + ' 招募队友'
    teamDrawer.from = index
}

const refs: Record<string, any> = {}
const setLoadoutRef = (el: any, index: number) => {
    if (el) {
        refs[`${index}`] = el
    }
}
const toggleTooltipDisabled = () => {
    refs[`${teamDrawer.from}`].enablePopover()
}

const loading = ref<boolean>(false)
const publishTeam = (formEl: FormInstance | undefined) => {
    loading.value = true
    if (!formEl) {
        loading.value = false
        return
    }
    formEl.validate((valid: boolean) => {
        if (!valid) {
            loading.value = false
            return
        }
        if (checkDTO()) {
            createTeam()
            loading.value = false
        } else {
            ElNotification.error({
                position: 'bottom-right',
                message: '当前用户名不符合国际服规范，请更改',
            })
            loading.value = false
        }
    })
}

const checkDTO = (): boolean => {
    if (_authStore.getServer() === SERVER_CODE.en) {
        let reg = new RegExp(/^\w+$/)
        let name = _authStore.getName()
        return reg.test(name)
    } else {
        return true
    }
}

const createTeam = () => {
    createTeamForm.channel = route.name
    createTeamForm.server = _authStore.getServer()

    CreateTeam(createTeamForm)
        .then(async (res: any) => {
            if (res.success) {
                const result = (await GetTeamById(res.data)) as response<TeamVO>
                if (result.success) {
                    BroadcastTeam(result.data)
                } else {
                    ElMessage.error(result.message)
                }
            }
        })
        .catch((err: any) => {
            ElNotification.error({
                position: 'bottom-right',
                message: err.message,
            })
        })
        .finally(() => {
            loading.value = false
            teamDrawer.visible = false
        })
}
</script>

<style lang="scss" scoped>
.teamset {
    display: flex;
    align-items: center;

    .teammate {
        width: 40px;
        height: 40px;
        transition: all 0.1s ease-in-out;
        &:hover {
            box-shadow: 0 0 2px 0 var(--el-color-primary);
            transform: scale(1.1);
        }
    }

    .teammate:nth-child(n + 2) {
        margin-left: 1em;
    }
}
.addFormItem {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;

    .icon {
        font-size: 2em;
        cursor: pointer;
        transition: all 0.1s ease-in-out;
        &:hover {
            transform: scale(1.1);
            color: var(--el-color-primary);
        }
    }
}

.member {
    .icon {
        font-size: 2em;
        cursor: pointer;
        transition: all 0.1s ease-in-out;
        &:hover {
            transform: scale(1.1);
            color: var(--el-color-primary);
        }
    }
}

:deep(.el-form-item__content) {
    line-height: normal;
}
</style>
