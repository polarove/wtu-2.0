<template>
    <div>
        <div v-for="plat in map">
            <el-tooltip :content="plat[0]">
                <ryu-svg
                    :class="{
                        active: _authStore.getPlatform() === plat[1],
                    }"
                    class="c-p hover-color-blue"
                    @click="togglePlatform(plat[1])"
                    :name="plat[1]"
                    :size="size"
                ></ryu-svg>
            </el-tooltip>
        </div>
    </div>
</template>

<script setup lang="ts">
import { platform } from '@/composables/enums'
import { authStore } from '@/store'
import { TogglePlatform } from '@api/account'
const _authStore = authStore()
const map = new Map<string, string>()
Object.keys(platform).map((key) =>
    map.set(key, platform[key as keyof typeof platform])
)

defineProps({
    size: {
        type: String,
        default: '1.7em',
    },
})

const togglePlatform = (platform: string) => {
    _authStore.setPlatform(platform)
    TogglePlatform(platform)
}
</script>

<style lang="scss" scoped>
.active {
    color: var(--el-color-primary);
}
</style>
