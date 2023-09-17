<template>
    <el-form ref="recoverFormRef" :rules="recoverFormRules" :model="recoverForm">
        <el-form-item prop="email">
            <el-input placeholder="请输入邮箱" v-model="recoverForm.email">
                <template #prepend>
                    <div class="i-ant-design:mail-outlined"></div>
                </template>
                <template #append> <el-button @click="recover(recoverFormRef)">找回</el-button></template>
            </el-input>
        </el-form-item>

    </el-form>
</template>
  
<script setup lang='ts'>
import router from '@/router'
import type { FormInstance, FormRules } from 'element-plus'
import { stateStore } from '@/store'

const _stateStore = stateStore()

const recoverFormRef = ref<FormInstance>()

const recoverFormRules = reactive<FormRules>({
    email: [{
        required: true,
        message: '请输入邮箱',
        trigger: 'blur',
    },
    {
        type: 'email',
        message: '请检查邮箱格式',
        trigger: 'blur',
    },
    ],
})

const recoverForm = reactive({
    email: '',
})

const recover = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            console.log('submit!')
            console.log(recoverForm);
            // 找回相关逻辑
            // code here
            ElNotification({
                title: '找回密码',
                message: '找回密码邮件已发送，请注意查收',
                type: 'success'
            })
        } else {
            console.log('error submit!')
            return false
        }
    })
}

</script>
  
<style lang='scss' scoped></style>