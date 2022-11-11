import {getRequest, putRequest, postRequest } from '../utils/request' 
// 按关键词/标签搜索，并按照条件进行排序 自动调用(推荐任务)和手动调用都有
export async function search(keyword:string, category:string,campus:string,condition:string) {
  const data = JSON.stringify({keyword, category,campus,condition})
  const res = await postRequest(`/task/selectsort`, data)
  return res
}