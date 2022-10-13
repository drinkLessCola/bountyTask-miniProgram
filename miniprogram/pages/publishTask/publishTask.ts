import { publishTask } from "../../API/publishTask"
import { login } from "../../utils/login"
import { debounceWrapper, getFormatDate } from "../../utils/util"
import { validate, ValidateRule } from "./validate"

const app = getApp()
interface Valid {
  title: boolean,
  illustrate: boolean,
  bounty: boolean,
  tasknumber: boolean,
  deadline: boolean,
}
// 校验规则
const rules: ValidateRule = {
  title: ["required"], 
  illustrate: ["required"],
  bounty: ["required", "non-negative"],
  deadline: ["required", "deadline"],
  tasknumber: ["required", "positive"],
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:app.globalData.isRelease,
    // 校验，为 false 会使相应的输入框出现红色边框和提示字段
    valid: {
      title: true,
      illustrate: true,
      bounty: true,
      tasknumber: true,
      deadline: true,
    } as Valid,
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
    categorys: [
      { checked: false, name: '取物' },
      { checked: false, name: '代购' },
      { checked: false, name: '投票' },
      { checked: true, name: '其他' }
    ],
    bottomBarHeight: app.globalData.bottomBarHeight,
    fontSize: 48,

    //日期选择器开始时间设置为当天
    startDate: '',
    startTime: '',

    // 提交时把下面这两个合起来装ddl里
    date: '',
    time: '',

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
  // 获取时间戳的方式：
  //    Date.now() 获取当前的时间戳
  //    Date.prototype.getTime() (即 Date 对象上有一个 getTime 方法)

  // toDateinfo: function (d: Date): any {
  //   const year = d.getFullYear(),
  //     month = d.getMonth() + 1,
  //     day = d.getDate()
  //   return { year, month, day }
  // },

  // dateCompare: function (a: Date, b: Date): Date {
  //   let aMS = a.getTime()
  //   let bMS = b.getTime()
  //   return aMS >= bMS ? a : b
  //   //选大的出来
  // },
  //额，发现可以算出startTime，这个就废弃了
  //废弃个屁,万一填表途中过12点就嗝屁了

  // 时间输入检测
  bindDate: function (e: any) {
    const { value } = e.detail
    this.setData({
      date: getFormatDate(new Date(value)).date
    })
    if (this.data.time) this.validateTime()
    // const dateStr = date.
    // toISOString().slice(0, 19).replace('T', ' '); 
    // const dateNow = new Date(Date.now())
    // const dateSel = new Date(e.detail.value)
    // var dateinfo = this.toDateinfo(this.dateCompare(dateNow, dateSel))
  },

  bindTime: function (e: any) {
    this.setData({
      // 这玩意是标准的
      time: e.detail.value
    })
    if (this.data.date) this.validateTime()
    console.log('@###########', this.data.date, this.data.time)
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
  categoryTap(e: any) {
    const id = +e.currentTarget.dataset.id
    const { categorys } = this.data
    categorys.forEach((cate, idx) => {
      cate.checked = idx === id ? true : false
    })
    this.setData({ categorys: categorys })
  },
  bindPicker: function (e: any) {
    this.setData({
      requireIdx: +e.detail.value
    })
  },

  // 标题
  bindTitle: debounceWrapper(function (this: any, e: any) {
    const value = e.detail.value
    this.setData({ ["taskInfo.title"]: value })
  }),
  //任务说明
  bindIllustrate: debounceWrapper(function (this: any, e: any) {
    const value = e.detail.value
    this.setData({ ["taskInfo.illustrate"]: value })
    // 额，回车不知道别人能不能看到
    // 应该可以吧，回车是不是 \n
  }),
  //联系方式
  bindContact: debounceWrapper(function (this: any, e: any) {
    const value = e.detail.value
    this.setData({ ["taskInfo.contact"]: value })
  }),

  //(写完时发现)最后就3个数据不用处理。。。。。。。辛苦了，致敬👏
  //悬赏金额（每份）
  bindPerBounty: function (e: any) {
    let value = e.detail.value
    // 虽然暂时还看不懂，但是解决了
    value = value.replace(/[^\d\.]|^\./g, '').replace(/\.{2}/g, '.').replace(/^([1-9]\d*|0)(\.\d{1,2})(\.|\d{1})?$/, '$1$2').replace(/^0\d{1}/g, '0');

    this.setData({
      ["taskInfo.bounty"]: value
    })
    this.calTotalBounty()
  },
  //任务份数
  bindTaskNumber: function (e: any) {
    let value = e.detail.value.replace(/[^(1-9|0)]/, '').replace(/^0\d{1}/g, '0')
    this.setData({
      ["taskInfo.tasknumber"]: value
    })
    this.calTotalBounty()
  },
  // 合计
  calTotalBounty: function () {
    const { bounty: per, tasknumber: num } = this.data.taskInfo
    const total = Math.max(0, per * num)
    //顺便把字体大小也写入data了
    this.setData({
      ["taskInfo.total"]: total,
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
  /**
   * 校验
   */
  validateData(name: string, val: any) {
    const isVaild = validate(`${val}`, rules[name])
    this.setData({
      [`valid.${name}`]: isVaild
    })
  },
  validateTime(): void {
    let { date: d, time } = this.data
    d = d.replace(/[年月]/gu, '-').replace(/日/, '')
    const date = new Date(+new Date(`${d} ${time}:00`) + 8 * 3600 * 1000)
    console.log('date', date)
    if (date.getTime() < Date.now()) {
      this.setData({
        ["valid.deadline"]: false
      })
      return
    }

    const deadline = date.toISOString().replace('T', ' ').slice(0, 19)
    console.log(deadline)
    this.setData({
      ["taskInfo.deadline"]: deadline,
      ["valid.deadline"]: true
    })
  },
  validateAllData() {
    const datas = this.data.taskInfo
    const valid = this.data.valid
    type Key = keyof Valid;
    // 脑阔疼
    for (let key in valid) {
      if (key === 'deadline') continue
      this.validateData(key, datas[key as Key])
    }
    this.validateTime()
  },
  /**
   * 是否所有数据都有效
   * @returns {boolean} 数据是否有效
   */
  isValid(): boolean {
    const { valid } = this.data
    for (let key in valid) {
      if (!valid[key as keyof Valid]) return false
    }
    return true
  },
  /**
   * 发布任务
   */
  async submit() {
    // 校验必填项
    this.validateAllData()
    if (!this.isValid()) return

    const userid = await this.hasLogin()
    // 时间格式处理
    // const timeCombine = this.data.standardDate + ' ' + this.data.beginTime + ':00'
    // taskInfo.deadline = timeCombine
    // // 提交要求设置
    const request = this.data.submitRequireArr[this.data.requireIdx]
    // taskInfo.request = request
    // // 拼接标签数组变成字符串
    const { labelArray, categorys } = this.data
    // 淦，这是个对象数组不能join

    // labelArray.forEach(element => {
    //   if (element.checked == true) {
    //     labels += element.name + ','
    //   }
    // });
    // labels = labels.substr(0, labels.length - 1)

    // taskInfo.label = labels
    // this.setData({
    //   taskInfo: taskInfo
    // })
    // console.log(this.data.taskInfo);

    // 可以这样
    const label = labelArray.filter(label => label.checked).map(obj => obj.name).join(',')
    const category = categorys.filter(cate => cate.checked)[0].name
    console.log(this.data.taskInfo)
    const data = Object.assign({}, this.data.taskInfo, { label, request, category, userid })
    console.log(data)

    // 发送请求
    publishTask(data)
      .then(data => {
        console.log(data)
        wx.showToast({
          // TODO: bug
          duration: 4000,
          icon: 'success',
          title: "发布成功！"
        }).then(() => wx.navigateBack())

      })
      .catch(err => {
        console.log(err)
      })
  },
  handleBlur(e: any) {
    const name = e.currentTarget.id
    let val = e.detail.value
    if (name === 'bounty') {
      val = parseFloat(val)
      this.setData({
        ["taskInfo.bounty"]: `${val}`
      })
    }
    if (name === 'tasknumber') {
      val = +val
      this.setData({
        ["taskInfo.tasknumber"]: val
      })
    }

    console.log(name, val)
    this.validateData(name, val)
  },
  hasLogin() {
    const {id: uid} = wx.getStorageSync('user')
    console.log(uid)
    if (!uid) {
      console.log('?')
      wx.showToast({
        icon: 'none',
        title: '请先登录！'
      })
      return login()
    }
    return Promise.resolve(uid)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(option) {
    let taskinfo = this.data.taskInfo
    let category = option.category
    taskinfo.category = String(category)
    const { date, time } = getFormatDate(new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1))
    //当天的23点59分59秒
    this.setData({
      startDate: date,
      startTime: time,
      date: date,
      time: time
    })
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
    wx.createSelectorQuery().select('#title').node((res) => {
      console.log(res)
    }).exec()
  }

})