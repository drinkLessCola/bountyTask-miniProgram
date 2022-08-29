import FormData from './formdata.js'

const BASE_URL = "https://summerblink.site"

type Method = 'GET' | 'POST' | 'PUT'
// interface RequestOption<T> {
//   url: string,
//   data?: T,
//   header?: object,
//   timeout?: number,
//   method: 'GET' | 'POST' | 'PUT',
//   dataType: string,
//   responseType: string,
// }

// interface PromiseRes {
//   then:(res:any) => any;
//   catch:(err:Error) => any;
//   [Symbol.toStringTag]:string;
//   finally:(res:any) => any;
//   [key:string]:any;
// }
export const postRequest = async(url:string, data:string | object | ArrayBuffer, method:Method, header?:object) => {
  console.log()
  const res = await new Promise((resolve:(res:Object) => void, reject:(err: WechatMiniprogram.GeneralCallbackResult | undefined) => void) => {
    wx.request({
      url: BASE_URL + url,
      data,
      method,
      header,
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
  .then((result:Object) => console.log(result))
  .catch((err:WechatMiniprogram.GeneralCallbackResult) => console.log(err))
  
  return res;
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

export const putRequest = async (url:string, data:Object) => {
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

