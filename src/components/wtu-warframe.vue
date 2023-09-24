<template>
    <div
        @click="$emit('update:modelValue', modelValue)"
        :style="{ width: width }"
        class="warframe-wrapper"
    >
        <el-avatar class="icon" :src="src" :size="size" :shape="shape" />
        <div class="text" v-if="showName">
            {{ modelValue[_authStore.getServerChar()] }}
        </div>
    </div>
</template>

<script setup lang="ts">
const IMAGE_ORIGIN = import.meta.env.VITE_APP_IMAGE_ORIGIN as string
import type { warframe } from '@/composables/warframe'
import { authStore } from '@/store'
const _authStore = authStore()
const props = defineProps({
    modelValue: {
        type: Object as PropType<warframe>,
        default: {
            en: 'any',
            cn: '任意',
            durivi: false,
        },
    },
    shape: {
        type: String,
        default: 'square',
    },
    width: {
        type: String,
        default: '60px',
    },
    size: {
        type: String,
        default: 'large',
    },
    showName: {
        type: Boolean,
        default: true,
    },
})
const src = computed(() => {
    return IMAGE_ORIGIN + '/warframe/' + props.modelValue.en + '.webp'
})
</script>

<style lang="scss" scoped>
.warframe-wrapper {
    cursor: pointer;
    text-align: center;
    text-wrap: pretty;
    &:hover {
        .text {
            color: var(--el-color-primary) !important;
        }
        .icon {
            transform: scale(1.1);
        }
    }

    .text {
        color: rgba(128, 128, 128, 0.75);
        word-wrap: break-word;
    }
    .icon {
        transition: transform 0.1s ease-in-out;
    }
}
</style>
