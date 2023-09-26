<template>
    <div class="copy" :style="{ fontSize: fontSize }">
        <span @click="copy()" class="hover-color-blue">
            {{ prefix }}&nbsp;{{ content }}
        </span>
        <div>
            <div
                :class="checked"
                class="color-green-500 text-size-[1.4em]"
                v-if="copied"
                @click="copy()"
            ></div>
            <div
                :class="icon"
                v-else
                class="text-size-[1.4em]"
                @click="copy()"
            ></div>
            <slot name="append"></slot>
        </div>
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
        required: true,
    },
    checked: {
        type: String,
        required: true,
    },
    fontSize: {
        type: String,
        default: '1em',
    },
})

const copied = ref(false)
const copy = () => {
    navigator.clipboard
        .writeText(props.content)
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
    background-color: #f5f5f5;
    padding: 0.5em;
    border-radius: 0.3em;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
