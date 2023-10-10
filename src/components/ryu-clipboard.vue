<template>
    <div v-if="visible" class="copy" :style="{ fontSize: fontSize }">
        <span @click="copy()" class="hover-color-blue">
            {{ prefix }}&nbsp;{{ content }}
        </span>
        <div>
            <div
                :class="checked"
                class="color-green-500 text-size-[1.4em] cursor-pointer"
                v-if="copied"
                @click="copy()"
            ></div>
            <div
                :class="icon"
                v-else
                class="text-size-[1.4em] cursor-pointer"
                @click="copy()"
            ></div>
        </div>
    </div>
    <div v-else class="copy">
        <slot name="replacement"></slot>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    content: {
        type: String,
        required: true,
    },
    prefix: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        default: 'i-ep:document',
    },
    checked: {
        type: String,
        default: 'i-ep:document-checked',
    },
    fontSize: {
        type: String,
        default: '1em',
    },
    visible: {
        type: Boolean,
        default: true,
    },
})

const copied = ref(false)
const copy = () => {
    navigator.clipboard
        .writeText(props.prefix + ' ' + props.content)
        .then(() => {
            copied.value = true
        })
        .catch(() => {})
        .finally(() => {})
}
</script>

<style lang="scss" scoped>
.copy {
    margin-top: 0.5em;
    font-size: 1em;
    user-select: none;
    background-color: var(--el-border-color-extra-light);
    padding: 0.5em;
    border-radius: 0.3em;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
