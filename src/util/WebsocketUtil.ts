export class websocket {
    public wss: WebSocket

    private full_address: string

    private route: string

    private static readonly INSERT = 1

    private static readonly UPDATE = 2

    private static readonly DELETE = 3

    private static readonly SELECT = 4

    private static readonly CONNECT = 5

    private static readonly DISCONNECT = 6

    constructor(address: string, route: string) {
        this.route = route
        this.full_address = address + route
        this.wss = new WebSocket(this.full_address)
    }

    join(channelId: number, uuid: string, data: any) {
        this.wss.onopen = () => {
            this.wss.send(
                JSON.stringify({
                    channelId: channelId,
                    uuid: uuid,
                    data: data,
                    type: websocket.CONNECT,
                })
            )
            this.wss.onmessage = (event) => {
                console.log(event.data)
            }
        }
    }

    disconnect(channelId: number, uuid: string, data: any) {
        this.wss.onopen = () => {
            this.wss.send(
                JSON.stringify({
                    channelId: channelId,
                    uuid: uuid,
                    data: data,
                    type: websocket.DISCONNECT,
                })
            )
        }
    }
}
