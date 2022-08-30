// index.ts

import { getCollectedTasksById } from "../../API/taskCollection"

// import {icon_time, icon_address} from '../../utils/icon'
const apptc = getApp()

Page({
  data: {
    height:apptc.globalData.navBarHeight,
    //task的数组，以后应该是后端给一个task数组，直接把给来的数组setData就好

    // 目前已发现需要的接口:
    // 查询用户收藏的任务
    // 删除收藏任务 多次调用

    // -------------------------------警告，现在写在前端测试用的task对象的属性和后端不一样-------------------------------------
    taskArray:[] as TaskObj[]
    // [{
    //     id: 0,
    //     title: '测试',
    //     area: '泰山区',
    //     deadline: 1660566722638,
    //     startTime: 1660566722638,
    //     bounty: 5
    // }]
    
  },

  toTaskDetail(e:any) {
    const userid = wx.getStorageSync('uid')
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

   taskArr.forEach(element => {
      if(element.deadline.getTime() < now){
        clearIdArray.push(element.id)
      }
   })
   //调用对应接口
    
  },

  
  
  onLoad(options) {
    const {userid} = options
    this.getCollection(userid as string)
  },

  getCollection(userid:string) {
    getCollectedTasksById(userid)
    .then(data =>{
      this.setData({
        taskArray: data as TaskObj[]
      })
    })
    .catch(err => {
      console.log(err)
    })
  }
})
