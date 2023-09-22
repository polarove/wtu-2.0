<template>
    <WtuHeader />
    <div class="selections">
        <WtuDifficulty />
    </div>
    <div class="wrapper">
        <div class="invisible-min-900px">
            <div class="flex-between">
                <div><WtuActivity class="mb-0.5em" /> <WtuTeamSet /></div>
                <WtuEntries />
            </div>
        </div>
        <div class="invisible-max-900px flex-center">
            <div>
                <WtuEntries class="flex-center mb-1.4em" />
                <WtuActivity class="text-center mb-1.4em" />
                <WtuTeamSet class="flex-center" />
            </div>
        </div>
        <RouterView class="ma-auto" />
    </div>
    <WtuFooter />
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.selections {
    position: fixed;
    right: 0.75rem;
    top: 50%;
}
.wrapper {
    margin-top: 1em;
    padding: 1em 2em;
}
</style>
