import { onLogin } from "../API/user"

export async function login() {
  return new Promise((resolve, reject) => {
    const nickName = wx.getStorageSync('nickName')
    const avatarUrl = wx.getStorageSync('avatarUrl')
    if(nickName && avatarUrl) return 
    wx.login({
      success(res) {
        if (!res.code) {
          console.log('???')
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
        wx.showLoading({
          title:'登录中'
        })
        let user = res.userInfo
        console.log(user)
        const code = wx.getStorageSync('user_code')
        wx.removeStorageSync('user_code')
        const encryptedData = res.encryptedData
        const iv = res.iv
        console.log(code, encryptedData, iv)
        onLogin({
          code:code, 
          encryptedData:encryptedData, 
          iv:iv
        })
        .then(data => { /* 处理成功的响应 */
          wx.showToast({
            icon:'success',
            title:'登录成功！'
          })
          console.log(data)
          const {avatarUrl, nickName, openId, id:uid} = data
          // 存储必要信息
          wx.setStorageSync('avatarUrl', avatarUrl)
          wx.setStorageSync('nickName', nickName)
          wx.setStorageSync('openId', openId) // 这是啥来着……
          wx.setStorageSync('uid', uid)
          resolve(uid)
        })
        .catch(err => { /* 处理失败的响应 */
          console.log(err)
          reject(err)
        })
        
      },
      fail:(err) => {
        wx.showToast({
          icon:'none',
          title:'登录失败！'
        })
        reject(err)
      }
    })
  })
  

}