const BASE_URL = "https://summerblink.site/api"

interface ResultObject {
  data:{
    code:number,
    data:Object,
    message:string
  },
  errMsg:string,
  statusCode:number
}
// 响应拦截器，抄的
const dataInterceptor = (response:ResultObject) => {
  wx.hideLoading()
  console.log("response:", response);
  const {data, code, message} = response.data
  console.log(message)
    if(code === 200) return Promise.resolve(data || message)
    else {
      wx.showToast({
        icon:'none',
        title:message
      })
      return Promise.reject({ code, message })
    }
}
const errorInterceptor = (err:WechatMiniprogram.GeneralCallbackResult) => {
  wx.showToast({
    icon:'error',
    title:'网络请求失败，请重试',
  })
  return Promise.reject(err)
}


export const postRequest = async (url:string, unhandleData:string | object | ArrayBuffer, jsonify:boolean = true, header?:object) => {
  wx.showLoading({title:"加载中", mask:true})
  const data = jsonify? JSON.stringify(unhandleData) : unhandleData
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
  wx.showLoading({title:"加载中", mask:true})
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
  wx.showLoading({title:"加载中", mask:true})
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

export const formDataRequest = async (url:string, data: FormData) => {
  wx.showLoading({title:"加载中", mask:true})
  const result = await new Promise((resolve:(res:Promise<Object>) => void, reject:(res:Promise<PromiseRejectedResult> | undefined) => void) => {
    const {buffer, contentType} = data
    wx.request({
      url: BASE_URL + url,
      data:buffer,
      method:'POST',
      header:{
        'charset':'utf-8',
        'Content-Type': contentType
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