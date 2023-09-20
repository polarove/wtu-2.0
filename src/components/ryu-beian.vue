<template>
    <a href="https://beian.miit.gov.cn/" class="vertical-middle">
        <img id="police" src="@img/police.png">
        <span id="beianhao">闽ICP备2021003148号</span>
    </a>
</template>
  
<script setup lang='ts'>

</script>
  
<style lang='scss' scoped>
#police {
    width: 23px;
    margin-right: 0.5rem;
}


#beianhao {
    color: var(--el-text-color-primary);

    &:hover {
        color: var(--el-color-primary);
    }
}
</style>