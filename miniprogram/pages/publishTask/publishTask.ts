import { publishTask } from "../../API/publishTask"
import { debounceWrapper } from "../../utils/util"

// miniprogram.ts
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    submitRequireArr: ['截图 / 拍照', '无'],
    requireIdx: 0,

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
    }, {
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
    bottomBarHeight:app.globalData.bottomBarHeight,
    fontSize: 48,

    //日期选择器开始时间设置为当天
    startDate: '',
    beginDate: '',

    // 提交时把下面这两个合起来装ddl里
    standardDate: '',
    beginTime: '',


    // ----------------------------注意：这个taskInfo   符合   后端接口要求------------------
    taskInfo: {
      userid: 0,
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
      category: '',
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
  bindDate: function (e: any) {
    const dateNow = new Date(Date.now())
    const dateSel = new Date(e.detail.value)
    var dateinfo = this.toDateinfo(this.dateCompare(dateNow, dateSel))

    this.setData({
      standardDate: dateinfo.year + '-' + dateinfo.month + '-' + dateinfo.day,
      beginDate: dateinfo.year + "年" + dateinfo.month + "月" + dateinfo.day + "日"

    })
  },

  bindTime: function (e: any) {
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
        placeholderText: "请输入内容",//有字数限制
        editable: true,
        success: (res) => {//使用箭头函数，不然this的指向有问题
          if (res.confirm) {
            console.log("确定");
            console.log("输入框的内容是：" + res.content);
            const addLabel = { checked: false, name: res.content }
            const newlabelArray = this.data.labelArray
            newlabelArray.splice(newlabelArray.length - 1, 0, addLabel)
            this.setData({
              labelArray: newlabelArray
            })
          } else if (res.cancel) {//官方建议不使用复杂逻辑
            console.log("取消");
          }
        }
      })

    }

  },

  bindPicker: function (this: any, e: any) {
    this.setData({
      index: e.detail.value
    })
  },

  //表单内数据的提取
  bindTitle: debounceWrapper(function (this: any, e: any) {
    const value = e.detail.value
    this.setData({["taskInfo.title"] : value})
  }),

  bindIllustrate: debounceWrapper(function (this: any, e: any) {
    const value = e.detail.value
    this.setData({ ["taskInfo.illustrate"]: value })
    // 额，回车不知道别人能不能看到
    // 应该可以吧，回车是不是 \n
  }),

  bindContact: debounceWrapper(function (this: any, e: any) {
    const value = e.detail.value
    this.setData({ ["taskInfo.contact"]: value })
  }),

  //(写完时发现)最后就3个数据不用处理。。。。。。。辛苦了，致敬👏

  bindPerBounty: function (e: any) {
    let value = e.detail.value
    // 虽然暂时还看不懂，但是解决了
    value = value.replace(/[^\d\.]|^\./g, '').replace(/\.{2}/g, '.').replace(/^([1-9]\d*|0)(\.\d{1,2})(\.|\d{1})?$/, '$1$2').replace(/^0\d{1}/g, '0');

    this.setData({
      ["taskInfo.bounty"]: value
    })
    this.calTotalBounty()
  },

  bindTaskNumber: function (e: any) {
    let value = e.detail.value.replace(/[^(1-9|0)]/, '').replace(/^0\d{1}/g, '0')
    this.setData({
      ["taskInfo.tasknumber"]: value
    })
    this.calTotalBounty()
    return `${value}`
  },

  calTotalBounty: function () {
    const { bounty: per, tasknumber: num } = this.data.taskInfo
    const total = Math.max(0, per * num)
    //顺便把字体大小也写入data了
    this.setData({
      ["taskInfo.total"]:total,
      fontSize: this.fixFontSize(total)
    })
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


  submit: function () {
    // 时间格式处理
    const taskInfo = this.data.taskInfo
    const timeCombine = this.data.standardDate + ' ' + this.data.beginTime + ':00'
    taskInfo.deadline = timeCombine
    // 提交要求设置
    const request = this.data.submitRequireArr[this.data.requireIdx]
    taskInfo.request = request
    // 拼接标签数组变成字符串
    const labelArray = this.data.labelArray
    let labels = ''
    // 淦，这是个对象数组不能join
    labelArray.forEach(element => {
      if (element.checked == true) {
        labels += element.name + ','
      }
    });
    labels = labels.substr(0, labels.length - 1)
    // console.log(labels);

    taskInfo.label = labels
    this.setData({
      taskInfo: taskInfo
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
    console.log(this.data.bottomBarHeight)
},

})