<template>
    <div class="wrapper">
        <div class="container">
            <div class="i-ep:close p-a right-20px top-20px c-p hover-color-blue text-size-[1.2em]" @click="close">
            </div>
            <WtuLogo class="mb-1em" />
            <RouterView />
        </div>
        <img src="@img/lunar.png" alt="background" class="background" />
    </div>
    <WtuFooter class="p-a bottom-0 left-0" />
</template>
  
<script setup lang='ts'>
import router from "@/router"
import { authStore } from "@/store";
import { isBlank } from "@/util/StrUtil";

const _authStore = authStore()

const close = () => {
    if (isBlank(_authStore.getUUID())) {
        router.push({ name: 'login' })
    } else {
        router.push({ name: 'origin' })
    }
}

</script>
  
<style lang='scss' scoped>
.wrapper {
    position: relative;
    height: 100vh;

    .background {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -9;
        width: 100%;
        height: 100%;
        object-fit: cover;
        user-select: none;
    }

    .container {
        width: 30vw;
        border-radius: 1em;
        padding: 20px 40px;
        position: absolute;
        background-color: var(--el-bg-color);
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
}
</style>