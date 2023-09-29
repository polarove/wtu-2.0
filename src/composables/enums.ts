export enum OnlineStatusEnum {
    offline = 0,
    online = 1,
    online_in_game = 2,
}

export enum ActionEnum {
    INSERT = 1,
    UPDATE = 2,
    DELETE = 3,
    SELECT = 4,
}

export enum ServerCodeEnum {
    cn = 0,
    en = 1,
}

export enum ServerTypeEnum {
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
