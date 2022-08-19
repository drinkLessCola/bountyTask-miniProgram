
Component({
  behaviors: [],
  // 使用模板时传入的数据在这里定义
  properties: {
    taskData: {
      type:Object,
      value:{
        title: String,        // 标题
        bounty: Number,       // 赏金
        startTime: Number,   // 发布时间
        area: String,         // 校区
        deadline: String,    // 截止时间
      }
    }
    
    // myProperty: { // 属性名
    //   type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
    //   value: '', // 属性初始值（可选），如果未指定则会根据类型选择一个
    //   observer: function (newVal, oldVal) { } // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
    // },
  },
  // 私有数据，可用于模版渲染
  data: {
    deadline:'',
    publishTime:'',
  }, 
  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  lifetimes: {
    
    attached: function () {
      console.log(this.properties.taskData.deadline)
      this.setData({
        deadline:this.handleDeadline(this.properties.taskData.deadline),
        publishTime: this.handlePublishTime(this.properties.taskData.startTime)
      })
     },
    moved: function () { },
    detached: function () { },
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () { },
  },
  // 定义组件方法
  methods: {
    getTimeInfo(t: string | number): TimeInfo {
      const time = new Date(+t)
      const month = time.getMonth() + 1,
        date = time.getDate(),
        isAm = time.getHours() >= 12,
        hour = time.getHours(),
        min = time.getMinutes()
      return { month, date, isAm, hour, min }
    },
    handleDeadline(deadline: string | number): string { 
      const {month, date, isAm, hour, min} = this.getTimeInfo(deadline)
      return `${month}月${date}日 ${isAm? '上午':'下午'} ${hour}:${min}` 
    },
    handlePublishTime(timestamp:number):string{
      const past = Math.ceil((Date.now() - new Date(+timestamp).getTime()) / 1000)
      const {month, date} = this.getTimeInfo(timestamp)

      let res = ''
      switch(past){
        case 60: res = '刚刚'; break
        case 3600: res = `${Math.floor(past / 60)}分钟前`; break
        case 86400: res = `${Math.floor(past / 1440)}小时前`; break
        default: res = `${month}月${date}日`
      }       
      return res
    }
  }
})