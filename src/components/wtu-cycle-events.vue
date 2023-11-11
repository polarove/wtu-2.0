<template>
    <ryu-loading :loading="loading" :rows="1">
        <el-row :gutter="12" class="mt-1em">
            <el-col
                v-for="(event, index) in events"
                :key="index"
                :span="24 / events.length"
            >
                <el-card
                    class="c-p"
                    shadow="hover"
                    @click="toggleDetails(index)"
                >
                    <el-countdown
                        :format="format.day"
                        :value="utcTimestamp(event.expiry)"
                        @finish="refresh(event.id)"
                    >
                        <template #prefix>
                            <span
                                class="i-ep:loading animation_rotate"
                                v-if="refreshing"
                            ></span>
                        </template>
                        <template #title>
                            <div>{{ event.description }}</div>
                        </template>
                    </el-countdown>
                </el-card>
            </el-col>
        </el-row>
    </ryu-loading>

    <el-dialog v-model="dialogVisible">
        <template #header>
            <div>{{ active.description }}</div>
        </template>
        <el-row>
            <el-col :span="8"><span color-gray>任务</span></el-col>
            <el-col :span="16"><span color-gray>奖励池</span></el-col>
            <el-col
                :span="24"
                v-for="(job, index) in active.jobs"
                :key="index"
                mt-1em
            >
                <el-row>
                    <el-col :span="8">
                        <el-countdown
                            :format="format.hour"
                            :value="utcTimestamp(job.expiry)"
                            @finish="init()"
                        >
                            <template #title>
                                <div>{{ job.type }}</div>
                            </template>
                        </el-countdown>
                    </el-col>
                    <el-col :span="16">
                        <el-row>
                            <el-col
                                :span="8"
                                v-for="(reward, index) in job.rewardPool"
                                :key="index"
                            >
                                {{ reward }}
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </el-dialog>
</template>

<script setup lang="ts">
import { response } from '@/composables/types'
import { getEvents } from '@api/cycles/index'
import { EventCycle } from '@composables/cycles'
import { utcTimestamp, format } from '@/util/DateUtil'

const events = ref<EventCycle[]>([])
const loading = ref<boolean>(true)

const init = async () => {
    loading.value = true
    const result = (await getEvents()) as response<EventCycle[]>
    events.value = result.data
    console.log(events.value)
    loading.value = false
}
init()

const refreshing = ref<boolean>(false)
const refresh = async (id: string): Promise<any> => {
    refreshing.value = true
    const reslut = (await getEvents()) as response<EventCycle[]>
    reslut.data.forEach((element) => {
        if (element.id === id) {
            console.log(`event: ${id} cycle not changed, refresh again`)
            setTimeout(() => {
                return refresh(id)
            }, 3000)
        } else {
            events.value = reslut.data
            refreshing.value = false
            return true
        }
    })
}

const dialogVisible = ref<boolean>(false)
const active = ref<EventCycle>({
    id: '',
    activation: '',
    startString: '',
    expiry: '',
    active: false,
    description: '',
    tooltip: '',
    concurrentNodes: [],
    victimNode: '',
    rewards: [],
    expired: false,
    health: 0,
    affiliatedWith: '',
    jobs: [],
    previousJobs: [],
    previousId: '',
    interimSteps: [],
    progressSteps: [],
    regionDrops: [],
    archwingDrops: [],
    asString: '',
    metadata: {},
    completionBonuses: [],
    altExpiry: '',
    altActivation: '',
    nextAlt: {
        expiry: '',
        activation: '',
    },
    subscribed: false,
})
const toggleDetails = (index: number) => {
    dialogVisible.value = true
    active.value = events.value[index]
}
</script>

<style lang="scss" scoped></style>
