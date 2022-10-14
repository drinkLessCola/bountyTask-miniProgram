// component/taskMessage/taskMessage.ts
const SUB_TITLE_MAP = {
  '领取': '有人领取了任务！快来看看',
  '完成': '有人完成了任务！快来看看',
  '确认': '您提交的任务已被确认！',
  '认定无效': '您提交的任务未被通过qwq',
  '已查看': '已查看',
  '截止提醒': '距离截止时间仅剩 12 小时，请尽快完成任务提交！',
}
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    time: Number,
    status: String,
    taskId: Number,
    title: String,
    number: Number
    // status:Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    title:'',
    subTitle: '',
    msgTime:'',
  },


  /**
   * 组件的方法列表
   */
  lifetimes: {
    
    attached: function () {
      const {time, status, number, title} = this.properties
      this.setData({
        msgTime:this.handleTime(time),
        title:this.handleTitle(status as STATUS, title, number),
        subTitle: this.handleSubTitle(this.properties.status as STATUS)
      })
     },
    moved: function () { },
    detached: function () { },
  },

  methods: {
    getTimeInfo(t: number): TimeInfo {
      const time = new Date(t)
      const month = time.getMonth() + 1,
        date = time.getDate(),
        isAm = time.getHours() < 12,
        hour = time.getHours() > 12? time.getHours() % 12 : time.getHours(),
        min = time.getMinutes()
      return { month, date, isAm, hour, min }
    },
    handleTime(time:number):string{
      const past = Math.ceil((Date.now() - new Date(time).getTime()) / 1000)
      const {month, date} = this.getTimeInfo(time)
      let res = ''
      if(past < 60) res = '刚刚'
      else if(past < 3600) res = `${Math.floor(past / 60)}分钟前`
      else if(past < 86400) res = `${Math.floor(past / 1440)}小时前`
      else res = `${month}月${date}日`
      return res
    },
    handleTitle(status: STATUS, title: string, number: number):string {
      let msg = ''
      switch(status) {
        case '领取': msg = `${title} 被 ${number} 人领取`; break;
        case '完成': msg = `${title} 被 ${number} 人完成`; break;
        case '确认': msg = `${title} 已确认`; break;
        case '认定无效': msg = `${title} 任务未通过`; break;
        case '截止提醒': msg = `${title} 任务即将截止`; break;
      }
      return msg
    },
    handleSubTitle(status: STATUS) {
      return SUB_TITLE_MAP[status]
    }
  }
})
