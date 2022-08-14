// index.ts

Page({
  data: {
    iv: null,
    encryptedData: null,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  onLoad() {
    console.log(this)
    // @ts-ignore
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '必须授权才能使用',
      success: (res: WechatMiniprogram.GetUserProfileSuccessCallbackResult) => {
        let user = res.userInfo
        wx.setStorageSync('user', user) //信息暂存在客户端
        this.setData({
          encryptedData: res.encryptedData,
          iv: res.iv
        })
        wx.request({
          url: 'http://localhost:8080/login',
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded',
          },
          data: {
            encryptedData: this.data.encryptedData,
            iv: this.data.iv,
          },
          success(res) {
            wx.setStorageSync('token', res.data)
          }
        })
      },
    })
  },
  getUserInfo(e: any) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
