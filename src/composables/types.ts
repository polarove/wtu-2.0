// response from server
export interface response {
    code: number
    data: any
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
