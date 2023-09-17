<template>
    <div class="logo-wrapper">
        <el-tooltip :content="content">
            <ryu-svg @click="toggleDark()" name="warframe" size="3em" class="cursor-pointer"></ryu-svg>
        </el-tooltip>
        <el-tooltip content="返回主页">
            <span @click="backToHome"
                class="name hover-color-blue text-size-[1.37em] ml-0.5em cursor-pointer select-none font-smiley ">
                Warframe Team Up
            </span>
        </el-tooltip>
    </div>
</template>

<script setup lang="ts">
import { toggleDark, isDark } from '@/composables/theme'
import router from '@/router';

const content = computed(() =>
    isDark.value ? '切换为白昼模式' : '切换为夜间模式'
)

const backToHome = () => {
    router.push({ path: '/' })
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 868px) {
    .name {
        display: none !important;
    }
}

.logo-wrapper {
    text-align: center;

    * {
        vertical-align: middle;
    }

}
</style>
