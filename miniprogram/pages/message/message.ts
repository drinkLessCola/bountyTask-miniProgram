import { getMsg, getTaskById } from "../../API/message"

// index.ts
const app = getApp()
const ROLE_OPTION_MAP = {
  publisher: 1,
  receiver: 0
}

const STATUS_MAP = <const>[
  '已查看',
  {
    [ROLE_OPTION_MAP.publisher]: '领取',
    [ROLE_OPTION_MAP.receiver]: '确认',
  },
  {
    [ROLE_OPTION_MAP.publisher]: '完成',
    [ROLE_OPTION_MAP.receiver]: '认定无效',
  }
]

interface TaskMsg {
  taskId: number
  number?: number
  status: STATUS
  time: number
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
  ] as Message[],

    getShowMsgArray:[
    //   {
    //   taskId:0,
    //   taskTitle:'测试A',
    //   status:'任务未通过',
    //   time:'5小时前'
    // }
  ],
    // 发布的任务消息数组和领取的任务消息数组（处理后的）,展示用
    publishMsgArray:[] as TaskMsg[],

    receiveMsgArray:[] as TaskMsg[],
    
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
      const taskObj = this.data.receiveMsgArray[t.index]
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
  subscribeMsg() {
    app.subscribe('message', async (msgArr:Message[]) => {
      // msgArr = [{
      //   createTime: 1665657970000,
      //   finishNum: 0,
      //   getNum: 1,
      //   id: 1,
      //   role: 1,
      //   status: 1,
      //   taskId: 1,
      //   userId: 1
      // }]
      if(!msgArr.length) return
      const publish = (await Promise.all(
        msgArr.filter(msg => msg.role === ROLE_OPTION_MAP.publisher)
        .map(msg => new Promise(async resolve => {
          const { createTime: time, finishNum, getNum, status:statusCode, role, taskId } = msg
          const status = STATUS_MAP[statusCode][role]
          const number = finishNum || getNum
          const {title} = await getTaskById(taskId) as TaskObj
          resolve({ time, number, status, taskId, title } as TaskMsg)
        }))
      )) as TaskMsg[]
      const receive = (await Promise.all(
        msgArr.filter(msg => msg.role === ROLE_OPTION_MAP.receiver)
        .map(msg => new Promise(async resolve => {
          const { createTime: time, status:statusCode, role, taskId } = msg
          const status = STATUS_MAP[statusCode][role]
          const {title} = await getTaskById(taskId) as TaskObj
          resolve({ time, status, taskId, title } as TaskMsg)
        }))
      )) as TaskMsg[]
      console.log('publish', publish)
      console.log('receive', receive)
      this.setData({
        publishMsgArray: publish,
        receiveMsgArray: receive
      })
      // 清空数据！
      app.globalData.clearMsg()
    })
  },
  onLoad() {
    const {id} = wx.getStorageSync('user')
    this.subscribeMsg()
    this.setData({ userid: id })
  },
  onShow() {
    //自定义的tabbar
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3
      })
    }
  },
})
