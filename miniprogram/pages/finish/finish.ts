// pages/finish/finish.ts
const appf = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '完成情况', //导航栏 中间的标题
    },
    height:  appf.globalData.navBarHeight,

    task: {
      id: 0,
      title: '测试',
      area: '泰山区',
      deadline: 1660566722638,
      timestamp: 1660566722638,
      bounty: 5,
      requirement: '完成后截图'
    },

    imgArray: ['/images/confirmCompleted/testImg.png', '/images/confirmCompleted/testImg.png', '/images/confirmCompleted/testImg.png', '/images/confirmCompleted/testImg.png', '/images/confirmCompleted/testImg.png'],

    // 我不知道用户上传img怎么写在data里噢，是url还是什么玩意？

    submitData: {
      text: '',
    }
  },

  textInput: function (e: any) {
    var newSubmitData = this.data.submitData
    newSubmitData.text = e.detail.value
    this.setData({
      submitData : newSubmitData
    })
    // console.log(this.data.submitData);
    
  },

  addImg: function () {
    console.log("add");

  },
  // 这两得找后端，暂时没写实现
  submit: function () {
    console.log("submit");

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