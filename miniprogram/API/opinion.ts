import {postRequest } from '../utils/request' 

export async function submitOpinion (userid: number, msg: string) {
  const res = await postRequest(`/message/add`, { userid, msg })
  return res
}