<template>
    <div class="wrapper">
        <div class="container">
            <WtuLogo class="mb-1em" />
            <RouterView />
        </div>
        <img src="@img/lunar.png" alt="background" class="background" />
    </div>
    <WtuFooter />
</template>
  
<script setup lang='ts'>

</script>
  
<style lang='scss' scoped>
.wrapper {
    position: relative;
    width: 100vw;
    height: 100vh;

    .background {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -9;
        width: 100%;
        height: 100%;
        object-fit: cover;
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