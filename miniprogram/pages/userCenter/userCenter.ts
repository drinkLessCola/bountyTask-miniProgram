// miniprogram.ts
import { onLogin } from '../../API/user'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    encryptedData:null,

  },
  toTaskCollect() {
    const userid = 0 //额...
    wx.navigateTo({
      url: "/pages/taskCollection/taskCollection?userid=" + userid
    })
  },
  login() {
    wx.login({
      async success(res) {
        if (!res.code) {
          console.log('登录失败！' + res.errMsg)
          return
        }
        console.log('code', res.code)
        wx.setStorageSync('user_code', res.code)
      }
    })
    wx.getUserProfile({
      desc: '必须授权才能使用',
      success:res => {
        let user=res.userInfo
        wx.setStorageSync('user', user) //信息暂存在客户端
        this.setData({
          encryptedData: res.encryptedData,
          iv: res.iv
        })
        const code = wx.getStorageSync('user_code')
        const encryptedData = res.encryptedData
        const iv = res.iv
        console.log(code, encryptedData, iv)
        onLogin({
          code:code,
          encryptedData:encryptedData,
          iv:iv
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    //自定义的tabbar
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 4
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})