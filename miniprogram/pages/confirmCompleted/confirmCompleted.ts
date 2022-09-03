// pages/confirmCompleted/confirmCompleted.ts
import {getImage,getUserInfo,confirmeTask,rejectTask,taskStatus} from "../../API/confirmCompleted";

const appcC = getApp()
Page({
    
  /**
   * 页面的初始数据
   */
  
  data: {
    height:  appcC.globalData.navBarHeight,

    userid:1,
    publisherId:1,
    finisherId:2,
    finisherName:'',
    finisherImg:'',

    isPublisher:0,
    // 0是发布方 1是执行方
    status : {
      status:0
    },
    
    //0是通过-1是未通过2是等待确认

    //目前发现所需接口:
    // 查找该用户在该任务中提交的证明图片 both
    // 根据用户id查询 发
    // 发布人确认执行人提交的任务 只有确认没有退回任务。。 发
    // 缺失：任务提交后的状态：等待/通过/未通过 执

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
    imgInfo:{
      imgArray:[] as string[],
      data:[] as string[]
    }
    
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

  getUserInfo(userid:number){
    getUserInfo(userid.toString())
      .then ((data) => {
        this.setData({
          userinfos:data as any
        })
        console.log(data);
        
      })
      .catch((err) => {
        console.log(err);
        
      })
  },

  refuse() {
    console.log('no');
    rejectTask(this.data.finisherId,this.data.task.id)
    .then ((data) => {
      console.log(data);
      
    })
    .catch((err) => {
      console.log(err);
      
    })
  },

  confirm() {
    console.log('yes');
    //调用接口 发布人确认执行人提交的任务
    confirmeTask(this.data.finisherId,this.data.task.id)
    .then ((data) => {
      console.log(data);
      
    })
    .catch((err) => {
      console.log(err);
      
    })
  },

  getProveImg(userid:number , taskid :number) {
    //调用接口 查找该用户在该任务中提交的证明图片
    const that = this
    let imgInfo
     getImage(userid.toString(),taskid.toString())
      .then ((data) => {
        imgInfo=data
        this.setData({
          imgInfo:imgInfo as any
        })
        that.shiftImgArray()
      })
      .catch ((err) => {
        console.log(err);
        
      })
  },

  shiftImgArray() {
    let imgInfo = this.data.imgInfo
    const addString = 'data:image/png;base64,'
    let newString
    for(let index=0 ; index < imgInfo.data.length;index++){
      newString = addString+imgInfo.data[index]
      imgInfo.imgArray[index] = newString 
      this.setData({
        imgInfo:imgInfo
      })
    }
  },

  getTaskStatus(userid:number,taskid:number) {
    taskStatus(userid,taskid)
      .then((data) => {
        console.log(data);
        this.setData({
          status:data as any
        })
      })
      .catch((err) => {
        console.log(err);
        
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    
    // 暂时屏蔽

    // let that = this;
    // const eventChannel = this.getOpenerEventChannel();   //取到事件对象
    // eventChannel.on("handleEvent",data=>{//发布事件
    //   let task = {
    //     id:data.taskid,
    //     title:data.taskTitle,
    //     request:data.taskRequest
    //   }
    //   that.setData({
    //     task:task,
    //     finisherId:data.finisherId,
    //     isPublisher:data.isPublisher
    //   })
    //   // console.log(data,"我被传过来了");
    // });
    // console.log(eventChannel);
    this.getProveImg(this.data.userid,this.data.task.id)
    if(this.data.isPublisher==0) {
      this.getUserInfo(this.data.userid)
    }else{
      this.getTaskStatus(this.data.userid,this.data.task.id)
    }

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