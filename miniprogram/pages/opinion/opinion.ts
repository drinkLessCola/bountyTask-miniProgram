import { submitOpinion } from "../../API/opinion";

// pages/opinion/opinion.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: ''
  },
  textInput(e: any) {
    const msg = e.detail.value
    this.setData({ msg })
  },
  submit(){
    const { id:userid } = wx.getStorageSync('user'),
          {msg} = this.data

    console.log(userid, msg)
    submitOpinion(userid, msg)
    .then(() => {
      wx.showToast({
        title:'提交成功',
        icon:'success'
      })
      setTimeout(() => {
        wx.navigateBack()
      }, 1000);
    })
    .catch(err => {
      console.log(err)
      wx.showToast({ title: '提交失败', icon: 'none'})
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