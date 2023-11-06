<template>
    <div>
        <a href="https://beian.miit.gov.cn/" class="vertical-middle">
            <img id="police" class="icon" src="@img/police.png" />
            <span id="beianhao">闽ICP备&nbsp;2021003148号</span>
        </a>
    </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
#police {
    width: 20px;
}

#beianhao {
    color: var(--el-text-color-primary);

    &:hover {
        color: var(--el-color-primary);
    }
}
</style>
