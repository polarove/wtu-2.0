<template>
    <WtuHeader></WtuHeader>
    <div class="banner-wrapper">
        <img src="@img/banner/ivara.jpg" />
        <WtuProfileRoute direction="vertical" class="absolute-routes" />
        <div class="wrapper">
            <div class="avatar">
                <WtuAvatar :PopDisabled="true" shape="circle" :size="150" />
            </div>
            <div class="inline-block">
                <WtuProfileRoute class="hidden-router" />
                <RyuName class="text-size-[2rem] font-bold name" />
                <div class="text-gray">
                    <RyuSvg name="quote"></RyuSvg>
                    <span>{{ _authStore.getDescription() }}</span>
                    <RyuSvg name="quote-rotate-180"></RyuSvg>
                </div>
            </div>
        </div>
    </div>
    <div class="routerview__container">
        <RouterView />
    </div>
</template>

<script setup lang="ts">
import { authStore } from '@/store'
const _authStore = authStore()
</script>

<style lang="scss" scoped>
.banner-wrapper {
    height: 367px;
    position: relative;

    .absolute-routes {
        position: absolute;
        right: 0;
        bottom: 0;
        display: none;
        z-index: 1;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .wrapper {
        position: absolute;
        left: 0;
        bottom: 0;
        transform: translateY(43.3%) translateX(5%);
        .avatar {
            display: inline-block;
        }
    }
}

.routerview__container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 2em;
}

@media screen and (max-width: 1468px) {
    .avatar {
        display: none !important;
    }

    .hidden-router {
        display: none;
    }

    .absolute-routes {
        display: flex !important;
    }

    .name {
        padding: 0 0.5em;
        border-radius: 0.5em 0.5em 0 0;
        background-color: rgba(224, 224, 224, 0.69);
    }
    .wrapper {
        transform: translateY(33.3%) translateX(5%) !important;
    }
}
</style>
