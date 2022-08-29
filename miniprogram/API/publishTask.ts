import {getRequest, putRequest, postRequest } from '../utils/request' 

// 我觉得噢，你可以直接传一个对象过来😂，不需要声明这么多参数
// 在发布任务的 ts 文件中打包成一个对象就可以了

export async function publishTask(data:Object) {
  const res = await postRequest(`/task/selectsort`, JSON.stringify(data))
  return res
}