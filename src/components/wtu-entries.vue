<template>
    <div class="entries">
        <div
            :class="{ activated: isDurivi }"
            class="entry"
            @click="navi(entries.durivi)"
        >
            <img
                :style="{ transform: `scale(${scale})` }"
                src="@img/durivi.png"
                alt="双衍王境"
            />
        </div>
        <div
            :class="{ activated: isEmpyrean }"
            class="entry"
            @click="navi(entries.empyrean)"
        >
            <img
                :style="{ transform: `scale(${scale})` }"
                src="@img/railjet.png"
                alt="九重天"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import entries from '@/composables/entries'
import router from '@/router'
defineProps({
    scale: {
        type: Number,
        default: 1,
    },
})
const isDurivi = computed(
    () => router.currentRoute.value.name === entries.durivi
)
const isEmpyrean = computed(
    () => router.currentRoute.value.name === entries.empyrean
)

const navi = (entry: string) => {
    if (router.currentRoute.value.name === entry) {
        router.push({ name: entries.origin })
        return
    }
    router.push({ name: entry })
}
</script>

<style lang="scss" scoped>
.entries {
    display: flex;
    grid-gap: 1rem;
    align-items: center;
    user-select: none;
    .activated {
        background-color: var(--el-color-primary);
        width: 200px !important;
    }

    .entry {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 130px;
        height: 50px;
        border-radius: 0.5rem;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        cursor: pointer;
        transition: all 0.3s ease-in-out;

        &:hover {
            img {
                transform: scale(1.1);
            }
        }

        img {
            user-select: none;
            object-fit: cover;
            transition: all 0.3s ease-in-out;
        }

        .state {
            padding: 0 20px;
            word-wrap: nowrap;
            user-select: none;
        }
    }
}
</style>
