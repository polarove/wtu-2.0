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
        <el-divider />
        <div class="text-center">
            <span class="opacity-60 text-size-[0.77em]">
                您所填写的邮箱与密码与 Warframe / Digital Extremes
            </span>
            <span class="opacity-80 text-size-[0.77em]">
                没有任何关联，仅用作网站登录
            </span>
        </div>
    </el-form>
</template>

<script setup lang="ts">
import router from '@/router'
import type { FormInstance, FormRules } from 'element-plus'
import { Login, LoginByUUID } from '@api/account'
import type { response } from '@composables/types'
import type { UserVO } from '@composables/user'
import { authStore } from '@/store'
import { isNotBlank } from '@/util/StrUtil'
const _authStore = authStore()
const route = useRoute()
const loading = ref(false)

const LoginFormRef = ref<FormInstance>()

const redirect = route.query.redirect as string | undefined

const LoginFormRules = reactive<FormRules>({
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
    password: [{ required: true, message: '请输入密码', trigger: 'change' }],
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
            const result = (await Login(LoginForm)) as response<UserVO>
            if (result.success) {
                router.push({ name: 'origin' })
                _authStore.setUser(result.data as UserVO)
            } else {
                ElNotification.error({
                    position: 'bottom-right',
                    message: result.message,
                })
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

const loginByUuid = async (uuid: string) => {
    const result = (await LoginByUUID(uuid)) as response<UserVO>
    if (result.success) {
        router.push({ name: 'origin' })
        _authStore.setUser(result.data as UserVO)
        loading.value = false
    } else {
        ElNotification.error({
            position: 'bottom-right',
            message: result.message,
        })
        loading.value = false
    }
}

const delay = (uuid: string) => {
    loading.value = true
    setTimeout(() => {
        loginByUuid(uuid)
    }, 2000)
}

onBeforeMount(() => {
    let uuid = _authStore.getUUID()

    if (isNotBlank(uuid) && redirect !== undefined) {
        delay(uuid)
    }
})
</script>

<style lang="scss" scoped>
.tip {
    color: #999;
    margin-left: 15px;
    display: flex;
    align-items: center;

    &:hover {
        color: var(--el-color-primary);
        cursor: pointer;
    }
}
</style>
