import { defineStore } from 'pinia'
import { User } from '@composables/types'

export const authStore = defineStore({
    id: 'session',
    state: () => ({
        user: {
            avatar: '',
            description: '',
            name: '',
            uuid: '',
        },
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
    },
    persist: true,
})

export const stateStore = defineStore({
    id: 'state',
    state: () => ({
        fromRegistry: false,
    }),
    actions: {
        setFromRegistry(fromRegistry: boolean) {
            this.fromRegistry = fromRegistry
        },
        getFromRegistry(): boolean {
            return this.fromRegistry
        },
    },
})
