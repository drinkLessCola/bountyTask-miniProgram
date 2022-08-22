// miniprogram.ts


Page({

  /**
   * 页面的初始数据
   */
  data: {
    // avatarUrl: getApp().globalData.defaultAvatarUrl,
    userid:0,
    // 当前用户id
    isPublisher:0,
    // 0是发布者 1不是
    hidden:1,
    //提示框 0不显示1显示
    isCollect:0,
    //0不收藏1收藏,实心星星图案缺失
    isGot:0,
    //0未接该任务,1已接该任务
    //已接任务的按钮还没做,样式未知

    publish:{
      Id:0,
      nickname:'发布者',
      avatarUrl:'http://tmp/ny1Hd2Fgrql4d21c915c93b7255357d06571d729118e.jpeg',
      // lzh的头像
    },
    
    geter:{
      Id:0,
      nickname:'',
      avatarUrl:'',
      status:0,//2：待确认；1：进行中；0：已完成
    },
    // 领取者获取回来时的对象结构，仅用作展示
    taskid:0,
    //方便onload写入
    task:{
      id:0,
      title:'任务标题',
      getCondition:[{
        id:1,
        nickname:'一号',
        avatarUrl:'http://tmp/ny1Hd2Fgrql4d21c915c93b7255357d06571d729118e.jpeg',
        status:"已完成",
      },{
        id:2,
        nickname:'2号',
        avatarUrl:'http://tmp/ny1Hd2Fgrql4d21c915c93b7255357d06571d729118e.jpeg',
        status:"待确认",
      },{
        id:3,
        nickname:'3号',
        avatarUrl:'http://tmp/ny1Hd2Fgrql4d21c915c93b7255357d06571d729118e.jpeg',
        status:"进行中",
      }],//这个需要二次请求才会处理好放进来
      illstrate:'你猜11111111111111111111111111111111111111111111111111111111111111111122222222222222222222',
      request:'截图 / 拍照',
      number:1,//这个是剩余n份任务
      labels:['泰山区','紧急','校外',1],
      deadline:'2022年8月16日 上午 08 : 00',//yyyy年MM月dd日 上/下午 hh:mm 这里月份的十位若是0则不显示
      bounty:'2',//这个是每份的 

    },

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

    //时间从任务对象里获取后要处理 |未获取已处理

    //
    

  },

 

  // onChooseAvatar(e:any) {
  //   const   { avatarUrl }  = e.detail
  //   this.setData({
  //     avatarUrl,
  //   })
  //   console.log(avatarUrl);
  // },

  getTask(taskid:number) {
    //调用 根据任务id查询 根据任务id返回发布者id
  },  

  isPublisher:function(nowid:number , taskPublisherId:number){
    this.setData({
      isPublisher:(nowid!=taskPublisherId? 1 : 0)
    })
    //偷懒,直接三元解决
    // 注意 0 才是发布者
  },

  timeHandler:function(s:string) {
    // yyyy-MM-dd hh:mm:ss
    const date = new Date(s)
    const isAM=['上午','下午']
    let timeString = date.getFullYear()+'年'+ (date.getMonth()+1) + '月' + date.getDate() + '日 ' + (isAM[date.getHours()/12]) +' ' + (date.getHours()%12>=10 ? date.getHours()%12 : '0'+ date.getHours()%12) +' : ' +  (date.getMinutes()>=10 ? date.getMinutes() : '0'+ date.getMinutes())
    return timeString
    // 懒得设变量,略显抽象,内含：
    // 24转12小时制
    // 0~11上午 12~23下午 额  12:00 -> 下午 00:00有点抽象
    // 小时分钟自动补零 如 08时 10时

  },

  toLabelsArray:function(s:string) :string[] {
    return s.split(",")
    // 好家伙，有现成的
  },

  comfirmTask:function(e:any) {
    const t = e.currentTarget.dataset
    // console.log(t.info);
    // 跳转：确认完成界面 参数t.info.id(头像应该传不过去吧，太长了)
    let emitData = {
      finisherId : t.info.id,
      taskId : this.data.task.id,
      taskTitle : this.data.task.title,
      taskRequest : this.data.task.request
    }
    wx.navigateTo({
      url:"/pages/confirmCompleted/confirmCompleted",
      success:function(res) {
        res.eventChannel.emit('handleEvent' , emitData)
      }
    })
  },

  btnPutDown:function() {
    //调用接口:下线任务
  },

  taskCollect:function() {
    //调用接口:添加收藏任务
  },

  delCollect:function() {
    //调用接口:删除收藏任务
  },

  btnGetTask:function() {
    this.setData({
      hidden:1
    })
    // 显示提示框
  },

  btnNo:function() {
    this.setData({
      hidden:0
    })
    // 关闭
  },

  btnYes:function() {
    // 调用接口:接任务
    this.setData({
      hidden:0
    })
    // 关闭
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(option) {
    this.setData({
      hidden:0,
      taskid:Number(option.taskid),
      userid:Number(option.userid)
    })
    console.log(
      this.data.taskid+' '+this.data.userid
    );
    
    // console.log(new Date('2022-08-01 00:00:00'));
    // console.log(option.taskid);
    // 似乎可以用eventChannel把整个task发过来。。以后优化

    
    
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