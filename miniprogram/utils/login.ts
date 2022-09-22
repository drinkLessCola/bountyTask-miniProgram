import { onLogin, tokenLogin } from "../API/user"

export async function login() {
  // 有用户信息，就返回
  const user = wx.getStorageSync('user')
  if (user) return

  const token = wx.getStorageSync('token')
 
  // 先使用 token 登录！
  if (token) {
    wx.showLoading({ title: '登录中' })
    try {
      const data = await tokenLogin(token)
      console.log(data)
      wx.showToast({
        icon: 'success',
        title: '登录成功！'
      })
      const user = data
      // 存储必要信息
      wx.setStorageSync('user', user)
      wx.setStorageSync('uid', user.id)
      return user.id
    } catch (err) {
      console.log(err)
      wx.showToast({ title: '登录状态已过期，请重新登录', icon: 'none' })
    }
  }

  // 没有 token / token 过期
  // 取 user_code
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
  // 取得用户授权
  wx.getUserProfile({
    desc: '必须授权才能使用',
    success: async res => {
      const code = wx.getStorageSync('user_code')
      const encryptedData = res.encryptedData
      const iv = res.iv
      wx.removeStorageSync('user_code')

      // 登录
      onLogin({
        code: code,
        encryptedData: encryptedData,
        iv: iv
      })
        .then(data => {
          return handleLoginSuccess(data)
        })
        .catch(err => {
          console.log(err)
          throw err
        })
    },
    fail: (err) => {
      wx.showToast({
        icon: 'none',
        title: '登录失败！'
      })
      throw err
    }
  })
}

/**
 * 处理登录成功的情况
 * @param data 登录成功时的响应数据
 */
function handleLoginSuccess(data: Object): number {
  wx.showToast({
    icon: 'success',
    title: '登录成功！'
  })
  const { user, token } = data
  // 存储必要信息
  wx.setStorageSync('user', user)
  wx.setStorageSync('uid', user.id)
  wx.setStorageSync('token', token)
  return user.id
}