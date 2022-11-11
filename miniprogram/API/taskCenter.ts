import {getRequest, putRequest, postRequest } from '../utils/request' 
// 按关键词/标签搜索，并按照条件进行排序 自动调用(推荐任务)和手动调用都有
export async function searchTask (keyword:string | null = null, category:string | null = null,campus:string | null = null,condition:string | null = null) {
  const data = {keyword, category,campus,condition}
  console.log(JSON.stringify(data))
  const res = await postRequest(`/task/selectsort`, data)
  return res
}