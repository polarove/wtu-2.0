<template>
    <div>
        <div class="teamset" v-if="_authStore.isLogin()">
            <WtuLoadout
                :teammate="createTeamForm.host"
                class="teammate"
                @emitCreateTeam="createTeam()"
                ref="HostRef"
            >
                <template #loadout>
                    <div>
                        {{
                            createTeamForm.host.warframe[
                                _authStore.getServerChar()
                            ]
                        }}
                    </div>
                </template>
            </WtuLoadout>
            <WtuLoadout
                class="teammate"
                :teammate="createTeamForm.firstMate"
                @emitCreateTeam="createTeam()"
                ref="FirstMateRef"
            >
                <template #loadout>
                    <div>
                        {{
                            createTeamForm.firstMate.warframe[
                                _authStore.getServerChar()
                            ]
                        }}
                    </div>
                </template>
            </WtuLoadout>
            <WtuLoadout
                class="teammate"
                :teammate="createTeamForm.secondMate"
                @emitCreateTeam="createTeam()"
                ref="SecondMateRef"
            >
                <template #loadout>
                    <div>
                        {{
                            createTeamForm.secondMate.warframe[
                                _authStore.getServerChar()
                            ]
                        }}
                    </div>
                </template>
            </WtuLoadout>
            <WtuLoadout
                class="teammate"
                :teammate="createTeamForm.thirdMate"
                @emitCreateTeam="createTeam()"
                ref="ThirdMateRef"
            >
                <template #loadout>
                    <div>
                        {{
                            createTeamForm.thirdMate.warframe[
                                _authStore.getServerChar()
                            ]
                        }}
                    </div>
                </template>
            </WtuLoadout>
        </div>
        <el-drawer
            v-model="teamDrawer.visible"
            :size="teamDrawer.dynamicSize"
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
                                    :value="requirement.type"
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
                    <div class="addRequirement">
                        <RyuSvg
                            name="add"
                            size="1.5em"
                            class="add"
                            @click.prevent="addRequirement()"
                        ></RyuSvg>
                    </div>
                </el-form-item>
                <el-form-item> 队伍配置 </el-form-item>
                <el-form-item prop="host" label="我">
                    <WtuWarframe
                        v-model="createTeamForm.host.warframe"
                        @click="toggleWarframeDrawer(1)"
                    />
                    <WtuFocusList
                        v-model="createTeamForm.host.focus"
                        size="3em"
                    />
                </el-form-item>
                <el-form-item prop="first_mate" label="队员1">
                    <WtuWarframe
                        v-model="createTeamForm.firstMate.warframe"
                        @click="toggleWarframeDrawer(2)"
                    />
                    <WtuFocusList
                        v-model="createTeamForm.firstMate.focus"
                        size="3em"
                    />
                </el-form-item>
                <el-form-item prop="second_mate" label="队员2">
                    <WtuWarframe
                        v-model="createTeamForm.secondMate.warframe"
                        @click="toggleWarframeDrawer(3)"
                    />
                    <WtuFocusList
                        v-model="createTeamForm.secondMate.focus"
                        size="3em"
                    />
                </el-form-item>
                <el-form-item prop="third_mate" label="队员3">
                    <WtuWarframe
                        v-model="createTeamForm.thirdMate.warframe"
                        @click="toggleWarframeDrawer(4)"
                    />
                    <WtuFocusList
                        v-model="createTeamForm.thirdMate.focus"
                        size="3em"
                    />
                </el-form-item>
            </el-form>
            <el-drawer
                v-model="warframeListDrawer.visible"
                :title="title"
                :size="warframeListDrawer.dynamicSize"
                :direction="warframeListDrawer.direction"
                destroy-on-close
                :append-to-body="true"
            >
                <WtuWarframeList
                    @emitToggleWarframeDrawer="toggleWarframeDrawer(0)"
                    @updateModelValue="selectWarframe($event)"
                />
            </el-drawer>
            <template #footer>
                <el-button @click="publishTeam(createTeamFormRef)">
                    发布
                </el-button>
            </template>
        </el-drawer>
    </div>
