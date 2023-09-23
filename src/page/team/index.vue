<template>
    <WtuHeader />
    <div class="selections">
        <WtuDifficulty />
    </div>
    <div class="wrapper">
        <div :class="{ wideScreen: wideMode, compactScreen: !wideMode }">
            <div>
                <WtuBreadcrumb />
                <WtuActivity class="mb-0.5em mt-0.5em" />
                <WtuTeamSet />
            </div>
            <WtuEntries
                :class="{ compactOnly: !wideMode }"
                :scale="wideMode ? 1 : 0.8"
            />
        </div>
        <RouterView class="ma-auto" />
    </div>
    <WtuFooter />
</template>

<script setup lang="ts">
const wideMode = ref(true)

const initLayouts = () => {
    if (document.body.clientWidth < 900) {
        wideMode.value = false
    } else {
        wideMode.value = true
    }
}
window.addEventListener('resize', () => {
    initLayouts()
})

onMounted(() => {
    initLayouts()
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', () => {
        initLayouts()
    })
})
</script>

<style lang="scss" scoped>
.selections {
    position: fixed;
    right: 0.75rem;
    top: 50%;
}
.wrapper {
    padding: 1em 2em;
    .wideScreen {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .compactScreen {
        display: flex;
        flex-direction: column-reverse;
        justify-content: center;
        align-items: center;
    }

    .compactOnly {
        margin: 1em 0;
    }
}
</style>
