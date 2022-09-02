import { searchTask } from "../../API/taskCenter"

// component/nav.ts
const app = getApp()
Component({
  properties: {
  },
  // 组件用来储存内部私有数据
  data: {
    active: false,
    keyword:'',
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
    handleInput(e:any) {
      this.setData({ keyword: e.detail.value })
    },
    loadHistory() {
      const historys = wx.getStorageSync('searchHistory')
      let historyArr = historys ? historys.split(',') : []
      console.log(historyArr)
      historyArr = Array.from(new Set(historyArr))
      console.log(historyArr)
      this.setData({ historyArr: historyArr})
    },
    useKeyword(e: any) {
      const keyword = e.currentTarget.dataset.key
      this.setData({
        keyword:keyword
      })
      this.triggerEvent('search', keyword)
    },
    search() {
      const {historyArr, keyword} = this.data
      historyArr.push(keyword)
      console.log(historyArr)
      const historyStr = historyArr.join(',')
      console.log(historyStr)
      wx.setStorageSync('searchHistory', historyStr)
      this.triggerEvent('search', keyword)
    }
  }
})


export {}