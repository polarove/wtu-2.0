import { defineStore } from 'pinia'
import type { response } from '@composables/types'
import type { UserBooster, UserVO } from '@composables/user'
import { getUserVOByUUID } from '@api/account'
import { isBlank, isNotBlank } from '@/util/StrUtil'
import { MatrixUtil } from '@/class/MatrixUtil'
import { requires } from '@/util/ObjectUtil'
import { warframe } from '@/composables/warframe'
import type {
    TeamVO,
    TeamPage,
    TeamListParams,
    JoinTeamDTO,
    ApplicationGroup,
} from '@composables/team'
import { GetTeamList } from '@api/team'
import { BOOSTER_STATUS, LAYOUT_ENUM, SERVER_TYPE } from '@/composables/enums'
import { boosters } from '@/composables/booster'

const names = boosters.map((value) => {
    return value.en
})

interface xhr_response {
    config: any
    data: response<any>
    headers: any
    request: any
    status: number
}

export const authStore = defineStore({
    id: 'session',
    state: () => ({
        user: {
            avatar: '',
            description: '',
            name: '',
            uuid: '',
            onlineStatus: 0,
            server: 1,
            level: 0,
            booster: {
                affinityBooster: 0,
                creditBooster: 0,
                modDropRateBooster: 0,
                resourceBooster: 0,
                resourceDropRateBooster: 0,
            },
            accelerator: '',
        },
        difficulty: false,
        redirect: '',
    }),
    actions: {
        setUser(user: UserVO) {
            this.user = user
        },
        getUser(): UserVO {
            return this.user
        },
        getDescription(): string {
            return this.user.description
        },
        getAccelerator(): string {
            return this.user.accelerator
        },
        setAccelerator(accelerator: string) {
            this.user.accelerator = accelerator
        },
        getUUID(): string {
            return this.user.uuid
        },
        getRedirect(): string {
            return this.redirect
        },
        setRedirect(redirect: string) {
            this.redirect = redirect
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
        getOnlineStatus(): number {
            return this.user.onlineStatus
        },
        setOnlineStatus(onlineStatus: number) {
            this.user.onlineStatus = onlineStatus
        },
        getBooster(booster: string): number {
            return this.user.booster[booster as keyof UserBooster] as number
        },
        getUserBooster(): UserBooster {
            return this.user.booster
        },
        hasBooster(booster: string): boolean {
            return (
                this.user.booster[booster as keyof UserBooster] ===
                BOOSTER_STATUS.ACTIVE
            )
        },
        removeBooster(booster: string) {
            this.user.booster[booster as keyof UserBooster] =
                BOOSTER_STATUS.INACTIVE as never
        },
        setBooster(booster: string) {
            this.user.booster[booster as keyof UserBooster] =
                BOOSTER_STATUS.ACTIVE as never
        },
        getServer(): number {
            return this.user.server
        },
        setServer(server: number) {
            this.user.server = server
        },
        getServerChar(): keyof warframe {
            if (this.getServer()) {
                return SERVER_TYPE.en
            } else {
                return SERVER_TYPE.cn
            }
        },
        updateUser() {
            if (isBlank(this.getUUID())) {
                return
            }
            getUserVOByUUID()
                .then((res: any) => {
                    var caonima = res as response<UserVO>
                    if (caonima.success) {
                        this.setUser(caonima.data)
                    } else {
                        ElNotification.error({
                            position: 'bottom-right',
                            message: caonima.message,
                        })
                    }
                })
                .catch((err: xhr_response) => {
                    console.log(err.data.message)
                })
                .finally(() => {})
        },
        getDifficulty(): boolean {
            return this.difficulty
        },
        setDifficulty(difficulty: boolean) {
            this.difficulty = difficulty
        },
        toggleDifficulty() {
            this.difficulty = !this.difficulty
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
        teamPage: {} as TeamPage,
        teamListLoading: false,
        pageLoading: false,
        isEnd: false,
        applicationGroup: [] as Array<ApplicationGroup>,
        applicationGroupLoading: false,
    }),
    actions: {
        initTeamList() {
            this.teamListLoading = true
            GetTeamList(this.param)
                .then((res: any) => {
                    if (res.success) {
                        this.setTeam(res.data.records as Array<TeamVO>)
                    } else {
                        ElNotification.error({
                            position: 'bottom-right',
                            message: res.message,
                        })
                    }
                })
                .catch((err: xhr_response) => {
                    console.log(err.data.message)
                })
                .finally(() => {
                    this.teamListLoading = false
                })
        },
        resetPage() {
            this.param.page = 1
            this.isEnd = false
        },
        removeTeam(id: number) {
            this.teamPage.records = this.teamPage.records.filter(
                (item) => item.team.id !== id
            )
        },
        toggleTeamStatus(id: number, status: number) {
            this.teamPage.records.map((item) => {
                if (item.team.id === id) {
                    item.team.status = status
                }
            })
        },
        getTeamListLoading(): boolean {
            return this.teamListLoading
        },
        getPageLoading(): boolean {
            return this.pageLoading
        },
        getParam(): TeamListParams {
            return this.param
        },
        setParam(param: TeamListParams) {
            this.param = param
        },
        setTeam(TeamVO: Array<TeamVO>) {
            this.teamPage.records = TeamVO
        },
        getTeam(): Array<TeamVO> {
            console.log(this.teamPage.records)
            return this.teamPage.records
        },
        getTeamPage(): TeamPage {
            return this.teamPage
        },
        addTeam(team: TeamVO) {
            this.teamPage.records.unshift(team)
        },
        nextPage(callback: Function) {
            this.pageLoading = true
            this.param.page++
            if (this.isEnd) {
                this.pageLoading = false
                callback()
                return
            }
            GetTeamList(this.param)
                .then((res: any) => {
                    if (res.success) {
                        if (res.data.records.length === 0) {
                            this.isEnd = true
                        } else {
                            this.teamPage.records =
                                this.teamPage.records.concat(
                                    res.data.records as Array<TeamVO>
                                )
                        }
                    } else {
                        ElNotification.error({
                            position: 'bottom-right',
                            message: res.message,
                        })
                    }
                })
                .catch((err: xhr_response) => {
                    console.log(err.data.message)
                })
                .finally(() => {
                    this.pageLoading = false
                    callback()
                })
        },
        getApplicationGroupLoading(): boolean {
            return this.applicationGroupLoading
        },
        containsApplication(uuid: string, group: ApplicationGroup): boolean {
            return group.applications.some(
                (application) => application.from.uuid === uuid
            )
        },
        findGroupByUUID(uuid: string): ApplicationGroup | undefined {
            return this.applicationGroup.find((item) => item.uuid === uuid)
        },
        createGroup(
            application: JoinTeamDTO,
            matrix: MatrixUtil<number[]>
        ): ApplicationGroup {
            return {
                uuid: application.team.uuid,
                title: application.team.title,
                matrix: matrix.rows,
                booster: {
                    affinityBooster: 0,
                    creditBooster: 0,
                    modDropRateBooster: 0,
                    resourceBooster: 0,
                    resourceDropRateBooster: 0,
                },
                applications: [],
            }
        },
        getUserBoosterMatrix(booster: UserBooster): MatrixUtil<number[]> {
            return new MatrixUtil(
                names.map((value) => {
                    return booster[value]
                })
            )
        },
        addApplicationGroup(application: ApplicationGroup) {
            this.applicationGroup.unshift(application)
        },
        getApplicationGroups(): Array<ApplicationGroup> {
            return this.applicationGroup
        },
        clearApplicationGroup() {
            this.applicationGroup = []
        },
        addApplication(uuid: string, application: JoinTeamDTO): void {
            let group = this.findGroupByUUID(uuid)
            if (
                group &&
                group.applications.length <= 4 &&
                !this.containsApplication(application.from.uuid, group)
            ) {
                group.applications.push(application)
                // this.addMatrixColumnForGroup(group!, application.from.booster)
                // this.updateGroupBooster(group!)
            }
        },
        removeApplication(uuid: string, application: JoinTeamDTO): void {
            let group = this.findGroupByUUID(uuid)
            if (requires(group)) {
                let applications = group!.applications
                let index = applications.indexOf(application)
                applications.splice(index, 1)
                // this.removeMatrixColumnForGroup(
                //     group!,
                //     application.from.booster
                // )
                // this.updateGroupBooster(group!)
            }
        },
        addMatrixColumnForGroup(
            uuid: string,
            booster: UserBooster,
            callback?: Function
        ) {
            let group = this.findGroupByUUID(uuid)
            group!.matrix.push(this.generateMatrixColumn(booster))
            if (callback) {
                callback(true)
            }
        },
        removeMatrixColumnForGroup(
            uuid: string,
            booster: UserBooster,
            callback?: Function
        ) {
            let group = this.findGroupByUUID(uuid)
            group!.matrix.splice(
                group!.matrix
                    .map((value) => {
                        return value
                    })
                    .indexOf(this.generateMatrixColumn(booster)),
                1
            )
            if (callback) {
                callback(true)
            }
        },
        updateGroupBooster(uuid: string) {
            let group = this.findGroupByUUID(uuid)
            names.map((value, index) => {
                group!.booster[value] = group!.matrix
                    .map((value) => {
                        return value[index]
                    })
                    .includes(1)
                    ? 1
                    : 0
            })
        },
        generateMatrixColumn(booster: UserBooster): number[] {
            return names.map((value) => {
                return booster[value]
            })
        },
    },
})

export const layoutStore = defineStore({
    id: 'layout',
    state: () => ({
        mode: 1,
    }),
    actions: {
        getMode(): number {
            return this.mode
        },
        setMode(mode: number) {
            this.mode = mode
        },
        isDefault(): boolean {
            return this.mode === LAYOUT_ENUM.default
        },
        isWide(): boolean {
            return this.mode === LAYOUT_ENUM.wide
        },
        isCompact(): boolean {
            return this.mode === LAYOUT_ENUM.compact
        },
    },
})
