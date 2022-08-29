import {getRequest, putRequest, postRequest } from '../utils/request' 
// 提交任务
export async function submitTask(taskid:number,userid:number) {
  const data = JSON.stringify({userid, taskid})
  const res = await postRequest(`/task/submit`,data,'POST')
  return res
}

// 根据任务id查询

export async function getTaskById (taskId:string) {
  const res = await getRequest(`/task/get/${taskId}`)
  return res
}

// 上传证明图片 额，这用户上传的图片是url？
export async function submitImage(taskid:number,userid:number,image:string) {
  const data = JSON.stringify({userid, taskid,image})
  const res = await postRequest(`/prove/submit`,data,'POST')
  return res
}

// 删除某个证明图片 (额，所以是哪个。。。。)

export async function delImage(userid:number, taskid:number) {
  const data = JSON.stringify({userid, taskid})
  const res = await putRequest(`/task/offline`, data)
  return res
}

// 查找该用户在该任务中提交的证明图片 额，每上传一张就重新调用一次。。
export async function getImage(userid:string,taskid:string) {
  const res = await getRequest(`/prove/mget/${userid}/${taskid}`)
  return res
}