</template>

<script setup lang="ts">
import { authStore } from '@/store'
import { type FormInstance, type FormRules } from 'element-plus'
import { type CreateTeam } from '@/composables/types'
import { type warframe } from '@/composables/warframe'
import { requirements } from '@composables/requirement'
const routes = useRoute()
const _authStore = authStore()

const createTeamFormRef = ref<FormInstance>()
const createTeamFormRules = reactive<FormRules>({
    title: [
        {
            required: true,
            message: '请输入标题',
            trigger: 'blur',
        },
    ],
    host: [{ required: true, message: '请选择你的build' }],
    first_mate: [{ required: true, message: '请选择至少一个队友的build' }],
})
const createTeamForm = reactive<CreateTeam>({
    title: '未修改的标题',
    server: _authStore.getServer(),
    requirements: [
        {
            type: 'any',
            content: '',
        },
    ],
    host: {
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
    },
    firstMate: {
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
    },
    secondMate: {
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
    },
    thirdMate: {
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
    },
})

const removeRequirement = (requirement: any) => {
    const index = createTeamForm.requirements.indexOf(requirement)
    if (index === 0) {
        return
    }
    if (index !== -1) {
        createTeamForm.requirements.splice(index, 1)
    }
}
const addRequirement = () => {
    if (createTeamForm.requirements.length > 7) {
        return
    }
    createTeamForm.requirements.push({
        type: 'any',
        content: '',
    })
}

const teamDrawer = reactive({
    dynamicSize: '40%',
    visible: false,
    title: '',
    direction: 'rtl',
})

const warframeListDrawer = reactive({
    visible: false,
    title: '选择一个战甲',
    dynamicSize: '40%',
    direction: 'rtl',
    edit: 0,
})
const toggleWarframeDrawer = (index: number) => {
    warframeListDrawer.visible = !warframeListDrawer.visible
    warframeListDrawer.edit = index
}

const selectWarframe = (target: warframe) => {
    switch (warframeListDrawer.edit) {
        case 1:
            createTeamForm.host.warframe = target
            break
        case 2:
            createTeamForm.firstMate.warframe = target
            break
        case 3:
            createTeamForm.secondMate.warframe = target
            break
        case 4:
            createTeamForm.thirdMate.warframe = target
            break
        default:
            break
    }
}

const title = computed(() => {
    if (warframeListDrawer.edit === 1) {
        return '选择你的战甲'
    }
    return '选择第' + warframeListDrawer.edit + '个队友的战甲'
})

const createTeam = () => {
    teamDrawer.visible = true
    teamDrawer.title = '在 ' + routes.meta.forehead + ' 招募队友'
}

const publishTeam = async (formEl: FormInstance | undefined) => {
    if (!formEl) {
        return
    }
    console.log(createTeamForm)
}

const HostRef = ref()
const FirstMateRef = ref()
const SecondMateRef = ref()
const ThirdMateRef = ref()
const toggleTooltipDisabled = () => {
    HostRef.value?.enablePopover()
    FirstMateRef.value?.enablePopover()
    SecondMateRef.value?.enablePopover()
    ThirdMateRef.value?.enablePopover()
}

const initDrawerWidth = () => {
    if (document.body.clientWidth < 900) {
        teamDrawer.dynamicSize = '100%'
        warframeListDrawer.dynamicSize = '95%'
    } else {
        teamDrawer.dynamicSize = '40%'
        warframeListDrawer.dynamicSize = '35%'
    }
}
initDrawerWidth()

onMounted(() => {
    window.addEventListener('resize', () => {
        initDrawerWidth()
    })
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', () => {
        initDrawerWidth()
    })
})
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
.addRequirement {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;

    .add {
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
