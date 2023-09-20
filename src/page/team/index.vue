<template>
    <WtuHeader />
    <div class="wrapper">
        <div class="inner-header">
            <div>
                <span>我</span>
                <span>队友1</span>
                <span>队友2</span>
                <span>队友3</span>
            </div>
            <WtuEntries />
        </div>
        <RouterView />
        <WtuFooter />
    </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.wrapper {
    padding: 1em 2em;

    .inner-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1em;

        span {
            margin-right: 1em;
        }
    }
}
</style>
