<template>
    <div class="vertical-middle">
        <el-input
            v-if="reviseNameForm.inputVisible"
            :size="inputSize"
            v-model="reviseNameForm.name"
            placeholder="按回车提交"
            @keyup.enter="submit()"
            @keyup.escape="toggleInputVisible(false)"
            ref="inputRef"
        ></el-input>
        <div v-else class="font-bold" @dblclick="toggleInputVisible(true)">
            {{ _authStore.getName() }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { SaveMyProfile } from '@/api/account'
import { authStore } from '@/store'
import type { response } from '@/composables/types'
import type { UserVO } from '@/composables/user'
defineProps({
    inputSize: {
        type: String,
        default: 'default',
    },
})
const _authStore = authStore()
const reviseNameForm = reactive({
    uuid: '',
    name: '',
    inputVisible: false,
})
const submit = async () => {
    reviseNameForm.uuid = _authStore.getUUID()
    const result = (await SaveMyProfile(reviseNameForm)) as response<UserVO>
    if (result.success) {
        _authStore.setUser(result.data)
        reviseNameForm.name = ''
        toggleInputVisible(false)
    }
}

const inputRef = ref<HTMLInputElement>()
const toggleInputVisible = (visible: boolean) => {
    reviseNameForm.inputVisible = visible
    if (reviseNameForm.inputVisible) {
        nextTick(() => {
            inputRef.value?.focus()
        })
    }
}
</script>

<style lang="scss" scoped></style>
