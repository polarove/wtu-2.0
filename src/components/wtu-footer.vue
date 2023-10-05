<template>
    <div class="footer">
        <div class="ma-1em">
            <el-text type="info"
                >我们<el-text type="primary">尊重</el-text
                >您的私人空间与隐私信息，</el-text
            >

            <el-text type="info">
                若要启用网站全部功能，请
                <el-text type="primary">允许</el-text>
                我们向您<el-text type="primary">&nbsp;发送通知消息</el-text
                >&nbsp;及&nbsp;<el-text type="primary">访问剪贴板</el-text>
            </el-text>
        </div>
        <div class="flex justify-around w-100%">
            <RyuBeian />
            <div>
                <el-tooltip :content="copied ? '已复制 ✔' : '点击复制'">
                    <el-text @click="copy" class="c-p hover-color-blue">
                        qq群@376878510
                    </el-text>
                </el-tooltip>
            </div>
            <div>
                <el-text
                    >bilibili@<a
                        href="https://space.bilibili.com/471857522"
                        class="color-blue hover-underline"
                        >粉丝拌饭
                    </a></el-text
                >
            </div>
            <div>
                <el-text
                    >github@<a
                        href="https://github.com/Ryuuki6602"
                        class="color-blue hover-underline"
                        >Ryuuki6602</a
                    ></el-text
                >
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const copied = ref(false)
const copy = () => {
    navigator.clipboard
        .writeText('376878510')
        .then(() => {
            copied.value = true
        })
        .finally(() => {
            setTimeout(() => {
                copied.value = false
            }, 3000)
        })
}
</script>

<style lang="scss" scoped>
.footer {
    width: 100%;
    padding: 20px 0;
    background-color: var(--el-bg-color);
    text-decoration: none;
    color: var(--el-text-color-primary);
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
}
</style>
