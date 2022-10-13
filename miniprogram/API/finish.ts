import {getRequest, putRequest, postRequest,formDataRequest, deleteRequest} from '../utils/request' 

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

/**
 * 提交任务图片
 * @param data 
 */
export async function submitImage(data:FormData) {
  console.log(data)
  const res = await formDataRequest(`/prove/submit`, data)
  return res
}


// 删除某个证明图片
export async function delImage(imgID:string) {
  //const data = {imgID}
  const res = await deleteRequest(`/prove/del/${imgID}`, )
  return res
}

// 批量删除证明图片
export async function mdelImage(ids:Array<number>) {
  const data = {ids}
  const res = await putRequest(`/prove/_mdelete`, data)
  return res
}

// 查找该用户在该任务中提交的证明图片 额，每上传一张就重新调用一次。。
// 不用的，onShow 的时候调用即可
export async function getImage(userid:number, taskid:number) {
  const res = await getRequest(`/prove/mget/${userid}/${taskid}`)
  return res
}


