<template>
    <el-row class="h-120px">
        <el-col :span="4" class="flex-center">
            <div>
                <div class="mb-0.5em font-smiley">社区</div>
                <div class="inline">
                    <el-text>qq群@</el-text>
                    <el-tooltip :content="copied ? '已复制 ✔' : '点击复制'">
                        <el-text @click="copy" class="c-p hover-underline"
                            >376878510</el-text
                        >
                    </el-tooltip>
                </div>
                <span class="opacity-50">&nbsp;|&nbsp;</span>
                <el-text>
                    <a
                        href="https://kook.top/ZgEao3"
                        class="hover-underline c-p"
                    >
                        KOOK组队频道
                    </a>
                </el-text>
            </div>
        </el-col>
        <el-col :span="4" class="flex-center">
            <div>
                <div class="mb-0.5em font-smiley">关于作者</div>
                <el-text>
                    bilibili@<a
                        href="https://space.bilibili.com/471857522"
                        class="color-blue hover-underline"
                        >粉丝拌饭
                    </a>
                </el-text>
                <span class="opacity-50">&nbsp;|&nbsp;</span>
                <el-text>
                    github@<a
                        href="https://github.com/Ryuuki6602"
                        class="color-blue hover-underline"
                        >Ryuuki6602</a
                    >
                </el-text>
            </div>
        </el-col>
        <el-col :span="4" class="flex-center">
            <div>
                <div class="mb-0.5em font-smiley">赞助者关系</div>
                <el-text
                    @click="participate()"
                    class="color-blue c-p hover-underline"
                >
                    赞助者
                </el-text>
            </div>
        </el-col>
        <el-col :span="12" class="flex-center flex-col">
            <div>
                <RyuBeian class="display-block" />

                <div class="mt-0.5em">
                    <el-text type="info">
                        我们
                        <el-text type="primary">尊重</el-text>
                        您的私人空间与隐私信息，
                    </el-text>

                    <el-text type="info">
                        若要启用网站全部功能，请
                        <el-text type="primary">允许</el-text>
                        我们向您<el-text
                            type="primary"
                            class="c-p"
                            @click="acquireNotificationPermission()"
                            >&nbsp;发送通知消息</el-text
                        >&nbsp;及&nbsp;<el-text
                            type="primary"
                            class="c-p"
                            @click="acquireClipboardPermission()"
                            >访问剪贴板</el-text
                        >
                    </el-text>
                </div>
            </div>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import { useWebNotification, UseWebNotificationOptions } from '@vueuse/core'
import router from '@/router'
const notification: UseWebNotificationOptions = {
    title: '',
    body: '',
    dir: 'auto',
    lang: 'zh',
    renotify: false,
}
const { isSupported, show, ensurePermissions } =
    useWebNotification(notification)

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
const acquireNotificationPermission = () => {
    ensurePermissions().then(() => {
        if (isSupported.value) {
            show({
                title: '通知权限已获取',
                body: '您可以在浏览器设置中关闭通知权限',
            })
        }
    })
}
const participate = () => {
    router.push({ name: 'sponsor' })
}
const acquireClipboardPermission = () => {
    navigator.clipboard.writeText('Warframe.Team.Up')
}
</script>

<style lang="scss" scoped></style>
