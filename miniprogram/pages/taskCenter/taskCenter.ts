// index.ts
// import { icon_time, icon_address } from '../../utils/icon'
Page({
  data: {

     // 目前发现需要的接口:
    // 按关键词/标签搜索，并按照条件进行排序 自动调用(推荐任务)和手动调用都有

    navbarData: {
      showCapsule: 0, //是否显示左上角图标   1表示显示    0表示不显示
      title: '', //导航栏标题
    },

    search:'',

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
        id: 0,
        title: '测试',
        labels: ['泰山区'],
        area:'',
        deadline: 1660566722638,
        startTime: 1660566722638,
        bounty: 5
      }, {
        id: 2,
        title: '测试2',
        labels: ['紧急','华山区'],
        area:'',
        deadline: 1660566722638,
        startTime: 1660566722638,
        bounty: 20
      }]
  },
  // task对象这还得处理 后端的“泰山区” “华山区” 什么的在label里
  // 发布任务界面可选择多个校区。

  setTaskArea(){
    let taskArray = this.data.taskArray
    taskArray.forEach(element => {
      if(element.labels[0]!='紧急'){
        element.area=element.labels[0]
      }else if(element.labels[1]){
        element.area=element.labels[1]
      }else{
        element.area=''
      }
    });
    // 由于后端的taskObj没有area属性 需要从labels里抠出来一个
    // 应急处理方法，严格来说应该得限制发布任务处选项互斥
    // 发布任务选标签有很多小bug，比如重复的自定义标签。。没有互斥判断。。可以不选标签。。可以创建空标签..
    // 使用到task组件的地方都可以用这个应急方法转换
    // 确认这么处理后再把这方法复制到home 和 taskCollection 去
    this.setData({
      taskArray:taskArray
    })
  },

  search(){
    let condition
    this.data.selectParameter.forEach(element => {
      if(element.checked){
        condition = element.name //反正这个能改
      }
    });
    let campus = this.data.objectArray[this.data.index].name
    //调用接口 按关键字搜索 标签为最新 泰山区 取物？
    //需要进一步决定
  },

  inputSearch(e:any) {
    let string = e.currentTarget.detail
    this.setData({
      search:string
    })
  },

  taskTap(e: any) {
    const userid = 0 //这玩意从哪搞来？
    const id = e.currentTarget.dataset.id
    let url =  "/pages/taskDetail/taskDetail?taskid="+id +"&userid=" +userid
    wx.navigateTo({
      url:url
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
   this.setTaskArea()
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
