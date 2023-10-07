export interface WSS_RESPONSE {
    action: number
    code: number
    data: string
    message: string
    success: boolean
    time: string
}

export interface WSS_CONNECTION_FEEDBACK {
    total: number
    clients: number
}

export enum WSS_MESSAGE_TYPE {
    CONNECTION = 1,
    ADD_TEAM = 2,
    REMOVE_TEAM = 3,
    TOGGLE_STATUS = 4,
    JOIN = 5,
    JOIN_ACCEPT = 6,
    JOIN_REJECT = 7,
}

export enum WSS_READY_STATE {
    CONNECTING = 0,
    OPEN = 1,
    CLOSING = 2,
    CLOSED = 3,
}
