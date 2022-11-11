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
    show: app.globalData.isRelease,
    hasMessage: false
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
    console.log('?')
    wx.navigateTo({
      url: '/pages/publishTask/publishTask',
    })
  },
  subscribeMsg() {
    app.subscribe('message', (msgArr:Message[]) => {
      this.setData({
        hasMessage: !!msgArr.length
      })
    })
  },
  onLoad() {
    this.subscribeMsg()
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