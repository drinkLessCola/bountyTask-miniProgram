// miniprogram.ts
import { login } from '../../utils/login'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    encryptedData:null,
    uid:'',
    nickName: '',
    avatarUrl:'',
  },
  // 登录
  handleLogin() {
    login()
    .then(() => {
      const avatarUrl = wx.getStorageSync('avatarUrl'),
      nickName = wx.getStorageSync('nickName')
      this.setData({
        avatarUrl,
        nickName,
      })
    })
  },
  // 登出
  logout() {
    wx.removeStorageSync('uid')
    wx.removeStorageSync('avatarUrl')
    wx.removeStorageSync('nickName')
    wx.removeStorageSync('openId')
    this.setData({
      avatarUrl: '',
      nickName: '',
    })
    wx.showToast({
      title:'已登出',
      icon:'none'
    })
  },
  toTaskCollect() {
    const uid = wx.getStorageSync('uid')
    if(uid) {
      wx.navigateTo({
        url: "/pages/taskCollection/taskCollection?userid=" + uid
      })
    } else {
      wx.showToast({
        icon:'none',
        title:'请先登录！'
      })
     this.handleLogin()
    }
  },
  toVersionInfo() {
    wx.navigateTo({
      url:"/pages/version/version"
    })
  },
  toFeedBack() {
    wx.navigateTo({
      url:"/pages/opinion/opinion"
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    const avatarUrl = wx.getStorageSync('avatarUrl'),
          nickName = wx.getStorageSync('nickName')

    this.setData({
      avatarUrl,
      nickName,
    })
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