import { searchTask } from "../../API/taskCenter"

// component/nav.ts
const app = getApp()
Component({
  properties: {
    keyword:String,
    width:Number,
    mode:String
  },
  // 组件用来储存内部私有数据
  data: {
    active: false,
    historyArr:[] as Array<string>
  },
  // attached函数 当组件进入页面节点树时触发，可以使用setData，绝大多数初始化工作在这个时机进行
  attached: function () { },
  // methods对象 定义组件内的各种方法
  methods: {
    handleFocus() {
      this.setData({ active: true })
      this.loadHistory()
    },
    handleBlur() {
      setTimeout(() => this.setData({ active: false }), 150)
    },
    handleConfirm() {
      this.search()
    },
    handleInput(e:any) {
      this.setData({ keyword: e.detail.value })
    },
    // 加载搜索历史记录
    loadHistory() {
      const historys = wx.getStorageSync('searchHistory')
      let historyArr = historys ? historys.split(',') : []
      // 使用 Set() 去重
      // Set 接收一个可迭代对象（Array / Set实例是可迭代对象）
      // Array.from() 可以将一个可迭代对象转换为数组
      historyArr = Array.from(new Set(historyArr))
      this.setData({ historyArr: historyArr})
    },
    // 点击历史记录，使用该 keyword
    useKeyword(e: any) {
      const keyword = e.currentTarget.dataset.key
      this.setData({
        keyword:keyword
      })
      this.triggerEvent('search', keyword)
    },
    // 搜索
    search() {
      const {historyArr, keyword} = this.data
      // 空字符串不显示在历史记录中
       if(keyword !== '') historyArr.push(keyword)
      const historyStr = historyArr.join(',')
      wx.setStorageSync('searchHistory', historyStr)
      // 发送自定义事件，在使用组件的页面定义监听该自定义事件
      this.triggerEvent('search', keyword)
    }
  }
})


export {}