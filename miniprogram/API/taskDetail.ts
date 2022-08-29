import {getRequest, putRequest, postRequest } from '../utils/request' 

export async function getTaskById (taskId:string) {
  const res = await getRequest(`/task/get/${taskId}`)
  return res
}
/*------------ 任务详情（执行人） -------------*/
/**
 * 任务详情
 */
export async function getTaskDetail(taskId:string) {
  const res = await getRequest(`/user_task/get/${taskId}`)
  return res
}

/**
 * 根据 任务 id 获取任务发布者 id / 执行者 id，以及在该任务的状态
 * @param taskId 任务 id
 */
 export async function getTaskStatus(taskId:string) {
   const res = await getRequest(`/user_task/get/${taskId}`)
   return res
 }
/*----------------------------------*/


/*------------ 任务详情（发布人） -------------*/
/**
 * 发布人确认执行人提交的任务
 * @param userid 完成任务的用户 id
 * @param taskid 任务 id
 */
export async function confirmTask (userid:string, taskid:string) {
  const data = JSON.stringify({userid, taskid})
  const res = await putRequest(`/task/confirm`, data)
  return res
}

/**
 * 下线任务
 * @param userId 用户 id
 * @param taskId 任务 id
 */
export async function offlineTask(userId:string, taskId:string) {
  const data = JSON.stringify({userId, taskId})
  const res = await putRequest(`/task/offline`, data)
  return res
}
/*----------------------------------*/