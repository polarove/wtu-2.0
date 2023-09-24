<template>
    <el-row>
        <el-col
            :span="rows === 1 ? 4 : 8"
            v-for="len in focus"
            class="focus"
            :style="{ opacity: modelValue !== len.en ? 0.25 : 1 }"
            @click="$emit('update:modelValue', len.en)"
        >
            <RyuSvg :name="len.en" :size="size" />
            <div v-if="showName" class="text-center">
                {{ len.label }}
            </div>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import { focus } from '@composables/focus'
defineProps({
    modelValue: {
        type: String,
        default: '',
    },
    rows: {
        type: Number,
        default: 1,
    },
    size: {
        type: String,
        default: '1em',
    },
    showName: {
        type: Boolean,
        default: true,
    },
})
</script>

<style lang="scss" scoped>
.focus {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    &:hover {
        color: var(--el-color-primary);
        opacity: 1 !important;
    }
}
</style>
