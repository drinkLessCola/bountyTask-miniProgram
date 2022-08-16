// index.ts
// import {icon_time, icon_address} from '../../utils/icon'
const apptc = getApp()
Page({
  data: {
  
    navbarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '任务收藏夹', //导航栏 中间的标题
    },
    height: apptc.globalData.statusBarHeight + apptc.globalData.navBarHeight,

    //task的数组，以后应该是后端给一个task数组，直接把给来的数组setData就好

    // -------------------------------警告，现在写在前端测试用的task对象的属性和后端不一样-------------------------------------
    taskArray: [{
      task: {
        id: 0,
        title: '测试',
        area: '泰山区',
        deadline: 1660566722638,
        timestamp: 1660566722638,
        bounty: 5
      },

    }, {
      task: {
        id: 2,
        title: '测试2',
        area: '华山区',
        deadline: 1660566722638,
        timestamp: 1660566722638,
        bounty: 20
      }
    }]
    
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },/*没调用这个*/ 

  taskTap(e:any) {
    var data = e.currentTarget
    console.log(data)
    wx.navigateTo({
      url: '',
    })
  },//跳转到任务详情

  btnTap() {
    //清除过期任务
    // 这功能得后端搞啊，前端搞这个掩耳盗铃。。。。。。
    
  },

  
  
  onLoad() {
    // console.log(icon_address ,icon_time)
    
  },
})
