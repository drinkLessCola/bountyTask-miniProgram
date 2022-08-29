import {getRequest, putRequest, postRequest } from '../utils/request' 
// 发布任务
export async function publishTask(title:string, illustrate:string,bounty:number,tasknumber:number,deadline:string,request:string,contact:string,label:string,total:number,userid:number,category:string) {
  const data = JSON.stringify({title,illustrate,bounty,tasknumber,deadline,request,contact,label,total,userid,category})
  const res = await postRequest(`/task/selectsort`, data,'POST')
  return res
}