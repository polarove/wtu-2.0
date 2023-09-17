<template>
    <el-form ref="loginFormRef" :rules="loginFormRules" :model="loginForm">
        <el-form-item prop="email">
            <el-input placeholder="请输入邮箱" v-model="loginForm.email">
                <template #prepend>
                    <div class="i-ant-design:mail-outlined"></div>
                </template>
            </el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input show-password placeholder="请输入密码" v-model="loginForm.password">
                <template #prepend>
                    <div class="i-ep:lock"></div>
                </template>
            </el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="login(loginFormRef)">登录&nbsp;/&nbsp;注册</el-button>

            <div class="tip" @click="recover">
                <span class="i-ep:info-filled mr-5px" />
                <span>我忘记了密码</span>
            </div>
        </el-form-item>
    </el-form>
</template>
  
<script setup lang='ts'>
import router from '@/router'
import type { FormInstance, FormRules } from 'element-plus'
import { stateStore } from '@/store'
import { ILogin } from '@/request/account'

const _stateStore = stateStore()

const loginFormRef = ref<FormInstance>()

const loginFormRules = reactive<FormRules>({
    email: [{
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
    password: [{ required: true, message: "请输入密码", trigger: 'blur' }],
})

const loginForm = reactive({
    email: '',
    password: ''
})

const login = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            console.log('submit!')
            console.log(loginForm);
            // router.push({ name: 'origin' })
            // 登录相关
            // code here
            console.log(ILogin(loginForm));

        } else {
            console.log('error submit!')
            return false
        }
    })
}

const recover = () => {
    router.push({
        name: 'recover'
    })
}
</script>
  
<style lang='scss' scoped>
.tip {
    color: #999;
    margin-left: 15px;

    &:hover {
        color: var(--el-color-primary);
        cursor: pointer;
    }
}
</style>