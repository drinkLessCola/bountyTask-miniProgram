// index.ts
import { icon_time, icon_address } from '../../utils/icon'
Page({
  data: {

    navbarData: {
      showCapsule: 0, //是否显示左上角图标   1表示显示    0表示不显示
      title: '', //导航栏标题
    },

    // 选择按钮组的数据
    selectParameter: [{
      id: 0,
      name: '最新',
      checked: false
    }, {
      id: 1,
      name: '紧急',
      checked: false
    }, {
      id: 2,
      name: '赏金最高',
      checked: false
    }],

    //picker的选项
    array: ['泰山区', '华山区', '启林北', '启林南'],
    // objectArray抄来的,看上去是方便与后端连接的？
    objectArray: [{
      id: 0,
      name: '泰山区'
    },
    {
      id: 1,
      name: '华山区'
    },
    {
      id: 2,
      name: '启林北'
    },
    {
      id: 3,
      name: '启林南'
    }
    ],
    // picker默认是第一个
    index: 0,

    //task的数组，以后应该是后端给一个task数组，直接把给来的数组setData就好

    // -------------------------------警告，现在写在前端测试用的task对象的属性和后端不一样-------------------------------------
    taskArray: [{
      task: {
        id: 0,
        title: '测试',
        area: '泰山区',
        deadline: 1660566722638,
        startTime: 1660566722638,
        bounty: 5
      },

    }, {
      task: {
        id: 2,
        title: '测试2',
        area: '华山区',
        deadline: 1660566722638,
        startTime: 1660566722638,
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

  taskTap(e: any) {
    var data = e.currentTarget
    console.log(data)
    wx.navigateTo({
      url: '',
    })
  },//跳转到任务详情(接收方)

  bindPickerChange: function (e: any) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  parameterTap: function (e: any) { //e是获取e.currentTarget.dataset.id所以是必备的，跟前端的data-id获取的方式差不多
    var that = this
    var this_checked = e.currentTarget.dataset.id
    var parameterList = this.data.selectParameter //获取Json数组
    for (var i = 0; i < parameterList.length; i++) {
      if (parameterList[i].id == this_checked) {
        parameterList[i].checked = true; //当前点击的位置为true即选中
      } else {
        parameterList[i].checked = false; //其他的位置为false
      }
    }
    that.setData({
      selectParameter: parameterList
    })
  },
  //这抄来的

  onLoad() {
    // console.log(icon_address ,icon_time)
    this.data.selectParameter[0].checked = true;
    this.setData({
      selectParameter: this.data.selectParameter,
    }) //默认parameter数组的第一个对象是选中的
  },
  onShow() {
    //自定义的tabbar
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
  },
})
