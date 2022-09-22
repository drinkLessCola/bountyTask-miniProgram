
Component({
  behaviors: [],
  // 使用模板时传入的数据在这里定义
  properties: {
  },
  // 私有数据，可用于模版渲染
  data: {
    showComponent: false
  },
  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  lifetimes: {
    attached: function () {
      const that = this;
      const accountInfo = wx.getAccountInfoSync();
      console.log(accountInfo)
      accountInfo.miniProgram.envVersion = 'release';
      //开发的时候就开着,发布上线的时候就注释
      if (accountInfo.miniProgram.envVersion === 'release' || accountInfo.miniProgram.envVersion === 'trial') {
        that.setData({
          showComponent: false, // 这个是审核组件的开关的变量
        });
      } else {
        that.setData({
          showComponent: true // 这个是审核组件的开关的变量
        });
      }
    },
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () { },
  },
  // 定义组件方法
  methods: {
    getTimeInfo(t: string): TimeInfo {
      const time = new Date(t)
      const month = time.getMonth() + 1,
        date = time.getDate(),
        isAm = time.getHours() >= 12,
        hour = time.getHours(),
        min = time.getMinutes()
      return { month, date, isAm, hour, min }
    },
    handleDeadline(deadline: string): string {
      const { month, date, isAm, hour, min } = this.getTimeInfo(deadline)
      return `${month}月${date}日 ${isAm ? '上午' : '下午'} ${hour}:${min}`
    },
    handlePublishTime(time: string): string {
      const past = Math.ceil((Date.now() - new Date(time).getTime()) / 1000)
      const { month, date } = this.getTimeInfo(time)
      console.log(month, date)
      let res = ''
      switch (past) {
        case 60: res = '刚刚'; break
        case 3600: res = `${Math.floor(past / 60)}分钟前`; break
        case 86400: res = `${Math.floor(past / 1440)}小时前`; break
        default: res = `${month}月${date}日`
      }
      return res
    }
  }
})