<template>
    <div>
        <el-select
            v-model="text"
            filterable
            loading-text="加载中..."
            no-match-text="空"
            no-data-text="无数据"
            :placeholder="placeholder"
            clearable
            :remote-method="filter"
            :loading="loading"
            @clear="reset()"
            @visible-change="reload($event)"
            @change="getWarframeByName($event)"
            class="search"
            size="large"
        >
            <el-option
                v-for="(name, index) in names"
                :key="index"
                :label="name"
                :value="name"
            />
        </el-select>
        <ul style="overflow: auto; padding-left: 30px" v-if="isBlank(text)">
            <div
                v-for="(warframe, index) in warframes"
                :key="index"
                class="infinite-list-item inline-block mt-15px"
            >
                <div v-if="route.name === entries.durivi">
                    <wtu-warframe
                        :modelValue="warframe"
                        width="130px"
                        @click="select(warframe)"
                    />
                </div>
                <div v-else>
                    <wtu-warframe
                        :style="{
                            display: isStalker(warframe.en) ? 'none' : 'block',
                        }"
                        :modelValue="warframe"
                        width="130px"
                        @click="select(warframe)"
                    />
                </div>
            </div>
        </ul>
        <div class="flex-center h-70vh" v-else>
            <wtu-warframe
                :modelValue="targetWarframe"
                width="140px"
                style="transform: scale(2.4)"
                @click="confirm()"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { warframes, type warframe } from '@composables/warframe'
import {
    filterWarframeNameList,
    isStalker,
    searchWarframe,
} from '@util/WarframeUtil'
import { authStore } from '@/store'
import entries from '@/composables/entries'
import { isBlank } from '@/util/StrUtil'
const _authStore = authStore()
const route = useRoute()
const emit = defineEmits(['updateModelValue', 'emitToggleWarframeDrawer'])
const targetWarframe = ref<warframe>({
    en: '',
    cn: '',
})

defineProps({
    language: {
        type: String,
        default: 'en',
    },
    placeholder: {
        type: String,
        default: '选择一个战甲',
    },
})
const loading = ref<boolean>(false)
const text = ref<string>('')
const names = ref<Array<string>>([])
const rotueName = computed(() => route.name)

const filter = (query: string) => {
    loading.value = true
    names.value = filterWarframeNameList(
        rotueName.value?.toString() as string,
        query
    )
    loading.value = false
}
filter('')

const reset = () => {
    targetWarframe.value = {
        en: '',
        cn: '',
    }
}

const select = (warframe: warframe) => {
    text.value = warframe[_authStore.getServerChar()]
    targetWarframe.value = {
        ...warframe,
    }
}

const reload = (visible: boolean): void => {
    if (visible) {
        filter(text.value)
    }
}

const getWarframeByName = (name: string) => {
    if (isBlank(name)) {
        return
    }
    const warframe = searchWarframe(name)
    if (warframe) {
        targetWarframe.value = warframe
    }
}

const confirm = () => {
    emit('updateModelValue', targetWarframe.value)
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
