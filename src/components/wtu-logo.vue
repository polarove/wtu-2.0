<template>
    <div class="logo-wrapper">
        <el-tooltip :content="content" v-if="showLogo">
            <ryu-svg @click="toggleDark()" name="warframe" size="3rem" class="cursor-pointer"></ryu-svg>
        </el-tooltip>
        <el-tooltip content="返回主页" v-if="showTitle">
            <div @click="backToHome" class="name font-smiley invisible-min-900px">
                Warframe Team Up
            </div>
        </el-tooltip>
    </div>
</template>

<script setup lang="ts">
import { toggleDark, isDark } from '@composables/theme'
import router from '@/router';

defineProps({
    showLogo: {
        type: Boolean,
        default: true
    },
    showTitle: {
        type: Boolean,
        default: true
    }
})

const content = computed(() =>
    isDark.value ? '切换为白昼模式' : '切换为夜间模式'
)

const backToHome = () => {
    router.push({ path: '/' })
}
</script>

<style lang="scss" scoped>
.logo-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;

    .name {
        min-width: 150px;
        font-size: 1.37em;
        margin-left: 0.5em;
        cursor: pointer;
        user-select: none;

        &:hover {
            color: var(--el-color-primary);
        }
    }
}
</style>
