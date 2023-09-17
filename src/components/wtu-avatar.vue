<template>
    <el-popover :width="300"
        popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; border-radius: 0.5em; padding: 20px;">
        <template #reference>
            <el-avatar @click="NaviPrivateHome" fit="cover" shape="square" size="large" @error="avatarLoadingErrorHandler"
                class="cursor-pointer"></el-avatar>
        </template>
        <template #default>
            <div>hi, 你好 </div>
        </template>
    </el-popover>
</template>

<script setup lang="ts">
import { authStore } from '@/store'
import router from '@/router';

const _authStore = authStore()

const NaviPrivateHome = () => {
    if (_authStore.getSessionState()) {
        router.push({ name: 'privateHome' })
    } else {
        router.push({ name: 'login' })
    }
}



const avatarLoadingErrorHandler = (e: Event) => {
    console.log(e)
}
</script>

<style lang="scss" scoped></style>
