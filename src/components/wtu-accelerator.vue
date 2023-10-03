<template>
    <div>
        <ryu-svg name="lightning" @click="visible = true" size="1.5em" />
        <el-drawer
            append-to-body
            v-model="visible"
            :size="_layoutStore.isWide() ? '40%' : '100%'"
            destroy-on-close
        >
            <template #header>
                <span>当前选择：{{ _authStore.getAccelerator() }}</span>
            </template>
            <el-select
                v-model="text"
                filterable
                loading-text="加载中..."
                no-match-text="空"
                no-data-text="无数据"
                placeholder="选择加速器"
                clearable
                :remote-method="filter"
                :loading="loading"
                @clear="reset()"
                @change="confirm($event)"
                class="search"
                style="width: 100%"
                size="large"
            >
                <el-option
                    v-for="(item, index) in accelerators"
                    :key="index"
                    :label="item.name"
                    :value="item.name"
                />
            </el-select>
            <ul style="overflow: auto; padding-left: 0px" v-if="isBlank(text)">
                <el-row>
                    <el-col
                        :span="8"
                        v-for="(item, index) in accelerators"
                        :key="index"
                        class="infinite-list-item inline-block mt-15px w-100px text-center"
                    >
                        <div
                            class="cursor-pointer hover-color-blue"
                            :class="{
                                active:
                                    _authStore.getAccelerator() === item.name,
                            }"
                            @click="confirm(item.name)"
                        >
                            {{ item.name }}
                        </div>
                    </el-col>
                    <el-col :span="24" class="text-center mt-25px color-gray">
                        没有找到？进群反馈: 376878510
                    </el-col>
                </el-row>
            </ul>
            <template #footer>
                <div class="flex-between"><ryu-sponsor /></div>
            </template>
        </el-drawer>
    </div>
</template>

<script setup lang="ts">
import { accelerators } from '@/composables/accelerator'
import { UpdateUserAccelerator } from '@/api/account'
import { isBlank } from '@/util/StrUtil'
import { authStore, layoutStore } from '@/store'
const _authStore = authStore()
const _layoutStore = layoutStore()
const visible = ref<boolean>(false)
const text = ref<string>('')
const loading = ref<boolean>(false)
const filter = (query: string) => {
    loading.value = true
    accelerators.filter((item) => item.toString().includes(query))
    loading.value = false
}
const reset = () => {
    text.value = ''
}

const confirm = (name: string) => {
    visible.value = false
    reset()
    _authStore.setAccelerator(name)
    UpdateUserAccelerator(name)
}
</script>

<style lang="scss" scoped>
.active {
    color: var(--el-color-primary);
}
</style>
