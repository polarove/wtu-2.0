<template>
    <div>
        <div class="teamset" v-if="_authStore.isLogin()">
            <WtuAvatar :size="40" :PopDisabled="true" />
            <div class="plus" v-if="emptyTeam" @click="createTeam()">
                <RyuSvg name="plus" size="40%" class="icon" />
            </div>
            <div class="teammates" v-else>
                <el-avatar
                    shape="sqare"
                    class="teammate"
                    v-for="teammate in teammates"
                />
            </div>
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
                <el-form-item prop="me" label="我">
                    <WtuWarframe
                        v-model="createTeamForm.me.warframe"
                        @click="toggleWarframeDrawer()"
                    />
                    <WtuFocusList
                        v-model="createTeamForm.me.focus"
                        size="3em"
                    />
                </el-form-item>
                <el-form-item
                    prop="first_mate"
                    v-model="createTeamForm.firstMate.focus"
                    label="队员1"
                >
                    <WtuWarframe value="Gyre" />
                </el-form-item>
                <el-form-item prop="second_mate" label="队员2">
                    <WtuWarframe value="Gyre" />
                </el-form-item>
                <el-form-item prop="third_mate" label="队员3">
                    <WtuWarframe value="Gyre" />
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
                    @emitToggleWarframeDrawer="toggleWarframeDrawer()"
                    @updateSelection="selectWarframe($event)"
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
// @ts-nocheck
import { response } from '@composables/types'
import { authStore } from '@/store'
import { CreateTeam } from '@api/team'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import type { warframe } from '@/composables/warframe'

const createTeamFormRef = ref<FormInstance>()
const createTeamFormRules = reactive<FormRules>({
    title: [
        {
            required: true,
            message: '请输入标题',
            trigger: 'blur',
        },
    ],
    me: [{ required: true, trigger: 'blur' }],
    first_mate: [{ required: true, trigger: 'blur' }],
})
const createTeamForm = reactive({
    title: '3232',
    me: {
        warframe: {},
        focus: '',
    },
    firstMate: {
        warframe: '',
        focus: '',
    },
    secondMate: {
        warframe: '',
        focus: '',
    },
    thirdMate: {
        warframe: '',
        focus: '',
    },
})

const routes = useRoute()
const _authStore = authStore()
const teammates = reactive([])
const emptyTeam = computed(() => teammates.length === 0)

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
})
const toggleWarframeDrawer = () => {
    warframeListDrawer.visible = !warframeListDrawer.visible
}

const selectWarframe = (target: warframe) => {
    createTeamForm.me.warframe = target.value
    console.log(target.value)
    console.log(createTeamForm.me.warframe)
}

const createTeam = () => {
    teamDrawer.visible = true
    teamDrawer.title = '在 ' + routes.meta.forehead + ' 招募队友'
}
const teamFormRef = ref<FormInstance>()
const publishTeam = async (formEl: FormInstance | undefined) => {
    if (!formEl) {
        return
    }
    const result = (await CreateTeam(createTeamForm)) as response
    console.log(result)
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
    .plus {
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 0 0 1px #7d7d7d inset;
        margin-left: 1em;
        border-radius: 0.2em;
        cursor: pointer;
        &:hover {
            box-shadow: 0 0 0 1px var(--el-color-primary) inset;

            .icon {
                opacity: 1;
                color: var(--el-color-primary);
            }
        }

        .icon {
            opacity: 0.4;
        }
    }
    .teammates {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        width: 150px;
        height: 40px;
    }
    .teammate {
        width: 40px;
        height: 40px;
    }
}
</style>
