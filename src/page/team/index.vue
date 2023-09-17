<template>
    <WtuHeader />
    <div class="wrapper">
        <div class="entries-wrapper">
            <WtuEntries class="entries" />
        </div>
        <RouterView />
        <WtuFooter />
    </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.wrapper {
    padding: 2rem 1rem;

    .entries-wrapper {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
}
</style>
