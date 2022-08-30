import {getRequest, postRequest } from '../utils/request' 
interface LoginData {
  code:string,
  encryptedData:any,
  iv:any,
}
/**
 * 登录
 * @param d LoginData 登录所需的数据
 */
export async function onLogin(data:LoginData){
  // const data = new FormData()
  // data.appendAll(d)
  // const formData = data.getData()
  // 'Content-Type': formData.contentType,
  const res = postRequest('/login', data)
  return res
}

/**
 * 根据用户角色和任务状态查询任务
 * @param userId 用户 id
 * @param role 用户角色
 * @param status 要查询的任务状态
 */
export async function getUserTask(userId:string, role:string, status:string) {
  const res = await getRequest(`/user_task/get/${userId}/${role}/${status}`)
  return res
}
/*----------------------------------*/