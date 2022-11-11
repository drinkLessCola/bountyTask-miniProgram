import { getTaskStatus } from "../../../API/taskDetail"
import { getTaskByStatus } from "../../../API/taskList"
const STATUS_MAP = {
  finished: 0,
  processing: 1,
  all: 5,
  waitForConfirm: 2,
}

const ROLE_MAP = {
  publisher: 1,
  receiver: 0
}

const OPTION_VALUE_MAP = {
  '全部': 0,
  '进行中': 1,
  '待确认': 2,
  '已截止': 3,
  '已下线': 4,
}
const app = getApp()
// miniprogram.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:app.globalData.isRelease,
    taskList: [] as TaskObj[],
    switchOptions: [
      { label: '全部', value: OPTION_VALUE_MAP['全部']},
      { label: '进行中', value: OPTION_VALUE_MAP['进行中']},
      { label: '待确认', value: OPTION_VALUE_MAP['待确认'] },
      { label: '已截止', value: OPTION_VALUE_MAP['已截止'] },
      { label: '已下线', value: OPTION_VALUE_MAP['已下线'] },
    ],
    switchIdx: 0,
    bottomBarHeight: app.globalData.bottomBarHeight,
  },
  handleSwitch(e:any) {
    const { detail:value } = e
    this.getTaskList(value)
  },
  async getTaskList(value:number) {
    console.log('value', value)
    this.setData({ switchIdx: value })
    
    const role = ROLE_MAP.publisher
    let status!:number
    switch(value) {
      case OPTION_VALUE_MAP['已截止']:
      case OPTION_VALUE_MAP['全部']: status = STATUS_MAP.all; break;
      case OPTION_VALUE_MAP['进行中']: status = STATUS_MAP.processing; break;
      case OPTION_VALUE_MAP['待确认']: status = STATUS_MAP.waitForConfirm; break;
      case OPTION_VALUE_MAP['已下线']: status = STATUS_MAP.finished; break;
    }
    try {
      const data = await this.getTaskListByStatus(role, status)
      const now = Date.now()
      let taskList = data === '成功' ? [] : (data as TaskObj[])

      // 不是 "全部" / "已下线" / "待确认"，则按照是否截止进行过滤
      if(![OPTION_VALUE_MAP['全部'], OPTION_VALUE_MAP['已下线'], OPTION_VALUE_MAP['待确认']].includes(value)) {
        console.log('过滤出已截止', value === OPTION_VALUE_MAP['已截止'])
        taskList = taskList.filter(task => {
          const deadline = task.deadline.replace(/-/g, '/') 
          console.log(new Date(deadline).getTime(), now, new Date(deadline).getTime() > now)
          const res = new Date(deadline).getTime() > now
          return value === OPTION_VALUE_MAP['已截止'] ? !res : res
        })
      }
      console.log(taskList)
      // 过滤出含有待确认的任务
      // if(OPTION_VALUE_MAP['待确认'] === value) {
      //   let promiseRes = await Promise.allSettled(
      //     taskList.map((task) => new Promise(async(resolve) => {
      //       const res = (await getTaskStatus(task.id)) as TaskStatusObj[];
      //       res.splice(0, 1)
      //       const waitTaskList = res.filter(task => {
      //         return task.status === 2
      //       })
      //       resolve(!!waitTaskList.length)
      //     }))
        // )
        // promiseRes = promiseRes.map((p:any) => p.value)
        // taskList = taskList.filter((task, idx) => promiseRes[idx])
      // }
      console.log(taskList)
      this.setData({ taskList })
    } catch (err) {
      console.log(err)
          wx.showToast({ title: '获取任务列表失败！', icon: 'none'})
    }

  },
  getTaskListByStatus(role:number, status:number) {
    const { id:userid } = wx.getStorageSync('user')
    // 已完成的任务
    return getTaskByStatus( userid, role, status ) 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(e:any) {
    const { option } = e
    this.setData({switchIdx:Number(option)})
    this.getTaskList(this.data.switchIdx)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    console.log('!', this.data.switchIdx)
    this.getTaskList(this.data.switchIdx)  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})