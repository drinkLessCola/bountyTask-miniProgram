interface Memo {
  memo:string,
  emergent:string
}
Component({
  behaviors: [],
  // 使用模板时传入的数据在这里定义
  properties: {
  },
  // 私有数据，可用于模版渲染
  data: {
    showComponent: false,
    memos:[]
  },
  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  lifetimes: {
    attached: function () {
      const accountInfo = wx.getAccountInfoSync();
      console.log(accountInfo)
      // accountInfo.miniProgram.envVersion = 'release';
      //开发的时候就开着,发布上线的时候就注释
      if (accountInfo.miniProgram.envVersion === 'release') {
        this.setData({
          showComponent: false, 
        });
      } else {
        this.setData({
          showComponent: true 
        });
      }

      this.getMemo()
    },
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () { this.getMemo() },
  },
  // 定义组件方法
  methods: {
    getMemo() {
      const unhandledMemos = wx.getStorageSync('memo')
      const memos = unhandledMemos.map((m:Memo) => { 
        const { memo, emergent:emer } = m
        const emergent = emer === 'low'? '❗':
                          emer === 'medium'? '❗❗':'❗❗❗'
        return { memo, emergent }
      })
      this.setData({
        memos
      })
    },
  }
})