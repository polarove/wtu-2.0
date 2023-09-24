<template>
    <el-form ref="LoginFormRef" :rules="LoginFormRules" :model="LoginForm">
        <el-form-item prop="email">
            <el-input placeholder="请输入邮箱" v-model="LoginForm.email">
                <template #prepend>
                    <div class="i-ant-design:mail-outlined"></div>
                </template>
            </el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input
                show-password
                placeholder="请输入密码"
                @keyup.enter="login(LoginFormRef)"
                v-model="LoginForm.password"
            >
                <template #prepend>
                    <div class="i-ep:lock"></div>
                </template>
            </el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="login(LoginFormRef)" :loading="loading">
                {{ loading ? '登录中' : '登录&nbsp;/&nbsp;注册' }}
            </el-button>

            <div class="tip" @click="recover">
                <span class="i-ep:info-filled mr-5px" />
                <span class="select-none">我忘记了密码</span>
            </div>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import router from '@/router'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { Login } from '@api/account'
import { User, response } from '@composables/types'
import { authStore } from '@/store'
const _authStore = authStore()

const loading = ref(false)

const LoginFormRef = ref<FormInstance>()

const LoginFormRules = reactive<FormRules>({
    email: [
        {
            required: true,
            message: '请输入邮箱',
            trigger: 'blur',
        },
        {
            type: 'email',
            message: '请检查邮箱格式',
            trigger: ['blur', 'change'],
        },
    ],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})

const LoginForm = reactive({
    email: '',
    password: '',
})

const login = (formEl: FormInstance | undefined) => {
    loading.value = true
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            const result = (await Login(LoginForm)) as response
            if (result.success) {
                router.push({ name: 'origin' })
                _authStore.setUser(result.data as User)
                console.log(_authStore.getUser())
            } else {
                ElMessage.error(result.message)
            }
            loading.value = false
        } else {
            loading.value = false
            return false
        }
    })
}

const recover = () => {
    router.push({
        name: 'recover',
    })
}
</script>

<style lang="scss" scoped>
.tip {
    color: #999;
    margin-left: 15px;

    &:hover {
        color: var(--el-color-primary);
        cursor: pointer;
    }
}
</style>
