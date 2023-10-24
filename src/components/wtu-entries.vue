<template>
    <div class="entries">
        <div
            :class="{
                active: isDuviri,
            }"
            class="entry"
            @click="navi(entries.duviri)"
        >
            <el-badge
                :value="clients"
                :max="999"
                :hidden="!isDuviri"
                type="primary"
            >
                <span class="vertical-middle overflow-hidden">
                    <img
                        class="lt-md:scale-80"
                        src="@img/duviri.png"
                        alt="双衍王境"
                    />
                </span>
                <span v-if="route.name === entries.duviri">
                    {{ map.get(_activityStore.getDuviState()) }}
                </span>
            </el-badge>
        </div>
        <div
            :class="{ active: isEmpyrean }"
            class="entry"
            @click="navi(entries.empyrean)"
        >
            <el-badge
                :value="clients"
                :max="999"
                :hidden="!isEmpyrean"
                type="primary"
            >
                <img
                    class="lt-md:scale-80"
                    src="@img/railjet.png"
                    alt="九重天"
                />
            </el-badge>
        </div>
    </div>
</template>

<script setup lang="ts">
import entries from '@/composables/entries'
import router from '@/router'
import { activityStore } from '@/store'
const _activityStore = activityStore()
const route = useRoute()
enum Duviris {
    joy = '喜悦',
    anger = '愤怒',
    sorrow = '悲伤',
    fear = '恐惧',
    envy = '嫉妒',
}

const map = new Map<string, string>(Object.entries(Duviris))

defineProps({
    clients: {
        type: Number,
        default: 0,
    },
})

const isDuviri = computed(
    () => router.currentRoute.value.name === entries.duviri
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

    .active {
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
        background-color: var(--el-bg-color-overlay);
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
    }
}
</style>
