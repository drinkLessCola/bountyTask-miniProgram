// miniprogram.ts


Page({

  /**
   * 页面的初始数据
   */
  data: {
    // avatarUrl: getApp().globalData.defaultAvatarUrl,
    avatarUrl:'http://tmp/ny1Hd2Fgrql4d21c915c93b7255357d06571d729118e.jpeg',
    // lzh的头像
    //当前用户的
    nickname:'一昵称',
    userid:0,

    // color:'#FFF3DD',
    color:"#000000",

    isPublisher:1,
    // 0是发布者 1不是
    hidden:1,

    publish:{
      Id:0,
      nickname:'发布者',
      avatarUrl:'http://tmp/ny1Hd2Fgrql4d21c915c93b7255357d06571d729118e.jpeg',
    },
    
    geter:{
      Id:0,//id最终不会放进task
      nickname:'',
      avatarUrl:'',
      status:0,//2：待确认；1：进行中；0：已完成
    },
    // 领取者获取回来时的对象结构，仅用作展示

    task:{
      id:0,
      title:'任务标题',
      getCondition:[{
        nickname:'一号',
        avatarUrl:'http://tmp/ny1Hd2Fgrql4d21c915c93b7255357d06571d729118e.jpeg',
        status:"已完成",
      },{
        nickname:'2号',
        avatarUrl:'http://tmp/ny1Hd2Fgrql4d21c915c93b7255357d06571d729118e.jpeg',
        status:"待确认",
      },{
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
    // 这里的task对象是需要在下面处理后再放数据的
    // 上一个界面传任务id和userid过来
    // 调用接口：根据任务id获得任务发布者id，任务执行者id，以及其在该任务的状态  Ⅱ
    // 比较userid和任务发布者id 决定这个页面显示什么
    // 调用接口: 根据任务id查询返回任务对象
    // 根据返回的任务对象 把所需要的信息填入这里的task对象

    //领取情况：接口Ⅱ 还会返回所有任务执行id和执行状态,遍历所有执行者id,使用 接口:根据用户id查询 获取用户昵称和用户头像
    //然后把这些用户昵称 头像 和 转成字符串的执行状态 打包成对象丢进去getCondition

    //剩余n份任务等后端改完任务对象再看

    //这里需要写一个字符串分离方法,因为后端的labels是个字符串而不是字符串数组
    //要是有大聪明自定义标签是个','就寄了

    //时间从任务对象里获取后要处理

    //
    

  },

 

  // onChooseAvatar(e:any) {
  //   const   { avatarUrl }  = e.detail
  //   this.setData({
  //     avatarUrl,
  //   })
  //   console.log(avatarUrl);

  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

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