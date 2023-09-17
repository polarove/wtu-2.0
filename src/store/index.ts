import { defineStore } from 'pinia'

export const authStore = defineStore({
    id: 'auth',
    state: () => ({
        sessionState: false,
        sessionId: '',
        user: {
            id: null,
            username: null,
            email: null,
            avatar: null,
            role: null,
            created_at: null,
            updated_at: null,
        },
    }),
    actions: {
        setSessionId(sessionId: string) {
            this.sessionId = sessionId
        },
        getSessionId() {
            return this.sessionId
        },
        setSessionState(sessionState: boolean) {
            this.sessionState = sessionState
        },
        getSessionState() {
            return this.sessionState
        },
        setUser(user: any) {
            this.user = user
        },
    },
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
