// response from server
export interface response<T> {
    code: number
    data: T
    message: string
    success: boolean
    timestamp: number
}

export interface Page {
    current: number
    pages: number
    size: number
    total: number
}

export interface ResponseEnum {
    code: number
    message: string
}

export interface xhr_response {
    config: any
    data: response<any>
    headers: any
    request: any
    status: number
}
