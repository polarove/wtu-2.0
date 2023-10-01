<template>
    <el-row
        class="wtu-header"
        :style="{ boxShadow: isDark ? '' : '0 2px 12px 0 rgba(0, 0, 0, 0.1)' }"
    >
        <el-col :span="5" class="flex-center">
            <wtu-logo />
        </el-col>
        <el-col :span="12" class="flex-center">
            <wtu-app-name class="invisible-max-900px" />
        </el-col>
        <!-- <div class="flex-1"></div> -->
        <el-col :span="7" class="flex-center">
            <wtu-avatar class="avatar" />
            <div class="invisible-min-900px ml-1em tp">
                <div
                    v-if="isBlank(_authStore.getUUID())"
                    class="text-center text-size-[1.0rem] ml-1.0em cursor-pointer hover-color-blue"
                    @click="() => router.push({ name: 'login' })"
                >
                    点击登录&nbsp;/&nbsp;注册
                </div>
                <div v-else>
                    <ryu-user-name inputSize="small" /> <wtu-online-state />
                </div>
            </div>
        </el-col>
        <div
            class="curtain"
            :style="{ visibility: isDark ? 'visible' : 'hidden' }"
        ></div>
    </el-row>
</template>

<script setup lang="ts">
import { isDark } from '@/composables/theme'
import { isBlank } from '@util/StrUtil'
import { authStore } from '@/store'
import router from '@/router'
const _authStore = authStore()

onMounted(() => {
    _authStore.updateUser()
})
</script>

<style lang="scss" scoped>
.wtu-header {
    height: 67px;

    .avatar {
        &:hover {
            + .tp {
                color: var(--el-color-primary);
            }
        }
    }

    .curtain {
        position: absolute;
        width: 100%;
        right: 0;
        bottom: -31px;
        z-index: -1;
    }

    .curtain::before {
        content: '';
        display: block;
        width: 100%;
        height: 32px;
        background: linear-gradient(#1e1e20, transparent 70%);
    }
}
</style>
