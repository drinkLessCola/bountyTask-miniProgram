// miniprogram.ts
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:app.globalData.isRelease,
    type:'fetch',
    intro:{
      fetch:'你是否遇到了需要他人帮忙取物的情况？比如取快递、外卖。\n或者是否发生了U盘、耳机、钥匙落在教室里面的情况，但又不想再跑一趟?\nDon\'t Worry！发布一个小任务，让其他同学来帮助你。',
      buy:'想吃学校旁边的美食又不想出门?需要的东西在校外才能买到?\nDon\'t Worry！发布一个小任务，让其他同学来帮助你。',
      vote:'还在随便一个群聊中用红包召集他人帮你投票吗？担心有人领了红包但是没有投票？\nDon\'t Worry！发布一个小任务，可以更加方便地让他人帮你投票。',
      other:'还有什么其他的需求，找临时的宠物照看?找兼职的同学?只要在法律允许的范围内，清晰地描述自己的需求。\n即可发布一个小任务，让其他同学来帮助你。'
    },
    bottomBarHeight: app.globalData.bottomBarHeight,
    label:{
      fetch:'取物',
      buy:'代购',
      vote:'投票',
      other:'其他'
    }
  },
  toPublishTask() {
    wx.navigateTo({
      url:"/pages/publishTask/publishTask"
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const {type} = options
    this.setData({
      type
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

export {}