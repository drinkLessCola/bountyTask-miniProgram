// index.ts

Page({
  data: {
    // select:0,

    select:[{
      name:"发布的任务",
      checked:false
    },{
      name:"领取的任务",
      checked:false
    }],

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

  onLoad() {
    let sel = this.data.select
    sel[0].checked=true
    this.setData({
      select:sel
    })
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
