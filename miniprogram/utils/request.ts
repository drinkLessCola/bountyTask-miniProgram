import FormData from './formdata.js'

const BASE_URL = "http://43.138.254.32"
// 需要备案，否则腾讯云不解析。。😡

interface ResultObject {
  data:{
    code:number,
    data:Object,
    message:string
  },
  errMsg:string
}
// 响应拦截器，抄的
const dataInterceptor = (response:ResultObject) => {
  console.log("response:", response);
  const {data, code, message} = response.data
    if(code) return Promise.resolve(data)
    else {
      wx.showToast({
        icon:'none',
        title:message
      })
      return Promise.reject(response.data)
    }
}
const errorInterceptor = (err:WechatMiniprogram.GeneralCallbackResult) => {
  wx.showToast({
    icon:'error',
    title:'网络请求失败，请重试',
  })
  return Promise.reject(err)
}


export const postRequest = async (url:string, data:string | object | ArrayBuffer, header?:object) => {
  const result = await new Promise((resolve:(res:Promise<Object>) => void, reject:(res:Promise<PromiseRejectedResult> | undefined) => void) => {
    wx.request({
      url: BASE_URL + url,
      data,
      method:'POST',
      header:{
        'charset':'utf-8',
        'Content-Type':'application/json',
        ...header
      },
      success(response:ResultObject) {
        resolve(dataInterceptor(response))
      },
      fail(err) {
        reject(errorInterceptor(err))
      }
    })
  })

  return result;
}

export const getRequest = async(url:string) => {
  console.log()
  const res = await new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL + url,
      success(res) {
        console.log(res)
        resolve(res.data)
      },
      fail(res) {
        console.log(res)
        reject(res)
      }
    })
  })
  return res;
}

export const putRequest = async (url:string, data:string | object) => {
  return await new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL + url,
      data,
      method:'PUT',
      success(res) {
        console.log(res)
        resolve(res.data)
      },
      fail(res) {
        console.log(res)
        reject(res)
      }
    })
  })
}

