<template>
    <el-breadcrumb separator=">">
        <el-breadcrumb-item
            :to="{ name: route.name }"
            v-for="route in matchedRoutes"
        >
            <span class="hover-color-blue cursor-pointer">
                {{ route.meta.forehead }}
            </span>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
const matchedRoutes = computed(() => {
    return route.matched
})
</script>

<style lang="scss" scoped></style>
