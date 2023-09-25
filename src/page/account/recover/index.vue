<template>
    <el-form
        ref="RecoverEmailFormRef"
        :rules="RecoverEmailFormRules"
        :model="RecoverEmailForm"
        v-if="EmailInputHidden"
    >
        <el-form-item prop="email">
            <el-input
                ref="EmailRef"
                placeholder="请输入邮箱"
                v-model="RecoverEmailForm.email"
            >
                <template #prepend>
                    <div class="i-ant-design:mail-outlined"></div>
                </template>
                <template #append>
                    <el-button
                        :disabled="RecoverButtonState.disabled"
                        @click="recover(RecoverEmailFormRef)"
                    >
                        {{
                            RecoverButtonState.disabled
                                ? RecoverButtonState.cooldown +
                                  RecoverButtonState.type +
                                  '后重新发送'
                                : '发送邮件'
                        }}
                    </el-button>
                </template>
            </el-input>
        </el-form-item>
    </el-form>
    <RyuCode v-if="CodeInputVisible" v-model="code" @submit="submitCode" />
    <el-form
        v-if="VerifySuccess"
        :model="RecoverPasswordForm"
        ref="RecoverPasswordFormRef"
    >
        <el-form-item>
            <el-input
                show-password
                type="password"
                placeholder="请输入新密码"
                v-model="RecoverPasswordForm.password"
            >
                <template #prepend>
                    <div class="i-ant-design:lock-outlined"></div>
                </template>
                <template #append>
                    <el-button @click="submitPassword(RecoverPasswordFormRef)"
                        >提交</el-button
                    >
                </template>
            </el-input>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import {
    ElMessage,
    ElMessageBox,
    type Action,
    type FormInstance,
    type FormRules,
} from 'element-plus'
import { GetRecoverCode, SubmitCode, ChangePassword } from '@api/account'
import { User, response } from '@/composables/types'
import router from '@/router'
import { isNotBlank } from '@/util/StrUtil'
import { authStore } from '@/store'
const _authStore = authStore()
const recoverEmail = router.currentRoute.value.query.email as string | undefined
const uuid = router.currentRoute.value.query.uuid as string | undefined

const EmailInputHidden = computed(() => {
    return recoverEmail && uuid ? false : true
})

const RecoverButtonState = reactive({
    disabled: false,
    cooldown: 60,
    type: '秒',
})

const EmailRef = ref<HTMLInputElement>()
const AutoFocus = () => {
    nextTick(() => {
        EmailRef.value?.focus()
    })
}
const AutoFill = () => {
    if (isNotBlank(recoverEmail as string)) {
        RecoverEmailForm.email = recoverEmail as string
    }
}

const RecoverEmailFormRef = ref<FormInstance>()

const RecoverEmailFormRules = reactive<FormRules>({
    email: [
        {
            required: true,
            message: '请输入邮箱',
            trigger: 'change',
        },
        {
            type: 'email',
            message: '请检查邮箱格式',
            trigger: ['blur', 'change'],
        },
    ],
})

const RecoverEmailForm = reactive({
    email: '',
    uuid: '',
    code: '',
})

const recover = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            RecoverButtonState.disabled = true
            // 找回相关逻辑
            const Interval = setInterval(() => {
                RecoverButtonState.cooldown--
                if (RecoverButtonState.cooldown === 0) {
                    clearInterval(Interval)
                    RecoverButtonState.disabled = false
                    RecoverButtonState.cooldown = 60
                }
            }, 1000)
            const result = (await GetRecoverCode(
                RecoverEmailForm.email
            )) as response
            if (result.success) {
                RecoverEmailForm.code = result.data as string
                ElMessageBox.alert(RecoverEmailForm.code, '请记住您的验证码', {
                    // if you want to disable its autofocus
                    // autofocus: false,
                    confirmButtonText: '复制到剪贴板',
                    center: true,
                    customStyle: {
                        marginBottom: '12rem',
                    },
                    callback: (action: Action) => {
                        if (action === 'confirm') {
                            navigator.clipboard.writeText(RecoverEmailForm.code)
                        }
                        return false
                    },
                })
            } else {
                ElMessage.error(result.message)
                RecoverButtonState.disabled = false
            }
        } else {
            console.log('error submit!')
            return false
        }
    })
}
const code = ref<string>('')
const VerifySuccess = ref(false)

const CodeInputVisible = computed(() => {
    return !VerifySuccess.value && !EmailInputHidden.value ? true : false
})

const submitCode = async () => {
    RecoverEmailForm.uuid = uuid as string
    RecoverEmailForm.code = code.value
    RecoverEmailForm.email = recoverEmail as string
    const result = (await SubmitCode(RecoverEmailForm)) as response
    if (result.success) {
        VerifySuccess.value = true
    } else {
        ElMessage.error(result.message)
    }
}

const RecoverPasswordFormRef = ref<FormInstance>()
const RecoverPasswordForm = reactive({
    uuid: '',
    code: '',
    email: '',
    password: '',
})
const submitPassword = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            RecoverPasswordForm.uuid = uuid as string
            RecoverPasswordForm.code = code.value
            RecoverPasswordForm.email = recoverEmail as string
            const result = (await ChangePassword(
                RecoverPasswordForm
            )) as response
            if (result.success) {
                ElMessage.success(result.message)
                router.push({
                    name: 'origin',
                })
                _authStore.setUser(result.data as User)
            } else {
                ElMessage.error(result.message)
            }
        } else {
            console.log('error submit!')
            return false
        }
    })
}

onMounted(() => {
    AutoFill()
    AutoFocus()
})
</script>

<style lang="scss" scoped></style>
