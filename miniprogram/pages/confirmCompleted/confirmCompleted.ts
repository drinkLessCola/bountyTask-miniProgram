// pages/confirmCompleted/confirmCompleted.ts
const appcC = getApp()
Page({
    
  /**
   * 页面的初始数据
   */
  
  data: {
    height:  appcC.globalData.navBarHeight,

    userid:0,
    publisherId:0,
    finisherId:0,
    finisherName:'',
    finisherImg:'',

    isPublisher:1,
    // 0是发布方 1是执行方

    status:0,
    //0是通过1是未通过2是等待确认

    //---------------警告，测试用的task属性和后端不一样
    task: {
      id: 0,
      title: '测试',
      request:'完成后截图'
    },

    userinfos:{
      Id:0,
      nickname:'发布者',
      avatarUrl:'http://tmp/ny1Hd2Fgrql4d21c915c93b7255357d06571d729118e.jpeg',
      // lzh的头像
    },

    // 待会要改这东西
    imgArray:['/images/confirmCompleted/testImg.png','/images/confirmCompleted/testImg.png','/images/confirmCompleted/testImg.png','/images/confirmCompleted/testImg.png','/images/confirmCompleted/testImg.png','/images/confirmCompleted/testImg.png']
  },

  isPublisher() {
    if(this.data.userid == this.data.publisherId){
      this.setData({
        isPublisher:0
      })
    }
    else {
      this.setData({
        isPublisher:1
      })
    }
  },

  refuse() {
    console.log('no');
    //需求缺失
  },

  confirm() {
    console.log('yes');
    //调用接口 发布人确认执行人提交的任务
  },

  getProveImg(userid:number , taskid :number) {
    //调用接口 查找该用户在该任务中提交的证明图片
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    let that = this;
    const eventChannel = this.getOpenerEventChannel();   //取到事件对象
    eventChannel.on("handleEvent",data=>{//发布事件
      let task = {
        id:data.taskid,
        title:data.taskTitle,
        request:data.taskRequest
      }
      that.setData({
        task:task,
        finisherId:data.finisherId,
        isPublisher:data.isPublisher
      })
      // console.log(data,"我被传过来了");
    });
    // console.log(eventChannel);
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