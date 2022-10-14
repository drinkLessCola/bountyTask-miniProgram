import { getTaskByStatus, getUserTaskStatus } from "../../../API/taskList"
const STATUS_MAP = {
  finished: 0,
  processing: 1,
  waitForConfirm: 2
}

const ROLE_MAP = {
  publisher: 1,
  receiver: 0
}

const OPTION_VALUE_MAP = {
  '已完成': 0,
  '待确认': 1
}
const app = getApp()
// miniprogram.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    taskList: [['2022-10', []]] as [string, TaskObj[]][],
    switchOptions: [
      { label: '已完成', value: OPTION_VALUE_MAP['已完成'] },
      { label: '待确认', value: OPTION_VALUE_MAP['待确认'] }
    ],
    switchIdx: 0,
    bottomBarHeight: app.globalData.bottomBarHeight,
  },
  handleSwitch(e:any) {
    const { detail:value } = e
    this.getTaskList(value)
  },
  getTaskListByStatus(role:number, status:number) {
    const { id:userid } = wx.getStorageSync('user')
    // 已完成的任务
    return getTaskByStatus( userid, role, status ) 
  },
  async getTaskList(value:number) {
    this.setData({ switchIdx: value })
    
    const { id:userid } = wx.getStorageSync('user')
    const role = ROLE_MAP.receiver
    const status = value === 0 /* 已完成 */ ? STATUS_MAP.finished : STATUS_MAP.waitForConfirm
    
    try {
      let finishedTaskList = (await this.getTaskListByStatus(role, 0 /* 已完成的任务 */)) as (TaskObj[] | '成功')
      if(finishedTaskList === '成功') finishedTaskList = [];
      console.log(finishedTaskList)

      const taskMap = new Map<string, TaskObj[]>();

      const taskListWithStatus = (await Promise.all(
        finishedTaskList.map((d) => new Promise(async (resolve, reject) => {
          const taskid = d.id
          const {status} = (await getUserTaskStatus(userid, taskid) ) as TaskStatus
          resolve({...d, status })
       }))
      ))as TaskObj[]
      
      finishedTaskList = taskListWithStatus.filter(task => task.status === status)
      finishedTaskList.forEach((task: TaskObj) => {
        const { startTime } = task;
        const [month] = startTime.match(/(\d{4})-(\d{2})/g) || ['1970-01']
        console.log(month)
        if(taskMap.get(month)) taskMap.get(month)?.push(task)
        else taskMap.set(month, [task])
      })
        const taskList = Array.from(taskMap.entries())
        console.log(taskList)
        this.setData({
          taskList
        })
    } catch(err) {
      console.log(err)
      wx.showToast({ title: '获取任务列表失败！', icon: 'none'})
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

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