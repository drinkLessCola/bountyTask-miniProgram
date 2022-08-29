import {getRequest, putRequest, postRequest } from '../utils/request' 

export async function getTaskById (taskId:string) {
  const res = await getRequest(`/task/get/${taskId}`)
  return res
}
/* @param taskId 任务 id */
export async function getTaskStatus(taskId:string) {
  const res = await getRequest(`/user_task/get/${taskId}`)
  return res
}

export async function getUserInfo(id:string) {
  const res = await getRequest(`/user/get/${id}`)
  return res
}
// 上面三个上往下依次为:
// 根据任务id获得任务发布者id，任务执行者id，以及其在该任务的状态 both
// 根据任务id查询返回任务对象  both
// 根据用户id查询 获取用户昵称和用户头像 both 多次调用


/*------------ 任务详情（执行人） -------------*/
/**
 * 接任务
 */
export async function takeTask(taskid:number,userid:number) {
  const data = JSON.stringify({userid, taskid})
  const res = await postRequest(`/task/take`,data,'POST')
  return res
}
// 添加收藏任务
export async function addCollectTask(taskid:number,userid:number) {
  const data = JSON.stringify({userid, taskid})
  const res = await postRequest(`/collect/add`,data,'POST')
  return res
}

/*----------------------------------*/


/*------------ 任务详情（发布人） -------------*/
// /**
//  * 发布人确认执行人提交的任务
//  * @param userid 完成任务的用户 id
//  * @param taskid 任务 id
//  */
// export async function confirmTask (userid:string, taskid:string) {
//   const data = JSON.stringify({userid, taskid})
//   const res = await putRequest(`/task/confirm`, data)
//   return res
// }
// 这个不在这个界面
/**
 * 下线任务
 * @param userid 用户 id
 * @param taskid 任务 id
 */
export async function offlineTask(userid:number, taskid:number) {
  const data = JSON.stringify({userid, taskid})
  const res = await putRequest(`/task/offline`, data)
  return res
}
/*----------------------------------*/