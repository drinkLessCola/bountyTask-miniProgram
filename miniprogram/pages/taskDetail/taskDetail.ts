// miniprogram.ts
import { deleteCollectedTasksById } from "../../API/taskCollection"
import { addCollectTask, getTaskById, getTaskStatus, isCollected, offlineTask, takeTask } from "../../API/taskDetail"
import { login } from "../../utils/login"

type ReceivedStatus = '未接受' | '未提交' | '已提交'
const app = getApp()
const STATUS = ['已确认', '进行中', '待确认']
Page({
  /**
   * 页面的初始数据
   */
  data: {
    show: app.globalData.isRelease,
    taskid: 0,   // 任务 id 
    userid: 0,   // 当前用户 id
    isPublisher: true,  // 0是发布者 1不是 (感觉好像反了哈哈，直接用 boolean 吧
    showDialog: false,  // true 显示 确认接受任务的对话框
    isCollect: false,   // true 收藏,实心星星图案缺失 补上了
    isOutDate: false,   // 任务是否已截止
    isOffline: false,   // 任务是否已下线
    receiveStatus: '未接受' as ReceivedStatus,  // 任务接受状态
    bottomBarHeight: app.globalData.bottomBarHeight,
    publisher: {
      id: 0,
      nickName: '孜然',
      avatarUrl: 'https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83erl9ZckDjfNl3g2PGJgfX0OLafM9MWZWC6KYEZWmdWVshDOA5lfh5zibo3dCdbVb07MFwFYsFEIBVQ/132',
      // lzh的头像 现在是我的头像了（×
    },
    // 任务情况
    task: {
      id: 0,
      title: '任务标题',
      illustrate: '你猜',
      request: '截图 / 拍照',
      number: 1,//这个是剩余n份任务
      labels: ['泰山区', '紧急', '校外'],
      deadline: '2022年8月16日 上午 08:00',//yyyy年MM月dd日 上/下午 hh:mm 这里月份的十位若是0则不显示
      contact: '联系方式',
      bounty: 2,//这个是每份的 
    } as TaskDetailObj,
    // 执行者信息
    receiverInfo: [{
      id: 1,
      nickName: '一号',
      avatarUrl: 'http://tmp/ny1Hd2Fgrql4d21c915c93b7255357d06571d729118e.jpeg',
      status: "已完成",
    }] as TaskUser[],
    // 以下可看作 清单

    // 这里的task对象是需要在下面处理后再放数据的
    // 上一个界面传任务id和userid过来
    // 调用接口：根据任务id获得任务发布者id，任务执行者id，以及其在该任务的状态  Ⅱ
    // 比较userid和任务发布者id 决定这个页面显示什么 | 已完成
    // 调用接口: 根据任务id查询返回任务对象
    // 根据返回的任务对象 把所需要的信息填入这里的task对象

    //领取情况：接口Ⅱ 还会返回所有任务执行id和执行状态,遍历所有执行者id,使用 接口:根据用户id查询 获取用户昵称和用户头像
    //然后把这些用户昵称 头像 和 转成字符串的执行状态 打包成对象丢进去getCondition 

    //剩余n份任务等后端改完任务对象再看

    //这里需要写一个字符串分离方法,因为后端的labels是个字符串而不是字符串数组 | 已完成未测试
    //要是有大聪明自定义标签是个','就寄了 | 不管
    // 大聪明哈哈哈哈

    //时间从任务对象里获取后要处理 |未获取已处理

    //目前已发现的接口需求:
    // 根据任务id获得任务发布者id，任务执行者id，以及其在该任务的状态 both
    // 根据任务id查询返回任务对象  both
    // 根据用户id查询 获取用户昵称和用户头像 both 多次调用
    // 下线任务 发
    // 接任务 执
    // 添加收藏任务 执 

  },

  formatTime(d: string) {
    const [date, time] = d.split(" ")
    const [year, month, day] = date.split('-')
    const [h, minutes] = time.split(":")
    const hour = `0${+h > 12 ? +h % 12 : h}`.slice(-2)
    const isAm = +h < 12
    return `${year}年${+month}月${day}日 ${isAm ? '上午' : '下午'} ${hour}:${minutes}`
  },
  /**
   * 获取任务详情
   * @param taskid 任务 id
   * @param userid 用户 id
   */
  async getTaskDetail(taskid: number, userid: number) {
    let isPublisher: boolean = false
    wx.showLoading({ title: "加载中…" })

    try {
      const taskStatus = await getTaskStatus(taskid)
      console.log('taskStatus', taskStatus)
      // taskStatus[0] 为发布者
      const [publisher, ...receivers] = taskStatus as TaskStatusObj[]
      const { user } = publisher

      // 处理接受任务者的数据
      const receiverInfo = receivers.map((r) => {
        const { id, avatarUrl, nickName } = r.user
        const status = STATUS[r.status]
        return { id, avatarUrl, nickName, status }
      })
      // 当前用户是否是任务发布者 
      isPublisher = userid === user.id
      // receiveSelf 当前用户是否接受任务
      // receiveStatus 接受任务的状态
      const receiveSelf = receiverInfo.filter((r) => r.id === userid)[0],
        receiveStatus = !receiveSelf ? '未接受' :
          (receiveSelf.status == '进行中' ? '未提交' : '已提交')
      //只要接收了任务,那么这个receiveSelf.status就只会是进行中或者已提交，没接收任务的会被上一行判定赋值
      this.setData({ publisher: user, receiverInfo, isPublisher, receiveStatus })

      const taskDetail = await getTaskById(taskid)
      console.log('taskDetail', taskDetail)
      const { id, title, illustrate, taskNumber, taskStatus: status, deadline: ddl, bounty, contact, label, request } = taskDetail as UnhandledTaskDetail
      const number = taskNumber,
        labels = label ? label.split(',') : [],
        deadline = ddl.replace(/-/g, '/'),
        isOffline = status === 1,
        isOutDate = new Date(deadline).getTime() < Date.now()
      console.log('isOffline', isOffline, isOutDate)
      const task: TaskDetailObj = { id, title, illustrate, request, number, labels, deadline, bounty, contact }
      this.setData({ task, isOffline, isOutDate })

      // 检查任务收藏情况
      if (!isPublisher) this.checkCollected()
    } catch (errCode) {
      wx.showToast({
        icon: "none",
        title: `获取任务详情失败! errCode:${errCode}`,
      }).then(() => {
        wx.navigateBack()
      })
    }
  },
  /**
   * 查询任务收藏情况
   */
  checkCollected() {
    const { taskid, userid } = this.data
    if (!userid) return

    isCollected(userid, taskid)
      .then(isCollect => {
        this.setData({ isCollect })
      })
      .catch(errCode => console.log("查询收藏信息失败！errCode:" + errCode))
  },
  /**
   * 完成任务
   */
  toFinish() {
    const { taskid } = this.data
    const { id: userid } = wx.getStorageSync('user')
    wx.navigateTo({ url: `/pages/finish/finish?taskid=${taskid}&userid=${userid}` })
  },



  confirmTask: function (e: any) {
    console.log(e)
    let id
    if (this.data.isPublisher) {
      // const {info:{id}} = e.currentTarget.dataset
      id = e.currentTarget.dataset.info
      // 执行方可没这个info id 
    } else {
      id = { id: this.data.userid }
      // 执行方的finisherId就是自己的
    }

    const { userid, taskid, isPublisher, task: { title, request } } = this.data
    // console.log(t.info);
    // 跳转：确认完成界面 参数t.info.id(头像应该传不过去吧，太长了)
    let emitData = {
      userid: userid,
      isPublisher: isPublisher,
      finisherId: id,
      taskId: taskid,
      taskTitle: title,
      taskRequest: request
    }
    wx.navigateTo({
      url: "/pages/confirmCompleted/confirmCompleted",
      success: function (res) {
        res.eventChannel.emit('handleEvent', emitData)
      }
    })
  },
  offlineTask: function () {
    const { userid, taskid, receiverInfo } = this.data
    const num = receiverInfo.reduce((res, r) => {
      return res + (r.status === '待确认' ? 1 : 0)
    }, 0)
    if (num) {
      wx.showToast({ icon: "none", title: "不能下线有待确认的任务" })
      return
    }
    //调用接口:下线任务
    offlineTask(userid, taskid)
      .then(data => {
        console.log(data)
        this.getTaskDetail(taskid, userid)
        wx.showToast({ icon: "success", title: "任务下线成功！" })
      })
      .catch(errCode => {
        wx.showToast({ icon: "none", title: "任务下线失败！errCode:" + errCode })
      })
  },

  // ✔ 添加收藏
  async taskCollect() {
    // 未登录
    if (!this.data.userid) {
      const isLogin: boolean = await this.handleLogin()
      if (!isLogin) return
    }
    const { taskid, userid } = this.data

    //调用接口:添加收藏任务
    addCollectTask(userid, taskid)
      .then(() => {
        this.checkCollected()
        wx.showToast({ icon: "success", title: "收藏成功！" })
      })
      .catch(errCode => {
        wx.showToast({ icon: 'none', title: "添加收藏失败！errCode:" + errCode })
      })
  },
  // ✔ 取消收藏
  delCollect: function () {
    const { taskid, userid } = this.data
    //调用接口:删除收藏任务
    deleteCollectedTasksById(userid, taskid)
      .then(() => {
        this.checkCollected()
        wx.showToast({ icon: "success", title: "取消收藏成功！" })
      })
      .catch(errCode => {
        wx.showToast({ icon: "none", title: '取消收藏失败！errCode' + errCode })
      })
  },

  showDialog: function () {
    // 显示提示框
    this.setData({ showDialog: true })
  },
  hideDialog: function () {
    // 关闭
    this.setData({ showDialog: false })
  },

  async receiveTask() {
    // 未登录
    if (!this.data.userid) {
      const isLogin: boolean = await this.handleLogin()
      if (!isLogin) return
    }

    // 调用接口:接任务
    const { taskid, userid } = this.data
    takeTask(taskid, userid)
      .then((data) => {
        console.log(data)
        this.getTaskDetail(taskid, userid)
        wx.showToast({ icon: "success", title: "接受任务成功！" })
      })
      .catch(errCode => {
        wx.showToast({ icon: "none", title: "接受任务失败！errCode:" + errCode })
      })
    // 关闭
    this.hideDialog()
  },
  /**
   * 处理未登录的情况
   */
  async handleLogin() {
    wx.showToast({ icon: 'none', title: '请先登录' })
    try {
      const userid = await login()
      this.setData({ userid })
      return true
    } catch (err) {
      wx.showToast({ icon: 'none', title: '登陆失败！' })
      return false
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(option: any) {
    const taskid = +option.taskid
    const { id: userid } = wx.getStorageSync('user')
    this.setData({ taskid, userid })
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
    // const pages = getCurrentPages()
    // const curPage = pages[pages.length - 1]
    // const { options:{taskid, userid} } = curPage
    const { taskid, userid } = this.data
    this.getTaskDetail(taskid, userid)
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