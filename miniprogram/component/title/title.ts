// component/title/title.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    underlineColor:String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    underlineColor: ''
  },

  lifetimes: {
    attached: function () {
      this.setData({
        underlineColor:this.properties.underlineColor
      })
    },
    moved: function () { },
    detached: function () { },
  },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () { },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    
  }
})
