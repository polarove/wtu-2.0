<template>
    <el-popover :width="200" :disabled="PopDisabled"
        popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; border-radius: 0.5em; padding: 20px;">
        <template #reference>
            <el-avatar @click="NaviPrivateHome" :src="isBlank(_authStore.getUUID()) ? avatar : _authStore.getAvatar()"
                fit="cover" :shape="shape" :size="size" @error="avatarLoadingErrorHandler" class="cursor-pointer">
            </el-avatar>
        </template>
        <template #default>
            <div v-if="isBlank(_authStore.getUUID())" class="text-center text-size-[1.0rem]">点击登录&nbsp;/&nbsp;注册</div>
            <div v-else class="flex-between">
                <div>{{ _authStore.getName() }}</div>
                <div class="i-ant-design:logout-outlined text-size-[1.5rem] cursor-pointer hover-color-blue"
                    @click="logout"></div>
            </div>
        </template>
    </el-popover>
</template>

<script setup lang="ts">
import router from '@/router';
import { authStore } from '@/store';
import { isBlank } from '@util/StrUtil'
import { Logout } from '@api/account'
import { response } from '@/composables/types';
import { ElMessage } from 'element-plus';

const _authStore = authStore();

defineProps({
    shape: {
        type: String,
        default: 'square'
    },
    size: {
        type: Number,
        default: 60
    },
    avatar: {
        type: String,
        default: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    },
    PopDisabled: {
        type: Boolean,
        default: false
    }
})

const NaviPrivateHome = () => {
    if (isBlank(_authStore.getUUID())) {
        router.push({ name: 'login' })
        return
    }
    router.push({ name: 'profile' })
}

const logout = async () => {
    const result = await Logout(_authStore.getUUID()) as response
    if (result.code === 200) {
        _authStore.$reset()
        router.replace({ name: 'login' })
    } else {
        ElMessage.error(result.message)
    }
}

const avatarLoadingErrorHandler = (e: Event) => {
    console.log(e)
}
</script>

<style lang="scss" scoped></style>
