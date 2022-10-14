// index.ts

import { deleteCollectedTasksById, getCollectedTasksById } from "../../API/taskCollection"

// import {icon_time, icon_address} from '../../utils/icon'
const app = getApp()

Page({
  data: {
    show:app.globalData.isRelease,
    height:app.globalData.navBarHeight,
    taskArray:[] as TaskObj[]
  },

  toTaskDetail(e:any) {
    const { id:userid } = wx.getStorageSync('user')
    const id = e.currentTarget.dataset.id
    let url =  "/pages/taskDetail/taskDetail?taskid="+ id +"&userid=" +userid
    wx.navigateTo({
      url:url
    })//跳转到任务详情
  },
  
  /**
   * 清除过期任务
   */
  clearExpireTask() {
    const {id:userid} = wx.getStorageSync('user')
    const taskArr:TaskObj[] = this.data.taskArray
    if(!taskArr.length) return

   Promise.all(
     taskArr.filter(task => this.checkOutDate(task.deadline))
      .map(task => deleteCollectedTasksById(userid, task.id))
    )
    .then(() => {
      wx.showToast({ title: '清除成功！', icon: 'success'})
    })
    .catch(err => {
      console.log(err)
      wx.showToast({ title:'清除失败', icon: 'none' })
    })
  },
  checkOutDate(deadline:string):boolean {
    return new Date(deadline).getTime() <= Date.now()
  },
  onLoad() {
    const { id:userid } = wx.getStorageSync('user')
    this.getCollection(userid as string)
  },

  getCollection(userid:string) {
    getCollectedTasksById(+userid)
    .then(data =>{
      console.log('!', data)
      this.setData({
        taskArray: data as TaskObj[]
      })
    })
    .catch(err => {
      console.log(err)
    })
  }
})
