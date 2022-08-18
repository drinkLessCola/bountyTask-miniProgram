// component/taskMessage/taskMessage.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:String,
    time:String,
    status:Number||String,

  },

  /**
   * 组件的初始数据
   */
  data: {
    title:'',
    time:'',
    showTime:'',
    status:'',
    showStatus:'',
  },


  /**
   * 组件的方法列表
   */
  lifetimes: {
    
    attached: function () {
      this.setData({
        
      })
     },
    moved: function () { },
    detached: function () { },
  },

  methods: {
    statusTransform(s:number|string):string {
      return ''
    },
    timeTransform(t:string):string {
      return ''
    }
  }
})
