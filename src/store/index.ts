import { defineStore } from 'pinia'
import type { response } from '@composables/types'
import type { User } from '@composables/user'
import { getUserVOByUUID } from '@api/account'
import { ElMessage } from 'element-plus'
import { isBlank, isNotBlank } from '@/util/StrUtil'
import { warframe } from '@/composables/warframe'
import type { TeamList, TeamPage, TeamListParams } from '@composables/team'
import { GetTeamList } from '@api/team'

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
            const result = (await getUserVOByUUID()) as response<User>
            if (result.success) {
                this.setUser(result.data)
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
        param: {} as TeamListParams,
        TeamPage: {} as TeamPage,
        loading: false,
    }),
    actions: {
        initTeamList() {
            this.loading = true
            GetTeamList(this.param)
                .then((res: any) => {
                    if (res.success) {
                        this.setTeam(res.data.records as Array<TeamList>)
                    } else {
                        ElMessage.error(res.message)
                    }
                })
                .catch((err: any) => {
                    ElMessage.error(err.message)
                })
                .finally(() => {
                    this.loading = false
                })
        },
        removeTeam(id: number) {
            this.TeamPage.records = this.TeamPage.records.filter(
                (item) => item.team.id !== id
            )
        },
        toggleTeamStatus(uuid: string, status: number) {
            this.TeamPage.records.map((item) => {
                if (item.team.uuid === uuid) {
                    item.team.status = status
                }
            })
        },
        getLoading(): boolean {
            return this.loading
        },
        getParam(): TeamListParams {
            return this.param
        },
        setParam(param: TeamListParams) {
            this.param = param
        },
        setTeam(TeamList: Array<TeamList>) {
            this.TeamPage.records = TeamList
        },
        getTeam(): Array<TeamList> {
            return this.TeamPage.records
        },
        getTeamPage(): TeamPage {
            return this.TeamPage
        },
        addTeam(team: TeamList) {
            this.TeamPage.records.splice(0, 0, team)
        },
    },
})
