// pages/finish/finish.ts
const appf = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height:  appf.globalData.navBarHeight,
    // 目前发现需要的接口
    // 根据任务id查询
    // 上传证明图片 多次调用
    // 删除某个证明图片 额,似乎是全删
    // 查找该用户在该任务中提交的证明图片 额，每上传一张就重新调用一次。。
    // 提交任务
    task: {
      id: 0,
      title: '测试',
      request: '完成后截图'
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
  onLoad(option) {
    const task = this.data.task
    task.id=Number(option.id)
    this.setData({
      task:task
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