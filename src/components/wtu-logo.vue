<template>
    <div class="logo-wrapper">
        <el-tooltip :content="content" v-if="showLogo">
            <ryu-svg
                @click="toggleDark()"
                name="warframe"
                size="3rem"
                class="cursor-pointer"
            ></ryu-svg>
        </el-tooltip>
        <WtuAppname v-if="showTitle" class="invisible-min-900px" />
    </div>
</template>

<script setup lang="ts">
import { toggleDark, isDark } from '@composables/theme'
defineProps({
    showLogo: {
        type: Boolean,
        default: true,
    },
    showTitle: {
        type: Boolean,
        default: true,
    },
})

const content = computed(() =>
    isDark.value ? '切换为白昼模式' : '切换为夜间模式'
)
</script>

<style lang="scss" scoped>
.logo-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
