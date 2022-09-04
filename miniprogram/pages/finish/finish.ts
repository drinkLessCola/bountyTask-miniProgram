// pages/finish/finish.ts

import { submitTask,getTaskById,submitImage,delImage,getImage } from "../../API/finish";
const appf = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height:  appf.globalData.navBarHeight,
    // 目前发现需要的接口
    // 根据任务id查询
    // 上传证明图片 多次调用
    // 删除某个证明图片 额,似乎是全删
    // 查找该用户在该任务中提交的证明图片 额，每上传一张就重新调用一次。。
    // 提交任务
    taskid:0,
    userid:0,
    // userid看看从哪获取吧

    base64Array:new Array(),
    imgArray: new Array(),

    task: {
      title: '测试',
      request: '完成后截图'
    } as publishTaskObj, 

    // 需要后端task表的request项，所以直接使用publishTaskObj

    

    // 我不知道用户上传img怎么写在data里噢，是url还是什么玩意？

    submitData: {
      text: '',
    }
  },

  textInput: function (e: any) {
    var newSubmitData = this.data.submitData
    newSubmitData.text = e.detail.value
    this.setData({
      submitData : newSubmitData
    })
    // console.log(this.data.submitData);
    
  },
// 额，前端似乎不能把图片转url只能发base64，后端也不知道能不能把base64转url
// 暂时搁置
  addImg: function () {
    console.log("add");
    const _this =this
    let Img 
    wx.chooseMedia({
      count:1,
      mediaType:['image'],
      sizeType:['compressed'],
      // 压缩图片
      success: function(res) {
        var tempFiles = res.tempFiles
        const fileManager = wx.getFileSystemManager();
        const base64 = fileManager.readFileSync(tempFiles[0].tempFilePath, 'base64');
        console.log(base64.toString());
        let base64Array =  _this.data.base64Array
        let imgArray =  _this.data.imgArray
        base64Array.push(base64.toString())
        imgArray.push(tempFiles[0].tempFilePath)
        // console.log(_this.data.imgArray);
        _this.setData({
          base64Array:base64Array,
          imgArray:imgArray
        })
      },
      fail: function() {
        console.log("chooseError");
      }
    })
  },

  delImg(e:any) {
    const index = e.currentTarget.dataset.id
    let imgArray = this.data.imgArray
    let base64Array = this.data.base64Array
    imgArray.splice(index,1)
    base64Array.splice(index,1)
    this.setData({
      imgArray : imgArray,
      base64Array : base64Array
    })
  },
  
  // 删除图片？先不给你删[doge]
  // 现在..能用
  
  submit: function () {
    console.log("submit");
    this.data.base64Array.forEach(e => {
      if(e != ''){
      submitImage(this.data.taskid,this.data.userid,e.toString())
      // 擦，后端似乎不能强行接收base64
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        })
      }
    })
    submitTask(this.data.taskid,this.data.userid)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // 额？从哪个界面进来的？
  onLoad(option) {  
    if(option) {
      let taskid
    taskid=Number(option.id)
    this.setData({
      taskid:taskid
    })
    // 懒得删掉了
    getTaskById(taskid.toString())
      .then((data) => {
        console.log(data);
        this.setData({
          task:data as publishTaskObj
        })
      })
      .catch((err) => console.log(err))
    }
    
  },
  // 获取任务这个接口测试后没有问题（因为这里我把他设置成了首页面，上一个页面是没东西传过来的）

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