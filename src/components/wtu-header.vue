<template>
    <el-row
        class="wtu-header"
        :style="{ boxShadow: isDark ? '' : '0 2px 12px 0 rgba(0, 0, 0, 0.1)' }"
    >
        <el-col :span="5" class="flex-center">
            <WtuLogo />
        </el-col>
        <el-col :span="12" class="flex-center">
            <span
                class="title invisible-max-900px text-size-[1.37rem] font-smiley"
                >Warframe Team Up</span
            >
        </el-col>
        <!-- <div class="flex-1"></div> -->
        <el-col :span="7" class="flex-center">
            <WtuAvatar class="avatar" />
            <div class="invisible-min-900px ml-1em tp">
                <div
                    v-if="isBlank(_authStore.getUUID())"
                    class="text-center text-size-[1.0rem] ml-1.0em cursor-pointer hover-color-blue"
                    @click="() => router.push({ name: 'login' })"
                >
                    点击登录&nbsp;/&nbsp;注册
                </div>
                <div v-else class="vertical-middle">
                    <div class="text-size-[1.2rem] font-bold">
                        {{ _authStore.getName() }}
                    </div>
                    <WtuOnlineState />
                </div>
            </div>
            <el-tooltip
                content="退出登录"
                v-if="isNotBlank(_authStore.getUUID())"
            >
                <span
                    class="icon text-size-[1.7rem] ml-0.75em i-ant-design:poweroff-outlined hover-color-red cursor-pointer"
                    @click="logout()"
                >
                </span>
            </el-tooltip>
        </el-col>
        <div
            class="curtain"
            :style="{ visibility: isDark ? 'visible' : 'hidden' }"
        ></div>
    </el-row>
</template>

<script setup lang="ts">
import { isDark } from '@/composables/theme'
import { isBlank, isNotBlank } from '@util/StrUtil'
import { authStore } from '@/store'
import { Logout } from '@api/account'
import type { response } from '@/composables/types'
import router from '@/router'
import { ElMessage } from 'element-plus'
const _authStore = authStore()

const logout = async () => {
    const result = (await Logout(_authStore.getUUID())) as response
    if (result.code === 200) {
        _authStore.$reset()
        router.replace({ name: 'login' })
    } else {
        ElMessage.error(result.message)
    }
}

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
    .title {
        min-width: 150px;
        overflow: hidden;
    }

    .curtain {
        position: absolute;
        width: 100%;
        right: 0;
        bottom: -31px;
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
