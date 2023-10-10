<template>
    <div class="flex-col items-center">
        <div class="lt-lg:display-none">
            <div
                class="font-bold font-size-[0.88em]"
                v-if="isNotBlank(member.user.name) && nameVisible"
            >
                {{ member.user.name }}
            </div>
            <div v-else class="color-gray font-size-[0.88em]">等待加入</div>
        </div>
        <el-popover width="auto">
            <template #reference>
                <div class="flex-col items-center">
                    <wtu-warframe
                        :class="{
                            unknown: user_unknown(member.user.onlineStatus),
                            offline: user_offline(member.user.onlineStatus),
                            online: user_online(member.user.onlineStatus),
                            ingame: user_ingame(member.user.onlineStatus),
                        }"
                        :modelValue="member.warframe"
                        width="60px"
                        class="flex-center b-rounded ma-1"
                        :showName="false"
                    />
                    <div
                        class="font-size-[0.78em] color-gray mt-0.25em mb-0.25em"
                    >
                        <div v-if="localStatus === 'static'">
                            <el-button
                                v-if="!isCreator"
                                @click="$emit('join')"
                                size="small"
                            >
                                加入
                            </el-button>
                            <span v-else>
                                {{
                                    isHost ? '主机' : member.user.name
                                }}:&nbsp;{{ member.user.accelerator }}
                            </span>
                        </div>
                        <div v-else>
                            <div
                                v-if="
                                    localStatus === APPLICATION_STATUS.pending
                                "
                            >
                                <span
                                    class="i-ep:loading animation-rotate mr-2px"
                                ></span>
                                <span class="font-size-[0.78em] color-gray">
                                    {{ isCreator ? '等待处理' : '申请中' }}
                                </span>
                            </div>
                            <div
                                v-if="
                                    localStatus === APPLICATION_STATUS.accepted
                                "
                            >
                                <span
                                    class="i-ep:check color-blue mr-2px"
                                ></span>
                                <span class="font-size-[0.78em] color-blue">
                                    已接受
                                </span>
                            </div>
                            <div
                                v-if="
                                    localStatus === APPLICATION_STATUS.rejected
                                "
                            >
                                <span
                                    class="i-ep:close color-red mr-2px"
                                ></span>
                                <span class="font-size-[0.78em] color-red">
                                    {{ isCreator ? '已拒绝' : '被拒绝' }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <div class="flex">
                <div class="equipments">
                    <div class="lg:display-none">
                        <div
                            class="font-bold"
                            v-if="isNotBlank(member.user.name) && nameVisible"
                        >
                            {{ member.user.name }}
                        </div>
                        <div v-else class="color-gray">.....</div>
                    </div>
                    <div class="flex justify-between">
                        <div class="text-size-[1.2em]">
                            {{
                                _authStore.getServer()
                                    ? member.warframe.en
                                    : member.warframe.cn
                            }}
                        </div>
                        <wtu-focus :name="member.focus" size="2em" simplified />
                    </div>
                    <wtu-booster-list
                        v-if="
                            member.user.booster !== null &&
                            member.user.booster !== undefined
                        "
                        :booster="member.user.booster"
                        size="2.4em"
                        activeSize="2.4em"
                        :direction="DIRECTION_ENUM.horizental"
                    />
                </div>
            </div>
        </el-popover>
    </div>
</template>

<script setup lang="ts">
import type { TeamMemberBO } from '@/composables/team'
import { authStore } from '@/store'
import { isNotBlank } from '@/util/StrUtil'
import { ONLINE_STATUS, DIRECTION_ENUM } from '@/composables/enums'
import { APPLICATION_STATUS } from '@/composables/wss'

const _authStore = authStore()
defineProps({
    member: {
        type: Object as PropType<TeamMemberBO>,
        required: true,
    },
    nameVisible: {
        type: Boolean,
        default: true,
    },
    isHost: {
        type: Number,
        default: 1,
    },
    localStatus: {
        type: String,
        default: 'static',
    },
    isCreator: {
        type: Boolean,
        default: false,
    },
})

const user_unknown = (status: number) => {
    return status === null
}

const user_offline = (status: number) => {
    return status === ONLINE_STATUS.offline
}

const user_online = (status: number) => {
    return status === ONLINE_STATUS.online
}

const user_ingame = (status: number) => {
    return status === ONLINE_STATUS.online_in_game
}
</script>

<style lang="scss" scoped>
.unknown {
    box-shadow: 0 0 0 2px rgba($color: #717171, $alpha: 0.7) inset;
}
.offline {
    box-shadow: 0 0 0 2px rgba($color: #d74747, $alpha: 0.7) inset;
}

.online {
    box-shadow: 0 0 0 2px var(--el-color-primary) inset;
}

.ingame {
    box-shadow: 0 0 0 2px rgba($color: #3dc468, $alpha: 0.7) inset;
}
.equipments {
    flex: 1;
}
</style>
