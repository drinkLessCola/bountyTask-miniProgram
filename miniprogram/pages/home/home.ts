// pages/page1/page1.ts
import { searchTask } from "../../API/taskCenter";
// 额,忘记把这个接口写在home里了，不过反正是一个东西就不管了
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:app.globalData.isRelease,
    timestamp: 1660566722638,
    // 暂时使用时间戳以及其number类型代替ddl和提交时间
    // 目前发现需要的接口:
    // 按关键词/标签搜索，并按照条件进行排序 自动调用(推荐任务)和手动调用都有
    search:'',

    taskArray: [{
      id: 2,
      title: '测试2',
      label: '紧急,华山区',
      area: '',
      deadline: '',
      startTime: '',
      bounty: 20
    }] as TaskObj[]
  },

  testtimestamp(): number {
    return Date.now()
  },

  search(e:any){
    const keyword = e.detail
    app.globalData.keyword = keyword
    //调用接口 按关键字搜索 标签为最新 泰山区 取物？
    //需要进一步决定

    wx.switchTab({
      url: `/pages/taskCenter/taskCenter`,
    })
  },

  inputSearch(e:any) {
    let string = e.currentTarget.detail
    this.setData({
      search:string
    })
  },

  toMsg() {
    wx.switchTab({
      url:'/pages/message/message'
    })
  },

  toIntro(e:any) {
    const type = e.currentTarget.dataset.name
    // console.log(category);
    let url = '/pages/intro/intro?type='+type
    wx.navigateTo({
      url:url
    })
  },

  toTaskDetail(e:any) {
    const userid = wx.getStorageSync('uid')
    const id = e.currentTarget.dataset.id
    let url =  "/pages/taskDetail/taskDetail?taskid="+ id +"&userid=" + userid
    wx.navigateTo({
      url:url
    })
    // console.log(id);
    
  },

  getTask() {
    let condition: string | null = null
    let campus: string | null = null
    let keyword: string | null = null

    if (condition === '最新') condition = null
    if (campus === '全部') campus = null
    if (!keyword) keyword = null

    searchTask(keyword, null, campus, condition)
      .then((data) => {
        console.log(data)
        this.setTaskArea(data as TaskObj[])
        this.setData({ taskArray: data as TaskObj[] })
      })
      .catch((err) => console.log(err))
  },

  setTaskArea(taskArray: TaskObj[]) {
    taskArray.forEach(element => {
      console.log(element)
      element.area = element.label.split(',').filter((label: string) => label !== '紧急').join(', ')
      console.log(element.area)
      // if(element.labels[0]!='紧急'){
      //   element.area=element.labels[0]
      // }else if(element.labels[1]){
      //   element.area=element.labels[1]
      // }else{
      //   element.area=''
      // }
    });
    // 由于后端的taskObj没有area属性 需要从labels里抠出来一个
    // 应急处理方法，严格来说应该得限制发布任务处选项互斥
    // 发布任务选标签有很多小bug，比如重复的自定义标签。。没有互斥判断。。可以不选标签。。可以创建空标签..
    // 使用到task组件的地方都可以用这个应急方法转换
    // 确认这么处理后再把这方法复制到home 和 taskCollection 去
    // !好细致，晕了，等会在发布任务的界面加一下限制条件
    this.setData({
      taskArray: taskArray
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.setData({
      timestamp: this.testtimestamp()
    })
    //console.log(this.testtimestamp());
    this.getTask() 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    //自定义的tabbar
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})