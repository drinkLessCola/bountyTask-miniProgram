import {postRequest } from '../utils/request' 

export async function submitOpinion (userid: number, mes: string) {
  const res = await postRequest(`/message/add`, { userid, mes })
  return res
}