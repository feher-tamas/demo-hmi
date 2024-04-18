import { Dealer } from 'zeromq'

export class ZeroMQClient {
  private socket: Dealer
  private queue: Uint8Array[] = []
  private max: number
  private sending = false
  private handleConnectEvent: (isConnected: boolean) => void = () => {}
  private address: string
  constructor(max = 100, address: string) {
    this.socket = new Dealer({
      routingId: (Math.random() * (1000 - 1) + 1).toString()
    })
    this.max = max
    this.address = address
  }
  on(handleConnectEvent: (isConnected: boolean) => void): void {
    this.handleConnectEvent = handleConnectEvent
  }
  tryConnect(): void {
    this.socket.connect(this.address)

    this.socket.events.on('connect:retry', () => {
      this.handleConnectEvent(false)
    })
    this.socket.events.on('connect', () => {
      this.handleConnectEvent(true)
    })
    this.socket.events.on('disconnect', () => {
      this.handleConnectEvent(false)
    })
  }

  tryDisConnect(): void {
    this.socket.disconnect(this.address)
    this.socket.close()
  }
  send(msg: Uint8Array, callback: (data: Uint8Array) => void): void {
    if (this.queue.length > this.max) {
      throw new Error('Queue is full')
    }
    this.queue.push(msg)
    this.trySend(callback)
  }

  async trySend(callback: (data: Uint8Array) => void): Promise<void> {
    if (this.sending) {
      return
    }
    this.sending = true

    while (this.queue.length) {
      await this.socket.send(['', this.queue.shift() as Uint8Array])
      const [...res] = await this.socket.receive()
      const u8arr = new Uint8Array(res[1])
      callback(u8arr)
    }
    this.sending = false
  }
}
