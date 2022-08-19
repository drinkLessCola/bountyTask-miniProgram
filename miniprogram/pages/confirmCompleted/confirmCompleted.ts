// pages/confirmCompleted/confirmCompleted.ts
const appcC = getApp()
Page({
    
  /**
   * 页面的初始数据
   */
  
  data: {
    height:  appcC.globalData.navBarHeight,

    //---------------警告，测试用的task属性和后端不一样
    task: {
      id: 0,
      title: '测试',
      area: '泰山区',
      deadline: 1660566722638,
      startTime: 1660566722638,
      bounty: 5,
      requirement:'完成后截图'
    },
    imgArray:['/images/confirmCompleted/testImg.png','/images/confirmCompleted/testImg.png','/images/confirmCompleted/testImg.png','/images/confirmCompleted/testImg.png','/images/confirmCompleted/testImg.png','/images/confirmCompleted/testImg.png']
  },

  refuse() {
    console.log('no');
    
  },

  confirm() {
    console.log('yes');
    
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