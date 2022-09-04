import {getRequest, putRequest, postRequest } from '../utils/request' 

// 任务收藏夹的 api

/**
 * 获取用户的收藏任务
 * @param userid 用户 uid
 */
export async function getCollectedTasksById (userid:number) {
  const res = await getRequest(`/collect/_mget/${userid}`)
  return res
}

/**
 * 取消收藏某个任务
 * @param userid 用户 id
 * @param taskid 任务 id
 */
export async function deleteCollectedTasksById (userid:number, taskid:number) {
  const data = {userid, taskid}
  const res = await putRequest(`/collect/delete`,data)
  return res
}

//删除收藏任务

