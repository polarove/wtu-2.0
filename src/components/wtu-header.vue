<template>
    <el-row class="wtu-header" :style="{ boxShadow: isDark ? '' : '0 2px 12px 0 rgba(0, 0, 0, 0.1)' }">
        <el-col :span="5" class="flex-center">
            <WtuLogo />

        </el-col>
        <el-col :span="12" class="flex-center">
            <span class="title text-size-[1.37rem] font-smiley display-none">Warframe Team Up</span>
        </el-col>
        <!-- <div class="flex-1"></div> -->
        <el-col :span="7" class="flex-center p-r">
            <WtuAvatar />
        </el-col>
        <div class="curtain" :style="{ visibility: isDark ? 'visible' : 'hidden' }"></div>
    </el-row>
</template>

<script setup lang="ts">
import { isDark } from '@/composables/theme';


</script>

<style lang="scss" scoped>
.wtu-header {
    height: 67px;

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

@media screen and (max-width: 868px) {
    .title {
        display: inline-block !important;
    }
}
</style>
