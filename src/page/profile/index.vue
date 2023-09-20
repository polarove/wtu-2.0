<template>
    <WtuHeader></WtuHeader>
    <div class="banner-wrapper">
        <img src="@img/banner/ivara.jpg" />
        <WtuProfileRoute direction="vertical" class="absolute-routes" />
    </div>
    <div class="wrapper">
        <div class="avatar">
            <WtuAvatar :PopDisabled="true" shape="circle" :size="150" />
        </div>
        <div class="inline-block">
            <WtuProfileRoute class="hidden-router" />
            <div class="text-size-[2rem] font-bold name">{{ _authStore.getName() }}</div>
            <div class="text-gray">
                <RyuSvg name="quote"></RyuSvg>
                <span>{{ _authStore.getDescription() }}</span>
                <RyuSvg name="quote-rotate-180"></RyuSvg>
            </div>
        </div>
        <RouterView />
    </div>
</template>
  
<script setup lang='ts'>
import { authStore } from '@/store';
const _authStore = authStore();

</script>
  
<style lang='scss' scoped>
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
}

.wrapper {
    padding: 2em 2em;
    transform: translateY(-50%);
}

.avatar {
    display: inline-block;
}

@media screen and (max-width: 768px) {
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
}
</style>