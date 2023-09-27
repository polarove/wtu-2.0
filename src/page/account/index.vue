<template>
    <div class="wrapper">
        <div class="container">
            <div
                class="i-ep:close p-a right-20px top-20px c-p hover-color-blue text-size-[1.2em]"
                @click="close"
            ></div>
            <WtuLogo class="mb-1em" />
            <RouterView />
        </div>
        <img src="@img/lunar.png" alt="background" class="background" />
    </div>
    <WtuFooter class="p-a bottom-0 left-0" />
</template>

<script setup lang="ts">
import router from '@/router'
import { isBlank } from '@/util/StrUtil'
import { authStore } from '@/store'
const _authStore = authStore()
provide('showServer', false)

const close = () => {
    if (isBlank(_authStore.getUUID())) {
        router.push({ name: 'login' })
    } else {
        router.push({ name: 'origin' })
    }
}
</script>

<style lang="scss" scoped>
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
        border-radius: 1em;
        padding: 20px;
        position: absolute;
        background-color: var(--el-bg-color);
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
}

@media screen and (min-width: 768px) {
    .container {
        width: 30vw;
    }
}

@media screen and (max-width: 768px) {
    .container {
        width: 85vw;
    }
}
</style>
