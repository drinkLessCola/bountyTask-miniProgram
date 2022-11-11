import { getTaskByStatus } from "../../../API/taskList"
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
  '最近接受': 0,
  '最早截止': 1,
  '已截止': 2
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
      { label: '最近接受', value: OPTION_VALUE_MAP['最近接受'] },
      { label: '最早截止', value: OPTION_VALUE_MAP['最早截止'] },
      { label: '已截止', value: OPTION_VALUE_MAP['已截止'] }
    ],
    switchIdx: 0,
    bottomBarHeight: app.globalData.bottomBarHeight,
  },
  handleSwitch(e:any) {
    const { detail:value } = e
    this.getTaskList(value)
  },
  async getTaskList(value:number) {
    console.log(value)
    this.setData({ switchIdx: value })
    
    const role = ROLE_MAP.receiver,
          status = STATUS_MAP.processing
    const waitForConfirmTask = (await this.getTaskListByStatus(role, STATUS_MAP.waitForConfirm)) as TaskObj[]
    const waitForConfirmTaskId = waitForConfirmTask.map(t => t.id)
    console.log(waitForConfirmTaskId)
    this.getTaskListByStatus(role, status)
      .then((data) => {
        if(data === '成功') data = [] as TaskStatusObj[]
        data = (data as TaskStatusObj[]).filter((task:TaskStatusObj) => !waitForConfirmTaskId.includes(task.id))
        const sortByDeadline = (a:TaskObj, b:TaskObj) => {
          const deadlineA = new Date(a.deadline.replace(/-/g, '/') )
          const deadlineB = new Date(b.deadline.replace(/-/g, '/') )
          return deadlineA.getTime() > deadlineB.getTime() ? 1 : -1
        }
        const now = Date.now()
        let taskList = (data as TaskObj[]).filter(task => {
          const res = new Date(task.deadline.replace(/-/g, '/') ).getTime() > now
          return value === OPTION_VALUE_MAP['已截止'] ? !res : res
        })
        switch(value) {
          case OPTION_VALUE_MAP['最早截止']: taskList.sort(sortByDeadline); break;
          case OPTION_VALUE_MAP['最近接受']: taskList.reverse(); break;
        }
        console.log(taskList)
        this.setData({
          taskList
        })
      })
      .catch(err => {
        console.log(err)
        wx.showToast({ title: '获取任务列表失败！', icon: 'none'})
      })

  },
  getTaskListByStatus(role:number, status:number) {
    const { id:userid } = wx.getStorageSync('user')
    // 已完成的任务
    return getTaskByStatus( userid, role, status ) 
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