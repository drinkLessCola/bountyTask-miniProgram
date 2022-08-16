// app.ts
// 获取应用实例
const app = getApp<IAppOption>()
App<IAppOption>({
  globalData: {
    //自定义导航栏用于设置高度的
    statusBarHeight : 0,
    navBarHeight :0,
  },
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })

    wx.getSystemInfo({
      success:(res)=>{
        let custom = wx.getMenuButtonBoundingClientRect()
        this.globalData.statusBarHeight = res.statusBarHeight
        this.globalData.navBarHeight = custom.height + (custom.top - res.statusBarHeight) * 2
      }
    })
  },
  
})

