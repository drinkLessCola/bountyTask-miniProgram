// index.ts
import { searchTask } from "../../API/taskCenter";
const app = getApp()
const POSITION = ['全部', '泰山区', '华山区', '燕山区', '黑山区', '主校区', '启林南', '启林北', '校外']
// import { icon_time, icon_address } from '../../utils/icon'
Page({
  data: {
    bottomBarHeight:app.globalData.bottomBarHeight,
    show:app.globalData.isRelease,
    // 目前发现需要的接口:
    // 按关键词/标签搜索，并按照条件进行排序 自动调用(推荐任务)和手动调用都有
    keyword: '',
    isRefreshing: false,
    // 选择按钮组的数据
    selectParameter: [
      { id: 0, name: '最新', checked: true },
      { id: 1, name: '紧急', checked: false },
      { id: 2, name: '赏金最高', checked: false }
    ],

    //picker的选项
    array: POSITION,
    // objectArray抄来的,看上去是方便与后端连接的？
    objectArray: [
      { id: 0, name: '全部' },
      { id: 1, name: '泰山区' },
      { id: 2, name: '华山区' },
      { id: 3, name: '燕山区' },
      { id: 4, name: '黑山区' },
      { id: 5, name: '主校区' },
      { id: 6, name: '启林南' },
      { id: 7, name: '启林北' },
      { id: 8, name: '校外' },
     // { id: 9, name: '校内' },
     // 校内不是标签
    ],
    // picker默认是第一个
    index: 0,

    //task的数组，以后应该是后端给一个task数组，直接把给来的数组setData就好

    // -------------------------------警告，现在写在前端测试用的task对象的属性和后端不一样-------------------------------------
    taskArray: [{
      id: 2,
      title: '测试2',
      label: '紧急,华山区',
      area: '',
      deadline: '',
      startTime: '',
      bounty: 20
    }] as TaskObj[],
  },
  setKeyword(e: any) {
    this.setData({
      keyword: e.detail
    })
    this.getTask()
  },
  // 获取任务
  getTask() {
    let condition: string | null = this.data.selectParameter.filter(elem => elem.checked)[0].name
    let campus: string | null = this.data.objectArray[this.data.index].name
    let keyword: string | null = this.data.keyword

    if (campus === '全部') campus = null
    if (!keyword) keyword = null
    console.log('condition', condition)
    searchTask(keyword, null, campus, condition)
      .then((data) => {
        console.log(data)
        this.setData({ taskArray: data as TaskObj[] })
      })
      .catch((errCode) => wx.showToast({icon:'none', title:'获取任务列表失败' + errCode}))
      .finally(() => {
        this.setData({ isRefreshing: false })
      })
  },

  // 移动到 task 组件统一处理
  // task对象这还得处理 后端的“泰山区” “华山区” 什么的在label里
  // 发布任务界面可选择多个校区。
  // setTaskArea(taskArray: TaskObj[]) {
  //   taskArray.forEach(element => {
  //     console.log(element)
  //     element.area = 
  //     element.label
  //       .split(',')
  //       .filter((label: string) => label !== '紧急' && POSITION.includes(label))
  //       .join(', ') || '校内'
      
  //     // if(element.labels[0]!='紧急'){
  //     //   element.area=element.labels[0]
  //     // }else if(element.labels[1]){
  //     //   element.area=element.labels[1]
  //     // }else{
  //     //   element.area=''
  //     // }
  //   });
    // 由于后端的taskObj没有area属性 需要从labels里抠出来一个
    // 应急处理方法，严格来说应该得限制发布任务处选项互斥
    // 发布任务选标签有很多小bug，比如重复的自定义标签。。没有互斥判断。。可以不选标签。。可以创建空标签..
    // 使用到task组件的地方都可以用这个应急方法转换
    // 确认这么处理后再把这方法复制到home 和 taskCollection 去
    // !好细致，晕了，等会在发布任务的界面加一下限制条件
    // this.setData({
    //   taskArray: taskArray
    // })
  // },

  search() {

    //调用接口 按关键字搜索 标签为最新 泰山区 取物？
    //需要进一步决定

  },

  inputSearch(e: any) {
    let string = e.currentTarget.detail
    this.setData({
      keyword: string
    })
  },

  bindPickerChange: function (e: any) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
    this.getTask()
  },

  parameterTap: function (e: any) { //e是获取e.currentTarget.dataset.id所以是必备的，跟前端的data-id获取的方式差不多
    const id = e.currentTarget.dataset.id
    const parameterList = this.data.selectParameter //获取Json数组

    for (let i = 0; i < parameterList.length; i++) {
      parameterList[i].checked = (parameterList[i].id === id) ? true : false //当前点击的位置为true即选中
    }
    this.setData({
      selectParameter: parameterList
    })
    this.getTask()
  },
  refresh() {
    this.getTask()
  },
  refreshFinish() {
    wx.showToast({ title: '刷新成功！', icon:'success', duration: 600})
  },
  onLoad() {
    // console.log(icon_address ,icon_time)
    // 默认parameter数组的第一个对象是选中的
    // 直接在 data 里面设置 true 就可以了
  },
  onShow() {
    //自定义的tabbar
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
    // 首页带参跳转
    const { keyword } = app.globalData
    app.globalData.keyword = ''
    if(keyword) this.setData({ keyword: keyword })
    this.getTask()
  },
})

export { }
