<template>
    <div class="page-account-verify">
        <div
            class="i-ep:loading text-size-[3rem] rotating"
            :class="{ invisible: verificationStatus.compeleted }"
        ></div>
        <div
            class="w-80% display-none"
            :class="{ visible: verificationStatus.succeed }"
        >
            <div class="animate__animated animate__pulse">
                <div class="i-ep:check text-size-[3rem]"></div>
                <div>
                    {{ verificationStatus.message }}向大家介绍一下自己吧！
                </div>
            </div>
            <el-form
                class="mt-20px"
                ref="NameFormRef"
                :model="NameForm"
                :rules="NameFormRules"
            >
                <el-form-item prop="name" label="我是：">
                    <el-input
                        v-model="NameForm.name"
                        class="inline-block"
                        placeholder="请填写游戏内昵称，用于组队"
                        @keyup.enter="saveMyName(NameFormRef)"
                    >
                        <template #append>
                            <el-button
                                :loading="loading"
                                @click="saveMyName(NameFormRef)"
                                >保存</el-button
                            >
                        </template>
                    </el-input>
                </el-form-item>
            </el-form>
        </div>
        <div
            class="animate__animated animate__bounce display-none"
            :class="{ visible: verificationStatus.failed }"
        >
            <div class="i-ep:close text-size-[3rem]"></div>
            <div>{{ verificationStatus.message }}</div>
        </div>
        <div
            class="animate__animated animate__bounceIn display-none"
            :class="{ visible: verificationStatus.duplicated }"
        >
            <div
                class="i-ant-design:info-circle-outlined text-size-[3rem]"
            ></div>
            <div>{{ verificationStatus.message }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { Verify, SaveMyName } from '@api/account'
import type { User, response } from '@composables/types'
import type { FormInstance, FormRules } from 'element-plus'
import { authStore } from '@/store'
import { ElMessage } from 'element-plus'

const _authStore = authStore()
const email = router.currentRoute.value.query.email as string
const uuid = router.currentRoute.value.query.uuid as string

const verificationStatus = reactive({
    compeleted: false,
    succeed: false,
    failed: false,
    duplicated: false,
    message: '',
})

const verificationForm = reactive({
    email: email,
    uuid: uuid,
})

const verify = async () => {
    const result = (await Verify(verificationForm)) as response
    verificationStatus.message = result.message
    if (result.code == 204) {
        setTimeout(() => {
            verificationStatus.compeleted = true
            verificationStatus.succeed = true
        }, 2000)
    } else if (result.code == 205) {
        setTimeout(() => {
            verificationStatus.compeleted = true
            verificationStatus.duplicated = true
        }, 2000)
    } else if (result.code == 206) {
        setTimeout(() => {
            verificationStatus.compeleted = true
            verificationStatus.failed = true
        }, 2000)
    }
}
verify()

const NameFormRef = ref<FormInstance>()
const NameForm = reactive({
    email: '',
    name: '',
})
const NameFormRules = reactive<FormRules>({
    name: [
        {
            required: true,
            message: '请输入用户名',
            trigger: ['blur', 'change'],
        },
        {
            min: 1,
            max: 30,
        },
    ],
})

const loading = ref(false)
const saveMyName = async (formEl: FormInstance | undefined) => {
    loading.value = true
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            NameForm.email = email
            const result = (await SaveMyName(NameForm)) as response
            if (result.success) {
                router.push({ name: 'origin' })
                _authStore.setUser(result.data as User)
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
</script>

<style lang="scss" scoped>
.page-account-verify {
    text-align: center;
}

.rotating {
    animation: rotating 3s linear infinite;
}

.visible {
    display: inline-block;
}

.invisible {
    display: none;
}

@keyframes rotating {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
