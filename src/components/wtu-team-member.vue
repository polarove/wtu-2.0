<template>
    <div class="flex-center">
        <el-popover width="200">
            <template #reference>
                <div>
                    <div class="flex-col">
                        <wtu-warframe
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
                <div class="boosters">
                    <wtu-booster
                        size="2.3em"
                        active-size="2.3em"
                        class="booster"
                        v-for="(booster, index) in boosters"
                        :key="index"
                        :src="
                            member.user[booster.en]
                                ? booster.valid
                                : booster.invalid
                        "
                        :active="
                            member.user[booster.en] === BOOSTER_STATUS.ACTIVE
                        "
                    />
                </div>
                <div class="equipments">
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
                        <wtu-focus :name="member.focus" size="2em" simplified />
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
import { BOOSTER_STATUS, ONLINE_STATUS } from '@/composables/enums'
import { boosters } from '@composables/booster'
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

.boosters {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;

    .booster:nth-child(n + 2) {
        margin-top: 0.5em;
    }
}
.equipments {
    flex: 1;
    margin-left: 0.6em;
    padding-left: 0.6em;
    border-left: 1px solid var(--el-border-color);
}
</style>
