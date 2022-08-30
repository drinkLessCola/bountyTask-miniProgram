import { publishTask } from "../../API/publishTask"
import { debounceWrapper } from "../../utils/util"

// miniprogram.ts
const apppT = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['截图 / 拍照', '无'],
    index: 0,
    labelArray: [{
      checked: false,
      name: '紧急'
    }, {
      checked: false,
      name: '泰山区'
    }, {
      checked: false,
      name: '华山区'
    }, {
      checked: false,
      name: '校外'
    },  {
      checked: false,
      name: '黑山区'
    }, {
      checked: false,
      name: '启林区'
    }, {
      checked: false,
      name: '主校区'
    }, {
      checked: false,
      name: '自定义'
    }],

    fontSize: 48,

    //日期选择器开始时间设置为当天
    startDate: '',
    beginDate: '',

    // 提交时把下面这两个合起来装ddl里
    standardDate:'',
    beginTime: '',


    // ----------------------------注意：这个taskInfo   符合   后端接口要求------------------
    taskInfo: {
      userid:0,
      title: '',
      illustrate: '',
      bounty: 0,
      tasknumber: 0,
      deadline: '',
      request: '',
      contact: '',
      label: '',
      // 后端要求拼接字符串 ok
      total: 0,
      category:'',
      // 分类到时候跳转页面的时候赋值
    } as publishTaskObj
  },

  toDateinfo: function (d: Date): any {
    const year = d.getFullYear(),
      month = d.getMonth() + 1,
      day = d.getDate()
    return { year, month, day }
  },

  dateCompare: function (a: Date, b: Date): Date {
    let aMS = a.getTime()
    let bMS = b.getTime()
    return aMS >= bMS ? a : b
    //选大的出来
  },
  //额，发现可以算出startTime，这个就废弃了
  //废弃个屁,万一填表途中过12点就嗝屁了

  // 时间输入检测
  bindDateChange: function (e: any) {
    const dateNow = new Date(Date.now())
    const dateSel = new Date(e.detail.value)
    var dateinfo = this.toDateinfo(this.dateCompare(dateNow, dateSel))

    this.setData({
      standardDate:dateinfo.year+'-'+dateinfo.month+'-'+dateinfo.day,
      beginDate: dateinfo.year + "年" + dateinfo.month + "月" + dateinfo.day + "日"
      
    })
  },

  bindTimeChange: function (e: any) {
    // 我草,在这里处理“截止时间早于现实时间”的问题实在难搞，不搞了
    this.setData({
      // 这玩意是标准的
      beginTime: e.detail.value
    })
  },



  //标签模块的处理
  labelTap: function (e: any) {
    const target = e.currentTarget.dataset.id
    const labelArrayHere = this.data.labelArray
    if (labelArrayHere[target].name != '自定义') {
      labelArrayHere[target].checked = !labelArrayHere[target].checked
      this.setData({
        labelArray: labelArrayHere
      })
    }
    else {
      // console.log('自定义');
      // 弹窗抄来的,好像这个接口可以传入一个自定义的界面？但我没找到完整的例子
      wx.showModal({
        title: '添加标签',
        placeholderText:"请输入内容",//有字数限制
        editable: true,
        success: (res) => {//使用箭头函数，不然this的指向有问题
          if (res.confirm) {
            console.log("确定");
            console.log("输入框的内容是："+res.content);
            const addLabel = {checked:false,name:res.content}
            const newlabelArray = this.data.labelArray
            newlabelArray.splice(newlabelArray.length-1,0,addLabel)
            this.setData({
              labelArray:newlabelArray
            })
          }else if(res.cancel){//官方建议不使用复杂逻辑
            console.log("取消");
          }
        }
      })

    }

  },

  bindPickerChange: function (e: any) {
    this.setData({
      index: e.detail.value
    })
  },

  //表单内数据的提取
  bindTitle:debounceWrapper(function(this:any, e:any) {
    const value = e.detail.value
    const taskInfo = this.data.taskInfo
    taskInfo.title = value
    //把textarea的内容装到taskinfo里，form好像不能打包textarea
    this.setData({
      taskInfo: taskInfo
    })
    console.log(this.data.taskInfo)
  }),

  bindContentInput: function (e: any) {
    const value = e.detail.value
    const taksContent = this.data.taskInfo
    taksContent.illustrate = value
    //把textarea的内容装到taskinfo里，form好像不能打包textarea
    this.setData({
      taskInfo: taksContent
    })
    // console.log(taksContent.content);额，回车不知道别人能不能看到
    
  },

  bindContact:function(e:any) {
    const value = e.detail.value
    const taksContact = this.data.taskInfo
    taksContact.contact = value
    //把textarea的内容装到taskinfo里，form好像不能打包textarea
    this.setData({
      taskInfo: taksContact
    })
  },

  //(写完时发现)最后就3个数据不用处理。。。。。。。辛苦了，致敬👏

  // 合计: 需要提交前计算
  // 先获取数据
  bindPerBounty: function (e: any) {
    const value = Number(e.detail.value)
    if (typeof value == "number") {
      const taksPerBounty = this.data.taskInfo
      taksPerBounty.bounty = value
      this.setData({
        taskInfo: taksPerBounty
      })
      this.calTotalBounty()
    }
  },

  bindTaskNumber: function (e: any) {
    const value = Number(e.detail.value)
    if (typeof value == "number") {
      const taksContent = this.data.taskInfo
      taksContent.tasknumber = value
      this.setData({
        taskInfo: taksContent
      })
      this.calTotalBounty()
    }

  },

  calTotalBounty: function () {
    const per = this.data.taskInfo.bounty
    const num = this.data.taskInfo.tasknumber
    // 非法情况
    if (per * num <= 0) {
      return
    }
    else {
      const taksBounty = this.data.taskInfo
      taksBounty.total = per * num
      //顺便把字体大小也写入data了
      this.setData({
        taskInfo: taksBounty,
        fontSize: this.fixFontSize(taksBounty.total)
      })


    }
  },

  // 合计： 的 字体自适应大小
  fixFontSize: function (n: number): number {
    // const totalBounty = this.data.taskInfo.bounty.toString()
    const totalBounty = n.toString()
    const num_Heighth_Div_Width = 1.15 //瞪出来的比例,并不是很准确
    const fontSize = (158 / totalBounty.length) * num_Heighth_Div_Width
    // console.log(fontSize);

    // 蓝湖默认48rpx,这里选最小的
    return 48 < fontSize ? 48 : fontSize
  },


  submit:function () {
    // 时间格式处理
    const taskInfo = this.data.taskInfo
    const timeCombine = this.data.standardDate+' '+this.data.beginTime+':00'
    taskInfo.deadline=timeCombine
    // 提交要求设置
    const request = this.data.array[this.data.index]
    taskInfo.request=request
    // 拼接标签数组变成字符串
    const labelArray = this.data.labelArray
    let labels = ''
    // 淦，这是个对象数组不能join
    labelArray.forEach(element => {
      if(element.checked==true){
        labels += element.name+','
      }
    });
    labels=labels.substr(0,labels.length-1)
    // console.log(labels);
    
    taskInfo.label=labels
    this.setData({
      taskInfo:taskInfo
    })
    console.log(this.data.taskInfo);

    const data = this.data.taskInfo
    //发送到后端未实现
    publishTask(data)
    .then(data => {
      console.log(data)
    })
    .catch(err => {
      console.log(err)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(option) {
    // console.log(this.data.height);
    let taskinfo = this.data.taskInfo
    let category = option.category
    taskinfo.category = String(category)
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