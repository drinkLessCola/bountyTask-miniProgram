interface Message {
  createTime: number,
  id: number,
  role: number,
  status: number,
  taskId: number,
  userId: number,
  getNum?: number,
  finishNum?: number
}
type STATUS = '已查看' | '领取' | '确认' | '完成' | '认定无效'