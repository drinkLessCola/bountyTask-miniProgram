import {getRequest, putRequest, postRequest } from '../utils/request' 

export async function getCollectedTasksById (userid:string) {
  const res = await getRequest(`/collect/_mget/${userid}`)
  return res
}
// 查询用户收藏的任务 

export async function deleteCollectedTasksById (userid:Number,taskid:Number) {
  const data = JSON.stringify({userid, taskid})
  const res = await putRequest(`/delete`,data)
  return res
}

//删除收藏任务

