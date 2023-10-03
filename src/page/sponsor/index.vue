<template>
    <wtu-header />
    <div class="description">
        <div class="text">Warframe Team Up</div>
        <div class="text">🎉旨在为各位国内玩家提供更好的组队信息流通渠道🎉</div>
        <div class="text">目前迫切需要各位仓鼠倾囊相助</div>
    </div>

    <div class="sponsor-wrapper">
        <div class="w-75vw">
            <div class="sponsor-header">
                <div
                    @click="visible = true"
                    class="cursor-pointer text-size-[0.88em] color-gray hover-color-blue"
                >
                    成为赞助者
                </div>
                <div>由衷感谢以下各位仓鼠的赞助！</div>
            </div>
            <div v-for="item in sponsors" class="item">
                <div class="level">
                    {{ item.level }}
                </div>
                <div
                    v-if="item.sponsros.length > 0"
                    class="list"
                    :class="{
                        unique: item.level === sponsor_level.UNIQUE,
                        platium: item.level === sponsor_level.PLATINUM,
                        gold: item.level === sponsor_level.GOLD,
                        silver: item.level === sponsor_level.SILVER,
                        bronze: item.level === sponsor_level.BRONZE,
                        mercy: item.level === sponsor_level.MERCY,
                    }"
                >
                    <div v-for="sponsor in item.sponsros">
                        <el-avatar :src="sponsor.avatar" size="large" />
                        <div>{{ sponsor.name }}</div>
                    </div>
                </div>
                <div v-else class="list">虚位以待</div>
            </div>
        </div>
    </div>

    <el-drawer v-model="visible" :size="_layoutStore.isWide() ? '60%' : '100%'">
        <template #header>
            <div>成为赞助者，你可以</div>
        </template>
        <div class="promo check">1. 加入赞助者优先群</div>
        <div class="promo check">2. 你提出的建议将优先考虑</div>
        <div class="promo check">3. 你提出的问题可以被优先解决</div>
        <div class="promo check">4. 你的名字将会出现在赞助者列表中</div>
        <el-divider />
        <div class="text-center">请选择你的赞助方式</div>
        <div class="text-center">
            并在备注中告知你的联系方式，我会尽快联系你
        </div>
        <div class="flex-around">
            <img src="@img/sponsor/payment_alipay.jpg" class="payment" />
            <img src="@img/sponsor/payment_wechat.jpg" class="payment" />
        </div>
        <el-divider />
        <div class="promo">
            <div class="flex-start mb-10px">
                <ryu-svg name="qq" size="1.3em" />2038935171
            </div>
            <div class="flex-start mb-10px">
                <ryu-svg name="wechat" size="1.3em" />Polarian_Liu
            </div>
            <div class="flex-start mb-10px">
                <span
                    class="i-ant-design:mail-outlined text-size-[1.2em] ml-5px mr-5px"
                ></span
                >liuqi6602@163.com
            </div>
        </div>
    </el-drawer>
</template>

<script setup lang="ts">
import { sponsor_level, sponsors } from '@/composables/sponsor'
import { layoutStore } from '@/store'
const _layoutStore = layoutStore()
const visible = ref<boolean>(false)
</script>

<style lang="scss" scoped>
.description {
    font-size: 1.55em;
    font-family: smiley-sans;
    text-align: center;
    margin: 2em 0;
    height: 200px;
    .text {
        margin: 0.5em 0;
    }
}
.sponsor-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .item {
        text-align: center;
    }
    .level {
        font-size: 1.333em;
        font-family: smiley-sans;
        background-color: var(--el-border-color-extra-light);
        padding: 0.2em;
        color: var(--el-text-color-primary);
        border-radius: 0.3em;
    }
    .list {
        display: grid;
        margin: 1em 0;
        min-height: 67px;
    }
    .list.unique {
        grid-template-columns: 1fr;
    }
    .list.platium {
        grid-template-columns: repeat(4, 1fr);
    }
    .list.gold {
        grid-template-columns: repeat(8, 1fr);
    }
    .list.silver {
        grid-template-columns: repeat(12, 1fr);
    }
    .list.bronze {
        grid-template-columns: repeat(16, 1fr);
    }
    .list.mercy {
        grid-template-columns: repeat(20, 1fr);
    }
}

.sponsor-header {
    margin-bottom: 0.3em;
}
@media screen and (min-width: 900px) {
    .payment {
        width: 267px;
    }
    .sponsor-header {
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;
    }
}

@media screen and (max-width: 900px) {
    .payment {
        width: 40vw;
    }
}

.promo {
    margin: 0.5em 0;
    font-size: 1.2em;
    color: var(--el-text-color-primary);
}
.promo.check {
    &::after {
        content: ' ✔';
        margin-right: 0.5em;
    }
}
</style>
