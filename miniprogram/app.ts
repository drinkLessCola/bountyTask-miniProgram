// app.ts
// 获取应用实例
const app = getApp<IAppOption>()
App<IAppOption>({
  globalData: {
    //自定义导航栏坐标信息
    titleCoord:null,
    navBarHeight:0,
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
        // 这个整的挺好的👍
        const menuBtnCoord = wx.getMenuButtonBoundingClientRect()
        console.log(menuBtnCoord) 
        // 胶囊按钮的水平方向 margin
        const marginLeft = (res.screenWidth - menuBtnCoord.right) * 2  
        // 胶囊按钮的垂直方向的 margin
        const marginBottom = menuBtnCoord.top - res.statusBarHeight
        // 导航栏的高度
        this.globalData.navBarHeight = menuBtnCoord.height + menuBtnCoord.top * 2 - res.statusBarHeight
        // 可以整合在对象里面：
        this.globalData.titleCoord = {
          left:marginLeft,
          bottom:marginBottom,
        }  
      }
    })
  },
  
})

