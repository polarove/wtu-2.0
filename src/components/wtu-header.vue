<template>
    <el-row class="wtu-header" :style="{ boxShadow: isDark ? '' : '0 2px 12px 0 rgba(0, 0, 0, 0.1)' }">
        <el-col :span="5" class="flex-center">
            <WtuLogo></WtuLogo>
        </el-col>
        <el-col :span="12">

        </el-col>
        <!-- <div class="flex-1"></div> -->
        <el-col :span="7" class="flex-center">
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
