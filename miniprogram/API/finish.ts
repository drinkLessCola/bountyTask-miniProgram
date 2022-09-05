import {getRequest, putRequest, postRequest } from '../utils/request' 
// 提交任务
export async function submitTask(taskid:number, userid:number) {
  const data = {userid, taskid}
  const res = await postRequest(`/task/submit`,data)
  return res
}

// 根据任务id查询

export async function getTaskById (taskId:string) {
  const res = await getRequest(`/task/get/${taskId}`)
  return res
}

// 上传证明图片 额，这用户上传的图片是url？
// 好像确实有点奇怪
// export async function submitImage(taskid:number,userid:number,image:string) {
//   const data = {userid, taskid,image}
//   const res = await postRequest(`/prove/submit`,data)
//   return res
// }


export async function submitImage(taskid:number,userid:number,image:string[]) {
  const data = {userid, taskid,image}
  const res = await postRequest(`/prove/submit`,data)
  return res
}


// 删除某个证明图片 (额，所以是哪个。。。。)
export async function delImage(userid:number, taskid:number) {
  const data = {userid, taskid}
  const res = await putRequest(`/prove/del`, data)
  return res
}

// 批量删除证明图片
export async function mdelImage(ids:Array<number>) {
  const data = {ids}
  const res = await putRequest(`/prove/_mdelete`, data)
  return res
}

// 查找该用户在该任务中提交的证明图片 额，每上传一张就重新调用一次。。
export async function getImage(userid:string,taskid:string) {
  const res = await getRequest(`/prove/mget/${userid}/${taskid}`)
  return res
}


