<template>
    <div class="app">
        <wtu-server class="server" v-if="showServer" />
        <span @click="backToHome" class="name font-smiley">
            Warframe Team Up
        </span>
    </div>
</template>

<script setup lang="ts">
import router from '@/router'
const route = useRoute()
const showServer = computed(() => {
    return route.matched[0].name !== 'account'
})

const backToHome = () => {
    router.push({ path: '/' })
}
</script>

<style lang="scss" scoped>
.app {
    min-width: 150px;
    margin-left: 0.5em;

    user-select: none;
    text-align: center;
    .name {
        white-space: nowrap;
        cursor: pointer;
        font-size: 1.37em;
        &:hover {
            color: var(--el-color-primary);
        }
    }
    .server {
        display: block;
        font-size: 1.17em;
    }
}
</style>
