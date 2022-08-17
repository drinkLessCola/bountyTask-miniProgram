// miniprogram.ts
const apppT =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '发布任务', //导航栏标题
    },
    //height:  apppT.globalData.navBarHeight,
    array:['截图/拍照','无'],
    index:0,

    labelArray:[{
      checked:false,
      name:'紧急'
    },{
      checked:false,
      name:'泰山区'
    },{
      checked:false,
      name:'华山区'
    },{
      checked:false,
      name:'校外'
    },{
      checked:false,
      name:'取物'
    },{
      checked:false,
      name:'黑山区'
    },{
      checked:false,
      name:'启林区'
    },{
      checked:false,
      name:'主校区'
    },{
      checked:false,
      name:'自定义'
    }],
    totalBounty:200,

    fontSize:48,

    startDate:'',
    beginDate:'',
    // startTime:'',
    beginTime:'',

    taskInfo:{
      title:'',
      content:'',
      perBounty:'',
      taskNum:'',
      deadline:'',
      submitRequire:'',
      contact:'',
      labels:[''],
      bounty:''
    }
  },

  toDateinfo:function(d:Date): any{
    const year = d.getFullYear(),
      month = d.getMonth()+1,
      day = d.getDate()
    return {year,month,day} 
  },

  dateCompare:function(a:Date,b:Date):Date {
    let aMS = a.getTime()
    let bMS = b.getTime()
      return aMS>=bMS ? a : b
      //选大的出来
  },
  //额，发现可以算出startTime，这个就废弃了
  //废弃个屁,万一填表途中过12点就嗝屁了

  fixFontSize:function() :number{
    const totalBounty = this.data.totalBounty.toString()
    const num_Heighth_Div_Width = 1.15
    const fontSize = (158/totalBounty.length)*num_Heighth_Div_Width
    // console.log(fontSize);
    // 蓝湖默认48rpx
    return 48<fontSize ? 48 :fontSize
  },

  bindDateChange:function(e:any) {
    const dateNow = new Date(Date.now())
    const dateSel = new Date(e.detail.value)
    var dateinfo = this.toDateinfo(this.dateCompare(dateNow,dateSel))
    this.setData({
      beginDate:dateinfo.year+"年"+dateinfo.month+"月"+dateinfo.day+"日"
    })
  },

  bindTimeChange:function(e:any) {
    // 我草,在这里处理“截止时间早于现实时间”的问题实在难搞，不搞了
    this.setData({
      beginTime:e.detail.value
    })
  },

  labelTap:function(e:any) {
    const target = e.currentTarget.dataset.id
    const labelArrayHere = this.data.labelArray
    if(labelArrayHere[target].name != '自定义') {
      labelArrayHere[target].checked=!labelArrayHere[target].checked
      this.setData ({
        labelArray:labelArrayHere
      })
    }
    else{
      console.log('自定义');
      //等待实现
    }

  },

  bindPickerChange:function(e:any) {
    
    this.setData({
      index: e.detail.value

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.setData({
      fontSize : this.fixFontSize()
    })
    // console.log(this.data.height);
    
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