
Component({
  behaviors: [],
  // 使用模板时传入的数据在这里定义
  properties: {
    title:String,
    tip:String,
    valid:Boolean,
  },
  // 私有数据，可用于模版渲染
  data: {
    
  }, 
  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  lifetimes: {
    attached: function () {     },
    moved: function () { },
    detached: function () { },
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () { },
  },
  // 定义组件方法
  methods: {

  }
})