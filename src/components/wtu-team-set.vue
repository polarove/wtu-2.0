<template>
    <div>
        <div class="teamset" v-if="_authStore.isLogin()">
            <WtuLoadout
                :teammate="createTeamForm.host"
                class="teammate"
                @click="createTeam()"
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
                @click="createTeam()"
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
                @click="createTeam()"
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
                @click="createTeam()"
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
                :size="warframeListDrawer.dynamicSize"
                :title="warframeListDrawer.title"
                :direction="warframeListDrawer.direction"
                :append-to-body="true"
            >
                <template #header> 选择一个战甲 </template>
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
    host: {
        name: _authStore.getName(),
        level: 0,
        warframe: {
            en: 'any',
            cn: '任意',
        },
        focus: 'any',
    },
    firstMate: {
        name: '等待招募',
        level: 0,
        warframe: {
            en: 'any',
            cn: '任意',
        },
        focus: 'any',
    },
    secondMate: {
        name: '等待招募',
        level: 0,
        warframe: {
            en: 'any',
            cn: '任意',
        },
        focus: 'any',
    },
    thirdMate: {
        name: '等待招募',
        level: 0,
        warframe: {
            en: 'any',
            cn: '任意',
        },
        focus: 'any',
    },
})

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
    createTeamForm.host.warframe = target
}

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

:deep(.el-form-item__content) {
    line-height: normal;
}
</style>
