<template>
    <div>
        <span
            class="i-ant-design:question-circle-outlined"
            @click="visible = true"
        ></span>
        <el-drawer
            append-to-body
            v-model="visible"
            :size="_layoutStore.isWide() ? '40%' : '100%'"
        >
            <template #header> <div>常见问题 Q&A</div></template>
            <el-card v-for="z in qa" class="mb-2em">
                <template #header>
                    <span class="text-size-[1.5em]">Q: {{ z.q }} </span>
                </template>
                <span class="text-size-[1.2em]"> A: {{ z.a }}</span>
            </el-card>
            <template #footer>
                <div class="flex-between"><ryu-sponsor /></div>
            </template>
        </el-drawer>
    </div>
</template>

<script setup lang="ts">
import { qa } from '@composables/qa'
import { layoutStore } from '@/store'
const _layoutStore = layoutStore()

const visible = ref<boolean>(false)
</script>

<style lang="scss" scoped></style>
