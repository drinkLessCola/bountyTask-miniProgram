const BASE_URL = "ws://43.138.254.32/"
type EventListener = (e: any) => void
class HeartBeat {
  private timeout: number = 10000
  private timer: number | null = null
  private serverTimer: number | null = null

  reset() {
    if(this.timer)  clearTimeout(this.timer)
    if(this.serverTimer) clearTimeout(this.serverTimer)
    return this
  }
  start(){
    this.timer = setTimeout(() => {
      console.log("发送 ping")
      
    })
  }
}
export default class WebSocket {
  private connected: boolean      // 是否已连接
  private lockReconnect:boolean = false
  private networkState: boolean    // 当前网络状态
  private timeout: number = 15000  // 心跳检测频率
  private timer!: number           // 计时器ID
  private connectNum: number       // 当前重连次数
  private heartBeat = new HeartBeat()            // 心跳检测和断线重连开关
      
  private userId: number
  private message: EventListener
  private socketTask!: WechatMiniprogram.SocketTask

  constructor(heartBeat: boolean, userId: number, onMessage: EventListener) {
    this.connected = false
    this.networkState = true
    this.connectNum = 0
    this.heartBeat = heartBeat
    this.userId = userId
    // 回调监听
    this.message = onMessage
    // 初始化
    this.initWebSocket()
  }

  /**
   * 建立websocket连接
   * @param {*} options 
   */
  initWebSocket(options?: any) {
    const that = this
    const { userId } = this
    if (this.connected) console.log("socket已连接")
    else {
      // 检查网络
      wx.getNetworkType({
        success(net) {
          if (net.networkType === 'none') {
            that.networkState = false
            return
          }
          that.socketTask = wx.connectSocket({
            url: `${BASE_URL}${userId}`,
            success(res) {
              console.log('socket连接成功', res)
              that.connected = true
            },
            fail(err) {
              console.log('socket连接失败', err)
            }
          })
          // 监听 WebSocket 连接打开事件
          that.onSocketOpened()
          // 监听 WebSocket 连接关闭事件
          that.onSocketClosed()
          // 监听websocket 错误
          that.onSocketError()
        }
      })
    }
  }
  /**
     * WebSocket 错误事件的回调函数
     */
  onSocketError() {
    this.socketTask.onError((errMsg) => {
      console.log(errMsg)
    })
  }
  /**
   * 监听 WebSocket 连接打开事件
   */
  onSocketOpened() {
    this.socketTask.onOpen((res) => {
      console.log('socketTask.onOpen', res)
      // 检查心跳
      if (this.heartBeat) {
        this.resetHeartBeat()
        this.startHeartBeat()
      }
      this.sendTestMessage()
      this.onReceivedMsg()
      // 网络状态
      this.networkState = true
    }
    )
  }
  /**
   * 心跳检查重置
   */
  resetHeartBeat() {
    this.timer && clearTimeout(this.timer)
  }
  /**
   * 心跳检查开始
   */
  startHeartBeat() {
    this.timer = setInterval(() => {
      this.sendTestMessage()
    }, this.timeout)
  }
  /**
   * 发送hearBeat测试信息
   */
  sendTestMessage() {
    const that = this
    this.socketTask.send({
      // 心跳发送的信息应由前后端商量后决定
      data: 'ping',
      success(res) {
        console.log('发送测试信息成功', res)
      },
      fail(err) {
        console.log('发送测试信息失败', err)
        that.resetHeartBeat()
      }
    })
  }
  /**
     * 监听websocket连接关闭
     */
  onSocketClosed() {
    const that = this
    that.socketTask.onClose((result: any) => {
      const { code, reason } = result
      console.log(`连接已关闭,信息:${code}-${reason}`)
      // 停止心跳连接
      if (this.heartBeat) this.resetHeartBeat()
      // 更新已连接状态
      this.connected = false
    })
  }
  /**
   * 重连方法，会根据时间频率越来越慢
   * @param {*} options 
   */
  reconnect(options: Object) {
    if(this.lockReconnect) return
    this.lockReconnect = true
    clearTimeout(this.timer)
    if (this.connectNum < 20) {
      setTimeout(() => {
        this.initWebSocket(options)
      }, 5000)
      this.connectNum += 1
    } 
    // else if (this.connectNum < 50) {
    //   setTimeout(() => {
    //     this.initWebSocket(options)
    //   }, 10000)
    //   this.connectNum += 1
    // } else {
    //   setTimeout(() => {
    //     this.initWebSocket(options)
    //   }, 450000)
    //   this.connectNum += 1
    // }
  }
  /**
   * 获取随机数
   * @returns 
   */
  appId() {
    return Math.floor(Math.random() * 4294967294 + 1);
  }
  /**
   * 接收服务器返回的消息
   */
  onReceivedMsg() {
    console.log("socketTask.onMessage")
    this.socketTask.onMessage((data) => {
      this.message && this.message(data)
    })
  }
  /**
   * 发送websocket消息
   * @param {*} options 
   */
  sendWebSocketMsg(options: any) {
    const that = this
    const data = {
      ...options.data,
      userId: this.userId,
    }
    this.socketTask.send({
      data: JSON.stringify(data),
      success() {
        console.log('发送消息成功', data)
      },
      fail(err) {
        console.log('发送消息失败', err)
        that.reconnect(options)
      }
    })
  }
  /**
   * 关闭websocket连接
   */
  closeWebSocket() {
    const that = this
    this.socketTask.close({
      success(res) {
        console.log('关闭socket成功', res)
        that.heartBeat = false
      },
      fail(err) {
        console.log('关闭socket失败', err)
      }
    })
  }
}
