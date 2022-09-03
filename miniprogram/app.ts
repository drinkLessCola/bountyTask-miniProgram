// app.ts
// 获取应用实例
App<IAppOption>({
  globalData: {
    //自定义导航栏坐标信息
    titleCoord:null,
    navBarHeight:0,
    tabBarBottom:0,
    bottomBarHeight:0,
    searchKeyword:'',
  },
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.getSystemInfo({
      success:(res)=>{
        // 这个整的挺好的👍
        const menuBtnCoord = wx.getMenuButtonBoundingClientRect()
        // 计算标题的 margin-left = 胶囊按钮的margin-right * 2
        const marginLeft = (res.screenWidth - menuBtnCoord.right) * 2  
        // 计算标题的 margin-bottom = 胶囊按钮的 margin-top
        const marginBottom = menuBtnCoord.top - res.statusBarHeight

        // 导航栏的高度
        this.globalData.navBarHeight = menuBtnCoord.height + menuBtnCoord.top + marginBottom
        // 底部栏的高度
        this.globalData.bottomBarHeight = res.screenHeight - res.safeArea.bottom
        console.log(res.screenHeight - res.safeArea.bottom)
        // 可以整合在对象里面：
        this.globalData.titleCoord = {
          left:marginLeft,
          bottom:marginBottom,
        }  
        
        const tabBarBottom = res.screenHeight - res.safeArea.bottom
        this.globalData.tabBarBottom = tabBarBottom
      }
    })
  },
  
})

export {}