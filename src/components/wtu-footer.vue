<template>
    <div class="footer">
        <RyuBeian />
        <div class="tips">
            <el-text class="display-block" type="info"
                >我们<el-text type="primary">尊重</el-text
                >您的私人空间与隐私信息</el-text
            >
            <div class="mt-0.5em mb-0.5em"></div>
            <el-text class="display-block" type="info">
                若要启用网站全部功能，请
                <el-text type="primary">允许</el-text>
                我们向您<el-text type="primary">发送通知消息</el-text
                >&nbsp;及&nbsp;<el-text type="primary">访问剪贴板</el-text>
            </el-text>
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.footer {
    width: 100%;
    text-align: center;
    padding: 20px 0;
    background-color: var(--el-bg-color);
    text-decoration: none;
    color: var(--el-text-color-primary);

    .tips {
        margin-top: 1em;
        font-size: 0.7em;
    }
}
</style>
