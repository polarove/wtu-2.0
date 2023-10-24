<template>
    <div
        :class="{
            horizental: direction === DIRECTION_ENUM.horizental,
            vertical: direction === DIRECTION_ENUM.vertical,
        }"
    >
        <wtu-booster
            v-for="(booster, index) in boosters"
            :key="index"
            :src="hasBooster(booster.en) ? booster.valid : booster.invalid"
            :active="hasBooster(booster.en)"
            @click="$emit('toggle', booster.en)"
            :size="size"
            class="icon"
        />
    </div>
</template>

<script setup lang="ts">
import { boosters } from '@composables/booster'
import { UserBooster } from '@/composables/user'
import { BOOSTER_STATUS, DIRECTION_ENUM } from '@composables/enums'

const props = defineProps({
    booster: {
        type: Object as PropType<UserBooster>,
        required: true,
    },
    size: {
        type: String,
        default: '2em',
    },
    direction: {
        type: Number,
        default: 1,
    },
})
const hasBooster = (bo: string) => {
    return props.booster[bo as keyof UserBooster] === BOOSTER_STATUS.ACTIVE
}
</script>

<style lang="scss" scoped>
.horizental {
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.vertical {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    .icon {
        margin: 3px 0;
    }
}
</style>
