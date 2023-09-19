<template>
    <WtuHeader></WtuHeader>
    <div class="banner-wrapper">
        <img src="@img/banner/ivara.jpg" />
    </div>
    <div class="wrapper">
        <WtuAvatar :PopDisabled="true" shape="circle" :size="150" />
        <RouterView />
    </div>
</template>
  
<script setup lang='ts'>



</script>
  
<style lang='scss' scoped>
.banner-wrapper {
    height: 467px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.wrapper {
    padding: 2em 2em;
}
</style>