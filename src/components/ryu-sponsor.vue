<template>
    <div class="sponsorship">
        <span class="text" @click="sponsorDialog.visible = true"
            >制作不易，赞助作者</span
        >
    </div>

    <el-dialog v-model="sponsorDialog.visible" title="你好👋Tenno👋" center>
        <div>如果你觉得这个网站对你有帮助，可以赞助作者orz，谢谢！🎉🎉🎉</div>
        <div class="flex-around">
            <img src="@img/sponsorship/payment_alipay.jpg" class="payment" />
            <img src="@img/sponsorship/payment_wechat.jpg" class="payment" />
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button
                    type="success"
                    @click="sponsorDialog.visible = false"
                >
                    完成
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
const sponsorDialog = reactive({
    visible: false,
})
</script>

<style lang="scss" scoped>
.sponsorship {
    height: 20px;
    .text {
        cursor: pointer;
        &:hover {
            color: var(--el-color-primary);
        }
        font-size: 12px;
        color: #999;
    }
}
.payment {
    width: 180px;
}
</style>
