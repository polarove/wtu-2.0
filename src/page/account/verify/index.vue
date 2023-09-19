<template>
    <div class='page-account-verify'>
        <div class="i-ep:loading text-size-[3rem] rotating" :class="{ invisible: verificationStatus.compeleted }"></div>
        <div class="animate__animated animate__tada display-none" :class="{ visible: verificationStatus.succeed }">
            <div class="i-ep:check text-size-[3rem]"></div>
            <div>{{ verificationStatus.message }}</div>
        </div>
        <div class="animate__animated animate__bounce display-none" :class="{ visible: verificationStatus.failed }">
            <div class="i-ep:close text-size-[3rem] "></div>
            <div>{{ verificationStatus.message }}</div>
        </div>
        <div class="animate__animated animate__bounceIn display-none" :class="{ visible: verificationStatus.duplicated }">
            <div class="i-ant-design:info-circle-outlined text-size-[3rem] "></div>
            <div>{{ verificationStatus.message }}</div>
        </div>
    </div>
</template>
  
<script setup lang='ts'>
import router from "@/router";
import { Verify } from "@api/account"
import type { response } from "@composables/types"

const email = router.currentRoute.value.query.email as string
const uuid = router.currentRoute.value.query.uuid as string


const verificationStatus = reactive({
    compeleted: false,
    succeed: false,
    failed: false,
    duplicated: false,
    message: ''
})

const verificationForm = reactive({
    email: email,
    uuid: uuid
})



const verify = async () => {
    const result = await Verify(verificationForm) as response
    verificationStatus.message = result.message
    if (result.code == 204) {
        setTimeout(() => {
            verificationStatus.compeleted = true
            verificationStatus.succeed = true
        }, 2000);
    } else if (result.code == 205) {
        setTimeout(() => {
            verificationStatus.compeleted = true
            verificationStatus.duplicated = true
        }, 2000);
    } else if (result.code == 206) {
        setTimeout(() => {
            verificationStatus.compeleted = true
            verificationStatus.failed = true
        }, 2000);
    }
}
verify()
</script>
  
<style lang='scss' scoped>
.page-account-verify {
    text-align: center;
}

.rotating {
    animation: rotating 3s linear infinite;
}

.visible {
    display: inline-block;
}

.invisible {
    display: none;
}

@keyframes rotating {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>