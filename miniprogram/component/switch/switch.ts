import { searchTask } from "../../API/taskCenter"

// component/nav.ts
const app = getApp()
interface SwitchOptionItem {
  label: string,
  value: any
}
Component({
  properties: {
    options: Array,
    activeIdx: {
      type:Number,
      value:0,
      observer(newval) {
        console.log(newval)
        this.setData({activeIdx: newval})
        this.update()
      }
    }
  },
  // 组件用来储存内部私有数据
  data: {
    activeIdx: 0,
  },
  // attached函数 当组件进入页面节点树时触发，可以使用setData，绝大多数初始化工作在这个时机进行
  attached: function () {
    this.update()
   },
  // methods对象 定义组件内的各种方法
  methods: {
    switch(e: any) {
      const { value } = e.currentTarget.dataset
      // this.setData({
      //   activeIdx: value
      // })
      this.update()
      this.triggerEvent('switch', value)
    },
    update() {
      const { activeIdx, options } = this.data
      const handledOptions = options.map( (op, idx) => {
        op.isActive = idx === activeIdx
        return op
      })
      handledOptions
      this.setData({
        options:handledOptions
      })
    }
  }
})


export {}