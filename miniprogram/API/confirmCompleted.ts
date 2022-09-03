import {getRequest, putRequest, postRequest } from '../utils/request' 

// 查找该用户在该任务中提交的证明图片 both
export async function getImage(userid:string,taskid:string) {
  const res = await getRequest(`/prove/mget/${userid}/${taskid}`)
  return res
}

// 根据用户id查询 获取用户昵称和用户头像 发
export async function getUserInfo(id:string) {
  const res = await getRequest(`/user/get/${id}`)
  return res
}

// 发布人确认执行人提交的任务  发

export async function confirmeTask(userid:number, taskid:number) {
  const data = {userid, taskid}
  const res = await putRequest(`/task/confirm`, data)
  return res
}

// 认定无效  发

export async function rejectTask(userid:number, taskid:number) {
  const data = {userid, taskid}
  const res = await putRequest(`/task/reject`, data)
  return res
}

//任务提交后的状态：等待/通过/未通过 执

export async function taskStatus(userid:number, taskid:number) {
  const res = await getRequest(`/user_task/getStatus/${userid}/${taskid}`)
  return res
}