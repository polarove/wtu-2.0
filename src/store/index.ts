import { defineStore } from 'pinia'
import { User, response } from '@composables/types'
import { getUserVOByUUID } from '@api/account'
import { ElMessage } from 'element-plus'
import { isBlank, isNotBlank } from '@/util/StrUtil'
import { warframe } from '@/composables/warframe'
import { TeamInstance } from '@composables/team'
import { GetTeamList } from '@api/team'
import { RouteRecordName } from 'vue-router'

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
            level: 0,
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
        getServer(): number {
            return this.user.server
        },
        setServer(server: number) {
            this.user.server = server
        },
        getServerChar(): keyof warframe {
            if (this.getServer()) {
                return 'en'
            } else {
                return 'cn'
            }
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
        getLevel(): number {
            return this.user.level
        },
        setLevel(level: number) {
            this.user.level = level
        },
    },
    persist: true,
})

export const teamStore = defineStore({
    id: 'team',
    state: () => ({
        published: false,
        TeamInstance: {} as TeamInstance,
        TeamList: [] as Array<TeamInstance>,
    }),
    actions: {
        initTeamList(channel: RouteRecordName | null | undefined) {
            const _authStore = authStore()
            let param = {
                page: 1,
                size: 10,
                server: _authStore.getServer(),
                channel: channel,
            }
            GetTeamList(param).then((res: any) => {
                if (res.success) {
                    console.log(res)
                    this.setTeam(res.data as Array<TeamInstance>)
                } else {
                    ElMessage.error(res.message)
                }
            })
        },
        setTeam(TeamList: Array<TeamInstance>) {
            this.TeamList = TeamList
        },
        getTeam(): Array<TeamInstance> {
            return this.TeamList
        },
        isEmpty(): boolean {
            return this.TeamList.length === 0
        },
    },
    persist: true,
})
