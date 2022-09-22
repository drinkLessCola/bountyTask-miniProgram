import FormData from '../utils/formdata'
import {formDataRequest, getRequest, postRequest } from '../utils/request' 
interface LoginData {
  code:string,
  encryptedData:any,
  iv:any,
}
/**
 * 通过 token 登录
 * @param {string} token
 */
export async function tokenLogin(token:string){
  const formData = new FormData()
  formData.append('token', token)
  const data = formData.getData()
  const res = await formDataRequest('/token', data)
  return res
}
/**
  * @param d LoginData 登录所需的数据
  */
export async function onLogin(d:LoginData) {
  const res = await postRequest('/login', d)
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