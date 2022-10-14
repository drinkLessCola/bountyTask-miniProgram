import {getRequest, putRequest, postRequest } from '../utils/request' 

export async function getTaskByStatus (userid: number, role: number, status: number) {
  const res = await getRequest(`/task/_mget/${userid}/${role}/${status}`)
  return res
}

export async function getUserTaskStatus(userid: number, taskid: number) {
  const res = await getRequest(`/user_task/getStatus/${userid}/${taskid}`)
  return res
}