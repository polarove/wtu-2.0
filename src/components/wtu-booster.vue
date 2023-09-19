<template>
    <div class="flex-column">
        <img :src="src">
        <span>{{ days }}</span>
    </div>
</template>
  
<script setup lang='ts'>
defineProps({
    src: { type: String, required: true },
    days: { type: Number || null, default: null }
})
</script>
  
<style lang='scss' scoped></style>