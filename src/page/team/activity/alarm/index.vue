<template>
    <el-row :gutter="24">
        <el-col :md="8" :sm="24">
            <wtu-cycle-arbitration />
        </el-col>
        <el-col :md="16" :sm="24">
            <wtu-cycle-alerts />
        </el-col>
    </el-row>
    <wtu-team-list />
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
