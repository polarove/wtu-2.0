import { defineStore } from 'pinia'
import { User, response } from '@composables/types'
import { ServerEnum } from '@/composables/enums'
import { getUserVOByUUID } from '@api/account'
import { ElMessage } from 'element-plus'
import { isBlank, isNotBlank } from '@/util/StrUtil'

export const authStore = defineStore({
    id: 'session',
    state: () => ({
        user: {
            avatar: '',
            description: '',
            name: '',
            uuid: '',
            onlineStatus: null as number | null,
            server: 1,
            boosterList: [] as string[],
        },
        difficulty: false,
    }),
    actions: {
        setUser(user: User) {
            this.user = user
        },
        getUser(): User {
            return this.user
        },
        getDescription(): string {
            return this.user.description
        },
        getUUID(): string {
            return this.user.uuid
        },
        isLogin(): boolean {
            return isNotBlank(this.getUUID())
        },
        getAvatar(): string {
            return this.user.avatar
        },
        setAvatar(avatar: string) {
            this.user.avatar = avatar
        },
        getName(): string {
            return this.user.name
        },
        setName(name: string) {
            this.user.name = name
        },
        getOnlineStatus(): number | null {
            return this.user.onlineStatus
        },
        setOnlineStatus(onlineStatus: number) {
            this.user.onlineStatus = onlineStatus
        },
        hasBooster(booster: string): boolean {
            return this.user.boosterList.includes(booster)
        },
        removeBooster(booster: string) {
            this.user.boosterList = this.user.boosterList.filter(
                (item) => item !== booster
            )
        },
        addBooster(booster: string) {
            this.user.boosterList.push(booster)
        },
        getServer(): number | null {
            return this.user.server
        },
        setServer(server: number) {
            this.user.server = server
        },
        getServerChar(): string {
            return ServerEnum.types.find(
                (item) => item.code === this.getServer()
            )?.shortcut as string
        },
        async updateUser() {
            if (isBlank(this.getUUID())) {
                return
            }
            const result = (await getUserVOByUUID()) as response
            if (result.success) {
                this.setUser(result.data as User)
            } else {
                ElMessage.error(result.message)
            }
        },
        getDifficulty(): boolean {
            return this.difficulty
        },
        setDifficulty(difficulty: boolean) {
            this.difficulty = difficulty
        },
    },
    persist: true,
})
