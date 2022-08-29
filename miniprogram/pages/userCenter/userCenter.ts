// miniprogram.ts
import { getTaskById } from '../../API/taskDetail'
import { onLogin } from '../../API/user'

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
      this.login()
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
  login() {
    if(this.data.nickName && this.data.avatarUrl) return 
    wx.login({
      success(res) {
        if (!res.code) {
          console.log('登录失败！' + res.errMsg)
          return
        }
        console.log('code', res.code)
        wx.setStorageSync('user_code', res.code)
      }
    })
    wx.getUserProfile({
      desc: '必须授权才能使用',
      success:res => {
        let user=res.userInfo
        wx.setStorageSync('user', user) //信息暂存在客户端
        this.setData({
          encryptedData: res.encryptedData,
          iv: res.iv
        })
        const code = wx.getStorageSync('user_code')
        const encryptedData = res.encryptedData
        const iv = res.iv
        console.log(code, encryptedData, iv)
        onLogin({code:code, encryptedData:encryptedData, iv:iv})
        .then(data => { /* 处理成功的响应 */
          console.log(data)
          const {avatarUrl, nickName, openId, id:uid} = data
          // 存储必要信息
          wx.setStorageSync('avatarUrl', avatarUrl)
          wx.setStorageSync('nickName', nickName)
          wx.setStorageSync('openId', openId) // 这是啥来着……
          wx.setStorageSync('uid', uid)
          
          this.setData({
            nickName,
            avatarUrl
          })
        })
        .catch(err => { /* 处理失败的响应 */
          console.log(err)
        })
        
      },
      fail:() => {
        wx.showToast({
          icon:'none',
          title:'登录失败！'
        })
      }
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