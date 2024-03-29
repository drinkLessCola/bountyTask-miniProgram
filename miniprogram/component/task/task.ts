const POSITION = ['泰山区', '华山区', '燕山区', '黑山区', '主校区', '启林南', '启林北', '校外']

Component({
  behaviors: [],
  // 使用模板时传入的数据在这里定义
  properties: {
    taskData: {
      type:Object,
      value:{
        id: Number,
        title: String,        // 标题
        bounty: Number,       // 赏金
        startTime: String,   // 发布时间
        label: String,       // 标签
        deadline: String,    // 截止时间
      },
      observer(newval) {
        const {startTime, label, deadline} = newval
        this.setData({
          deadline:this.handleDeadline(deadline),
          publishTime: this.handlePublishTime(startTime),
          area: this.handleArea(label),
          isOutDate: this.checkOutDate(deadline)
        })
      }
    }
  },
  // 私有数据，可用于模版渲染
  data: {
    deadline:'',
    publishTime:'',
    area:'',
    isOutDate: false,
  }, 
  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  lifetimes: {
    attached: function () {
      const {deadline, startTime, label} = this.properties.taskData
      this.setData({
        deadline:this.handleDeadline(deadline),
        publishTime: this.handlePublishTime(startTime),
        area: this.handleArea(label),
        isOutDate: this.checkOutDate(deadline)
      })
     },
    moved: function () { 
    },
    detached: function () { },
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () { },
  },
  // 定义组件方法
  methods: {
    checkOutDate(deadline:string):boolean {
      deadline = deadline.replace(/-/g, '/') 
      return new Date(deadline).getTime() <= Date.now()
    },
    getTimeInfo(t: string): TimeInfo {
      t = t.replace(/-/g, '/') 
      const time = new Date(t)
      const month = time.getMonth() + 1,
        date = time.getDate(),
        isAm = time.getHours() < 12,
        hour = time.getHours() > 12? time.getHours() % 12 : time.getHours(),
        min = time.getMinutes()
      return { month, date, isAm, hour, min }
    },
    handleDeadline(deadline: string): string { 
      const {month, date, isAm, hour, min} = this.getTimeInfo(deadline)
      return `${month}月${date}日 ${isAm? '上午':'下午'} ${`0${hour}`.slice(-2)}:${`0${min}`.slice(-2)}` 
    },
    handlePublishTime(time:string):string{
      time = time.replace(/-/g, '/') 
      const past = Math.ceil((Date.now() - new Date(time).getTime()) / 1000)
      
      const {month, date} = this.getTimeInfo(time)
      let res = ''
      if(past < 60) res = '刚刚'
      else if(past < 3600) res = `${Math.floor(past / 60)}分钟前`
      else if(past < 86400) res = `${Math.floor(past / 3600)}小时前`
      else res = `${month}月${date}日`
      return res
    },
    handleArea(label:string) {
      return label.split(',')
                  .filter((label: string) => POSITION.includes(label))
                  .join(', ') || '校内'
    },
    toTaskDetail(e: any){
      const {id:userid} = wx.getStorageSync('user') //这玩意从哪搞来？
      const id = e.currentTarget.dataset.id
      let url = "/pages/taskDetail/taskDetail?taskid=" + id + "&userid=" + userid
      wx.navigateTo({
        url: url
      })
    }
  }
})