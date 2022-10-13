// miniprogram.ts
import { getUserInfo } from '../../API/confirmCompleted'
import { login } from '../../utils/login'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:app.globalData.isRelease,
    encryptedData:null,
    uid:'',
    nickName: '',
    avatarUrl:'',
    money:0,
    publishNum: 0,
    passRate:'-',
  },
  // 登录
  handleLogin() {
    if(this.data.nickName && this.data.avatarUrl) return
    login()
    .then(() => {
      const { avatarUrl, nickName, postNum:publishNum, settleNum } = wx.getStorageSync('user')
      const passRate = publishNum ? `${Math.floor(settleNum / publishNum * 100)}%` : '-'
      this.setData({
        avatarUrl,
        nickName,
        publishNum,
        passRate
      })
    })
    .catch(err => {
      wx.showToast({
        icon: 'none',
        title: '登录失败！'
      })
    })
  },
  // 登出
  logout() {
    wx.removeStorageSync('user')
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
  toFinishedTask() {
    wx.navigateTo({
      url:"/pages/taskList/finishedTask/finishedTask"
    })
  },
  toProcessingTask() {
    wx.navigateTo({
      url:"/pages/taskList/processingTask/processingTask"
    })
  },
  toPublished(e:any) {
    const { option } = e.currentTarget.dataset
    wx.navigateTo({
      url:`/pages/taskList/publishedTask/publishedTask?option=${option}`
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    const { avatarUrl , nickName } = wx.getStorageSync('user')

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
    const { id } = wx.getStorageSync('user')
    if(!id) return
    getUserInfo(id)
    .then((data) => {
      const { /*getNum, finishNum,*/ money, postNum:publishNum, settleNum } = data as UserInfo
      console.log(data)
      const passRate = publishNum ? `${Math.floor(settleNum / publishNum * 100)}%` : '-'
      this.setData({
        passRate,
        publishNum,
        money
      })
    })
    .catch(err => {
      console.log(err)
      wx.showToast({ icon:'none', title:'获取用户任务信息失败'})
    })
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