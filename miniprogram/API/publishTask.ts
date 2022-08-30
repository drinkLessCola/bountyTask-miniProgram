import {getRequest, putRequest, postRequest } from '../utils/request' 

export async function publishTask(data:Object) {
  const res = await postRequest(`/task/selectsort`, JSON.stringify(data))
  return res
}