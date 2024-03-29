// app.ts
import WebSocket from "./utils/socket";
let ws:WebSocket | null = null
const ROLE_MAP = {
  receiver: 0,
  publisher: 1
}
// 获取应用实例

App<IAppOption>({
  globalData: {
    //自定义导航栏坐标信息
    titleCoord:null,
    navBarHeight:0,
    tabBarBottom:0,
    bottomBarHeight:0,
    searchKeyword:'',
    isRelease: true,
    message: {
      get() { return []}
    },
  },
  onLaunch() {
    // 展示本地存储能力
    const accountInfo = wx.getAccountInfoSync();
    accountInfo.miniProgram.envVersion = 'release';
    const isRelease = (accountInfo.miniProgram.envVersion === 'release') 
    this.globalData.isRelease = isRelease
    
    wx.getSystemInfo({
      success:(res)=>{
        const menuBtnCoord = wx.getMenuButtonBoundingClientRect()
        // 计算标题的 margin-left = 胶囊按钮的margin-right * 2
        const marginLeft = (res.screenWidth - menuBtnCoord.right) * 2  
        // 计算标题的 margin-bottom = 胶囊按钮的 margin-top
        const marginBottom = menuBtnCoord.top - res.statusBarHeight

        // 导航栏的高度
        this.globalData.navBarHeight = menuBtnCoord.height + menuBtnCoord.top + marginBottom
        // 底部栏的高度
        this.globalData.bottomBarHeight = res.screenHeight - res.safeArea.bottom
        this.globalData.titleCoord = {
          left:marginLeft,
          bottom:marginBottom,
        }  
        
        const tabBarBottom = res.screenHeight - res.safeArea.bottom
        this.globalData.tabBarBottom = tabBarBottom
      }
    })

    const { id } = wx.getStorageSync('user')
    ws = new WebSocket(id, this.handleMsg)
  },
  onHide() {
    if(ws instanceof WebSocket) ws.closeWebSocket()
  },
  handleMsg(msg:any) {
    const {data} = msg
    if(data === 'pong') console.log("heartBeat", msg)
    else if(data === '连接成功') console.log("连接成功")
    else {
      console.log('收到消息', data)
      const message = JSON.parse(data)
      this.globalData.message = message
    }
  },
  clearMsg() {
    this.globalData.message = []
  },
  // 订阅
  subscribe(prop:keyof IAppOption["globalData"], callback:any) {
    const globalData = this.globalData
    let val = globalData[prop]
    Object.defineProperty(globalData, prop, {
      configurable: true,
      enumerable: true,
      set(value) {
        val = value
        // globalData[prop] = value
        callback(value)
      },
      get() {
        return val
      }
    })
  }
})

export {}