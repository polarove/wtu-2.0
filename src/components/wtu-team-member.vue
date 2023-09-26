<template>
    <div class="flex-center">
        <el-popover>
            <template #reference>
                <div>
                    <div class="flex-col">
                        <WtuWarframe
                            :modelValue="member.warframe"
                            width="70px"
                            :showName="false"
                        />
                        <div class="invisible-min-900px">
                            <div
                                class="font-bold"
                                v-if="isNotBlank(member.user.name)"
                            >
                                {{ member.user.name }}
                            </div>
                            <div v-else class="color-gray">.....</div>
                        </div>
                    </div>
                </div>
            </template>
            <div class="invisible-max-900px">
                <div class="font-bold" v-if="isNotBlank(member.user.name)">
                    {{ member.user.name }}
                </div>
                <div v-else class="color-gray">.....</div>
            </div>
            <div class="flex-between">
                <div>
                    {{
                        _authStore.getServer()
                            ? member.warframe.en
                            : member.warframe.cn
                    }}
                </div>
                <WtuFocus :name="member.focus" size="2.5em" simplified />
            </div>
        </el-popover>
    </div>
</template>

<script setup lang="ts">
import type { TeamMemberBO } from '@/composables/team'
import { authStore } from '@/store'
import { isNotBlank } from '@/util/StrUtil'
const _authStore = authStore()
defineProps({
    member: {
        type: Object as PropType<TeamMemberBO>,
        required: true,
    },
})
</script>

<style lang="scss" scoped></style>
