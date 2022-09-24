// index.ts

import { getCollectedTasksById } from "../../API/taskCollection"

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
    const taskArr:TaskObj[] = this.data.taskArray
    if(!taskArr.length) return

   let clearIdArray = []
   const now = new Date(Date.now()).getTime()

  //  taskArr.filter(element => {
  //     if(element.deadline.getTime() < now){
  //       clearIdArray.push(element.id)
  //     }
  //  })
   //调用对应接口
    
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
