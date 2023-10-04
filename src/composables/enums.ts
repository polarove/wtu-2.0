export enum ONLINE_STATUS {
    offline = 0,
    online = 1,
    online_in_game = 2,
}

export enum SERVER_CODE {
    cn = 0,
    en = 1,
}

export enum SERVER_TYPE {
    cn = 'cn',
    en = 'en',
}

export enum WSS_ACTION {
    PING = 0,
    CONNECT = 1,
    DISCONNECT = 2,
    MESSAGE = 3,
}

export enum DELETE_OR_NOT {
    DELETE = 1,
    NOT_DELETE = 0,
}

export enum TEAM_STATUS {
    PUBLIC = 1,
    PRIVATE = 0,
}

export enum BOOSTER_STATUS {
    ACTIVE = 1,
    INACTIVE = 0,
}

export enum DEFAULT {
    name = '一般路过Tenno',
}

export enum RESPONSE_CODE {
    server_restart = 1,
    user_not_found = 207,
    user_not_login = 208,
    redirect_login = 209,
    unknown_game_server = 2013,
}

export const isDefualtUserName = (name: string): boolean => {
    return name === DEFAULT.name
}

export const isNotDefualtUserName = (name: string): boolean => {
    return name !== DEFAULT.name
}

export const DIFFICULTY = {
    STEEL_PATH: true,
    ORIGIN: false,
}

export const WSS_MESSAGE_TYPE = {
    CONNECTION: 1,
    ADD_TEAM: 2,
    REMOVE_TEAM: 3,
    TOGGLE_STATUS: 4,
    JOIN: 5,
}

export const LAYOUT_ENUM = {
    default: 1,
    wide: 1,
    compact: 2,
}

export const DOCUMENT_VISIBILITY = {
    hidden: 'hidden',
    visible: 'visible',
}

export const DIRECTION_ENUM = {
    horizental: 1,
    vertical: 2,
}

export const APPLICATION_STATUS = {
    static: 'static',
    pending: 'pending',
    accepted: 'accepted',
    rejected: 'rejected',
}
