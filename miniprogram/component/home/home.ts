import recipe from '../../utils/cook'
Component({
  behaviors: [],
  // 使用模板时传入的数据在这里定义
  properties: {

  },
  // 私有数据，可用于模版渲染
  data: {
    showComponent: false,
    memo:"",
    emergent:"low",
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
        wx.showModal({
          title:'使用说明',
          content:'本小程序不会存储您的备忘内容，且不会公开。用户只能看到自己的备忘内容。'
        })
      }
    },
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () { },
  },
  // 定义组件方法
  methods: {
    saveMemo() {
      const { memo, emergent } = this.data 
      console.log(memo, emergent)
      if(memo === '') {
        wx.showToast({ title:"内容不能为空", icon:'error'})
        return
      }
      const memoArr = wx.getStorageSync('memo') || []
      memoArr.unshift({ memo, emergent })
      wx.setStorageSync('memo', memoArr)
      wx.showToast({ icon:"success", title:"保存成功！" })
      this.setData({
        memo:''
      })
    },
    handleInput(e:any) {
      const memo = e.detail.value
      this.setData({ memo})
    },
    handleChange(e:any) {
      this.setData({
        emergent: e.detail.value
      })
    }
  }
})