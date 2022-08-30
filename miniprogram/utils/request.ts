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


export const postRequest = async (url:string, unhandleData:string | object | ArrayBuffer, header?:object) => {
  const data = JSON.stringify(unhandleData)
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
  const result = await new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL + url,
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

export const putRequest = async (url:string, unhandleData:string | object) => {
  const data = JSON.stringify(unhandleData)
  return await new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL + url,
      data,
      method:'PUT',
      success(response:ResultObject) {
        resolve(dataInterceptor(response))
      },
      fail(err) {
        reject(errorInterceptor(err))
      }
    })
  })
}

