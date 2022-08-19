// pages/page1/page1.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timestamp: 1660566722638,
    // 暂时使用时间戳以及其number类型代替ddl和提交时间
    missionsArray: [{
        id: 0,
        title: '测试',
        area: '泰山区',
        deadline: 1660566722638,
        timestamp: 1660566722638,
        bounty: 5
    }, {
        id: 2,
        title: '测试2',
        area: '华山区',
        deadline: 1660566722638,
        timestamp: 1660566722638,
        bounty: 20
    }]
  },

  testtimestamp(): number {
    return Date.now()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.setData({
      timestamp: this.testtimestamp()
    })
    //console.log(this.testtimestamp());

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
        selected: 1
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