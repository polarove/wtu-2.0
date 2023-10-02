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
                v-if="isNotDefualtUserName(_authStore.getName())"
                class="mt-20px"
                ref="VerifyFormRef"
                :model="VerifyForm"
                :rules="VerifyFormRules"
            >
                <el-form-item prop="name" label="我是：">
                    <el-input
                        v-model="VerifyForm.name"
                        class="inline-block"
                        placeholder="请填写游戏内昵称"
                        @keyup.enter="saveMyProfile(VerifyFormRef)"
                    >
                        <template #append>
                            <el-button
                                :loading="loading"
                                @click="saveMyProfile(VerifyFormRef)"
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
import { Verify, SaveMyProfile } from '@api/account'
import type { response, ResponseEnum } from '@composables/types'
import type { UserVO } from '@composables/user'
import type { FormInstance, FormRules } from 'element-plus'
import { authStore } from '@/store'
import { ElMessage } from 'element-plus'
import { isDefualtUserName, isNotDefualtUserName } from '@composables/enums'

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
    const result = (await Verify(verificationForm)) as response<ResponseEnum>
    if (result.code == 204) {
        setTimeout(() => {
            verificationStatus.compeleted = true
            verificationStatus.succeed = true
        }, 1000)
    } else if (result.code == 205) {
        setTimeout(() => {
            verificationStatus.compeleted = true
            if (isDefualtUserName(_authStore.getName())) {
                verificationStatus.succeed = true
                verificationStatus.message = '别忘了输入用户名哦^_^'
            } else {
                verificationStatus.duplicated = true
            }
        }, 1000)
    } else if (result.code == 206) {
        setTimeout(() => {
            verificationStatus.compeleted = true
            verificationStatus.failed = true
        }, 1000)
    }
    verificationStatus.message = result.message
}
verify()

const VerifyFormRef = ref<FormInstance>()
const VerifyForm = reactive({
    uuid: '',
    name: '',
})
const VerifyFormRules = reactive<FormRules>({
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
const saveMyProfile = async (formEl: FormInstance | undefined) => {
    loading.value = true
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            VerifyForm.uuid = uuid
            const result = (await SaveMyProfile(VerifyForm)) as response<UserVO>
            if (result.success) {
                router.push({ name: 'origin' })
                _authStore.setUser(result.data)
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
