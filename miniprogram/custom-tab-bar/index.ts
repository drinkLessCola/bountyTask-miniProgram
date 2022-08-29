// miniprogram.ts
const tabList = [
  "/pages/home/home",
  "/pages/taskCenter/taskCenter",
  "/pages/message/message",
  "/pages/userCenter/userCenter",
]
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabBarBottom: app.globalData.tabBarBottom,
    selected: 1,
  },

  switchTab(e:BindTapEvent) {
    const { dataset } = e.currentTarget
    const idx = +dataset.idx - 1
    console.log(tabList[idx])
    wx.switchTab({
      url:tabList[idx],
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
  },
  switchPage(){
    wx.navigateTo({
      url: '../pages/publishTask/publishTask',
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

export { }