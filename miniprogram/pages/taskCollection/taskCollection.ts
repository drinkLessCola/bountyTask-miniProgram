// index.ts
// import {icon_time, icon_address} from '../../utils/icon'
const apptc = getApp()
Page({
  data: {
    height:apptc.globalData.navBarHeight,

    userid:0,

    //task的数组，以后应该是后端给一个task数组，直接把给来的数组setData就好

    // 目前已发现需要的接口:
    // 查询用户收藏的任务
    // 删除收藏任务 多次调用

    // -------------------------------警告，现在写在前端测试用的task对象的属性和后端不一样-------------------------------------
    taskArray: [{
        id: 0,
        title: '测试',
        area: '泰山区',
        deadline: 1660566722638,
        startTime: 1660566722638,
        bounty: 5
    }, {
        id: 2,
        title: '测试2',
        area: '华山区',
        deadline: 1660566722638,
        startTime: 1660566722638,
        bounty: 20
    }]
    
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },/*没调用这个*/ 

  toTaskDetail(e:any) {
    const userid = 0 //这玩意从哪搞来？
    const id = e.currentTarget.dataset.id
    let url =  "/pages/taskDetail/taskDetail?taskid="+id +"&userid=" +userid
    wx.navigateTo({
      url:url
    })//跳转到任务详情
  },
  

  btnTap() {
    //清除过期任务
   let clearIdArray = []
   const now = new Date(Date.now()).getTime()

   this.data.taskArray.forEach(element => {
      if(element.deadline < now){
        clearIdArray.push(element.id)
      }
   })
   //调用对应接口
    
  },

  
  
  onLoad() {
    // console.log(icon_address ,icon_time)
    
  },
})
