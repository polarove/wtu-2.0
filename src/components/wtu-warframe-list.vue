<template>
    <div>
        <el-select
            v-model="text"
            filterable
            loading-text="加载中..."
            no-match-text="空"
            no-data-text="无数据"
            placeholder="选择一个战甲"
            clearable
            :remote-method="filter"
            :loading="loading"
            @change="filterWarframeList()"
            @clear="reset()"
            class="search"
        >
            <el-option
                v-for="(name, index) in names"
                :key="index"
                :label="name"
                :value="name"
            />
        </el-select>
        <ul
            class="infinite-list"
            style="overflow: auto"
            v-if="targetWarframe.en === 'any'"
        >
            <div
                v-for="(warframe, index) in warframes"
                :key="index"
                class="infinite-list-item inline-block mr-3 mt-3"
            >
                <div v-if="route.name === entries.durivi">
                    <WtuWarframe
                        :target="warframe"
                        width="130px"
                        @click="select(warframe)"
                    />
                </div>
                <div v-else>
                    <WtuWarframe
                        :style="{
                            display: warframe.durivi ? 'none' : '',
                        }"
                        :target="warframe"
                        width="130px"
                        @click="select(warframe)"
                    />
                </div>
            </div>
        </ul>
        <div class="flex-center h-70vh">
            <WtuWarframe
                :target="targetWarframe"
                width="130px"
                style="transform: scale(2.5)"
                @click="confirm()"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { warframes, type warframe } from '@composables/warframe'
import { getWarframeList, getWarframe } from '@util/WarframeUtil'
import { authStore } from '@/store'
import entries from '@/composables/entries'
const _authStore = authStore()
const route = useRoute()
const emit = defineEmits(['updateSelection', 'emitToggleWarframeDrawer'])
const targetWarframe = ref<warframe>({
    en: 'any',
    cn: '任意',
    durivi: false,
})

defineProps({
    language: {
        type: String,
        default: 'en',
    },
})
const loading = ref<boolean>(false)
const text = ref<string>('')
const names = ref<Array<string>>([])

const filter = (query: string) => {
    loading.value = true
    names.value = getWarframeList(
        false,
        _authStore.getServerChar() as keyof warframe,
        query
    )
    loading.value = false
}
filter('')

const filterWarframeList = () => {
    targetWarframe.value = getWarframe(
        text.value,
        _authStore.getServerChar() as keyof warframe
    )
}

const reset = () => {
    targetWarframe.value = {
        en: 'any',
        cn: '任意',
        durivi: false,
    }
}

const select = (warframe: warframe) => {
    text.value = warframe[
        _authStore.getServerChar() as keyof warframe
    ] as string
    targetWarframe.value = {
        ...warframe,
    }
}

const confirm = () => {
    emit('updateSelection', targetWarframe)
    emit('emitToggleWarframeDrawer')
}
</script>

<style lang="scss" scoped>
.search {
    position: absolute;
    top: 4em;
    width: 90%;
}
</style>
