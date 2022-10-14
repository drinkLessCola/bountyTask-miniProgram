import {getRequest, putRequest, postRequest } from '../utils/request' 
/*--------------- 消息 -------------*/
/**
 * 获取消息
 * @param userid 用户 id
 * @param role  用户角色
 */
export async function getMsg(userid:number, role:number) {
  const res = await getRequest(`/info/get/${userid}/${role}`)
  return res
}

export async function getTaskById (taskId:number) {
  const res = await getRequest(`/task/get/${taskId}`)
  return res
}
/*----------------------------------*/