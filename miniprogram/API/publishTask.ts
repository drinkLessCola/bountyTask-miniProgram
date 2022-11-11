import {getRequest, putRequest, postRequest } from '../utils/request' 

export async function publishTask(data:Object) {
  const res = await postRequest(`/task/publish`, data)
  return res
}