import { getMsg } from "../../API/message"

// index.ts
const app = getApp()
const ROLE_OPTION_MAP = {
  publisher: 1,
  receiver: 0
}
Page({
  data: {
    bottomBarHeight:app.globalData.bottomBarHeight,
    show:app.globalData.isRelease,
    userid: 0,
    role: ROLE_OPTION_MAP.publisher,
    select:[
      { name:"发布的任务", checked:true, value:ROLE_OPTION_MAP.publisher },
      { name:"领取的任务", checked:false, value:ROLE_OPTION_MAP.receiver }
    ],
    publishShowMsgArray:[
    // {
    //   taskId:0,
    //   taskTitle:'测试1',
    //   number:2,
    //   status:'领取',
    //   time:'刚刚'
    // },
  ],

    getShowMsgArray:[
    //   {
    //   taskId:0,
    //   taskTitle:'测试A',
    //   status:'任务未通过',
    //   time:'5小时前'
    // }
  ],
    // 发布的任务消息数组和领取的任务消息数组（处理后的）,展示用
    publishMsgArray:[{

    }],

    getMsgArray:[{

    }],
    
    // 发布的任务消息数组和领取的任务消息数组,存储后端数据用
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },

  change:function(e:any) {
      let sel = this.data.select
      sel.forEach(element => {
        element.checked=false
      });
      const target = e.currentTarget.dataset.id
      sel[target].checked=true
      this.setData({
        select:sel
      })
    
  },
  getMessage(){
    const { role, userid } = this.data
    getMsg(userid, role)
    .then(data => {
      console.log(data)
    })
    .catch(err => {
      console.log(err)
    })
  },
  toDetail(e:any) {
    const t = e.currentTarget.dataset
    let userid = 'userid='+this.data.userid
    // let isPublisher = 'isPublisher=0'
    // 这个在taskDetail自动检测 
    let taskid = '&taskid='+t.id
    let url
    if(this.data.select[0].checked) {
      // 发布的任务就是ture 领取的任务是false
      url = "/pages/taskDetail/taskDetail?"+userid+taskid
      wx.navigateTo({
        url:url
      })
      console.log(url);
      
    }
    else {
      // 领取的任务
      const taskObj = this.data.getMsgArray[t.index]
      // taskObj.status 此ts新增，因为后端  根据用户角色和任务状态查询  需要根据进行中还是已完成的状态去查
      if(0){
        // ------------------------------------------------需要看一下表才能确认
        // 任务已完成
        const t = e.currentTarget.dataset
        // console.log(t.info);
        // 跳转：确认完成界面 
        // 我擦，当时没想到要从消息界面进去。。。得从这里  把东西丢给下一个界面
        let emitData = {
          isPublisher : 1,
          finisherId : this.data.userid,
          taskId : t.id,
          taskTitle :t.title,
          taskRequest : t.request
        }
        wx.navigateTo({
          url:"/pages/confirmCompleted/confirmCompleted",
          success:function(res) {
            res.eventChannel.emit('handleEvent' , emitData)
          }
        })
        
        
      }
      else {
        url="/pages/finish/finish?taskid="+t.id
        // 任务未完成
        wx.navigateTo({
          url:url
        })
      }
      // ------------------------此处需要等后端完成了领取的任务的消息的对应接口
      
    }
    // console.log(this.data.select[0].checked);
    
  },



  onLoad() {
    const {id} = wx.getStorageSync('user')
    this.setData({ userid: id })
  },
  onShow() {
    //自定义的tabbar
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3
      })
    }

    this.getMessage()
  },
})
