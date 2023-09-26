<template>
    <div class="flex-center">
        <el-popover width="200">
            <template #reference>
                <div>
                    <div class="flex-col">
                        <WtuWarframe
                            :class="{
                                unknown: user_unknown(member.user.onlineStatus),
                                offline: user_offline(member.user.onlineStatus),
                                online: user_online(member.user.onlineStatus),
                                ingame: user_ingame(member.user.onlineStatus),
                            }"
                            :modelValue="member.warframe"
                            width="60px"
                            class="flex-center b-rounded"
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

            <div class="flex">
                <div class="boosters" v-if="member.user.boosterList">
                    <WtuBooster
                        v-for="booster in member.user.boosterList"
                        :src="boosterMap.get(booster)?.valid"
                        size="2.2em"
                        class="booster"
                    >
                    </WtuBooster>
                </div>
                <div class="flex-1">
                    <div class="invisible-max-900px">
                        <div
                            class="font-bold"
                            v-if="isNotBlank(member.user.name)"
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
                        <WtuFocus :name="member.focus" size="2em" simplified />
                    </div>
                </div>
            </div>
        </el-popover>
    </div>
</template>

<script setup lang="ts">
import type { TeamMemberBO } from '@/composables/team'
import { authStore } from '@/store'
import { isNotBlank } from '@/util/StrUtil'
import { OnlineStatusEnum } from '@/composables/enums'
import { boosterMap } from '@/composables/booster'
const _authStore = authStore()
defineProps({
    member: {
        type: Object as PropType<TeamMemberBO>,
        required: true,
    },
})

const user_unknown = (status: number) => {
    return status === null
}

const user_offline = (status: number) => {
    return status === OnlineStatusEnum.offline.getCode()
}

const user_online = (status: number) => {
    return status === OnlineStatusEnum.online.getCode()
}

const user_ingame = (status: number) => {
    return status === OnlineStatusEnum.online_in_game.getCode()
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

.boosters {
    display: flex;
    flex-direction: column;
    justify-content: start;
    padding-right: 0.5em;
    margin-right: 0.5em;
    border-right: 1px solid rgba(179, 179, 179, 0.2);

    .booster:nth-child(n + 2) {
        margin-top: 0.5em;
    }
}
</style>
