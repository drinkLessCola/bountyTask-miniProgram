// index.ts
import {icon_time, icon_address} from '../../utils/icon'
Page({
  data: {
   
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  onLoad() {
    console.log(icon_address ,icon_time)
  },
})
