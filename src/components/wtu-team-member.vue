<template>
    <div class="flex-center">
        <el-popover>
            <template #reference>
                <div>
                    <div class="flex-col" v-if="member.user.name !== null">
                        <el-avatar
                            :src="member.user.avatar"
                            shape="square"
                            size="large"
                        ></el-avatar>
                        <div class="invisible-min-900px">
                            {{ member.user.name }}
                        </div>
                    </div>
                    <div class="flex-col" v-else>
                        <WtuWarframe
                            :modelValue="member.warframe"
                            width="70px"
                            :showName="false"
                        />
                        <div class="color-gray invisible-min-900px">
                            等待加入
                        </div>
                    </div>
                </div>
            </template>
            <div class="flex-col-start">
                <div class="invisible-max-900px">
                    {{
                        isNotBlank(member.user.name)
                            ? member.user.name
                            : '等待加入'
                    }}
                </div>
                <div class="flex-between">
                    <div class="font-bold">
                        {{
                            _authStore.getServer()
                                ? member.warframe.en
                                : member.warframe.cn
                        }}
                    </div>
                    <WtuFocus :name="member.focus" size="2.5em" simplified />
                </div>
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
