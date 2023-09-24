<template>
    <div class="loadout">
        <el-popover
            placement="bottom"
            :width="150"
            :title="teammate.name + '&nbsp;&nbsp;' + teammate.level"
            trigger="hover"
        >
            <template #reference>
                <el-image
                    shape="sqare"
                    :src="src"
                    :style="{ width: size, height: size }"
                ></el-image
            ></template>
            <slot name="loadout"> </slot>
        </el-popover>
    </div>
</template>

<script setup lang="ts">
const IMAGE_ORIGIN = import.meta.env.VITE_APP_IMAGE_ORIGIN as string
import { type TeamMate } from '@/composables/types'

const props = defineProps({
    teammate: {
        type: Object as PropType<TeamMate>,
        default: '一般路过Tenno',
    },
    size: {
        type: String,
        default: '2.5em',
    },
})

const src = computed(() => {
    return IMAGE_ORIGIN + '/warframe/' + props.teammate.warframe.en + '.webp'
})
</script>

<style lang="scss" scoped>
.loadout {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2) inset;
    border-radius: 3px;
}
</style>
