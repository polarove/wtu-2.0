<template>
    <div class="focus">
        <ryu-svg :name="name" :size="size" />
        <div v-if="showName" class="text-center">
            <span>
                {{ simplified ? findSimplifiedChar(name) : name }}
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { focus } from '@/composables/focus'
import { authStore } from '@/store'
const _authStore = authStore()
defineProps({
    name: {
        type: String,
        default: 'any',
        required: true,
    },
    size: {
        type: String,
    },
    showName: {
        type: Boolean,
        default: false,
    },
    simplified: {
        type: Boolean,
        default: true,
    },
})

const findSimplifiedChar = (char: string) => {
    let temp = focus.find((item) => item.en === char)
    return _authStore.getServer() ? temp?.en_simplified : temp?.cn_simplified
}
</script>

<style lang="scss" scoped>
.focus {
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    &:hover {
        color: var(--el-color-primary);
    }
}
</style>
