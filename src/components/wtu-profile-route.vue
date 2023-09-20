<template>
    <div class="routes" :class="{ horizental: isHorizental, vertical: isVertical }">
        <span :class="{ active: route.name === routes.name }" class="route" @click="router.push({ name: route.name })"
            v-for="route in childRoutes">
            {{ route.meta.forehead }}
        </span>
    </div>
</template>
  
<script setup lang='ts'>
import router from '@/router';
const routes = useRoute()
const parentRoute = routes.matched[0]
const childRoutes = reactive<Array<any>>([]);
const props = defineProps({
    direction: {
        type: String,
        default: 'horizontal'
    }
})
const isHorizental = computed(() => props.direction === 'horizontal')
const isVertical = computed(() => props.direction === 'vertical')
routes.matched.find(item => item.name === parentRoute.name)?.children.forEach(item => {
    childRoutes.push(item)
})
</script>
  
<style lang='scss' scoped>
.routes {
    .active {
        background-color: var(--el-color-primary) !important;
        color: var(--el-color-white);
    }

    .route {
        text-align: center;
        background-color: var(--el-bg-color);
        font-size: 1.2em;
        padding: 0 0.5em;
        margin: 0 0.5em;
        border-radius: 0.5em 0.5em 0 0;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        font-size: 1.3em;

        &:hover {
            background-color: var(--el-color-primary);
            color: var(--el-color-white);
        }
    }
}

.horizental {
    display: inline-block;
    transform: translateY(-3.5px);
}

.vertical {
    display: flex;
    flex-direction: column;
    align-items: center;

    .route {
        margin: 0.2em 0;
        border-radius: 0.5em 0 0 0.5em;
    }
}
</style>