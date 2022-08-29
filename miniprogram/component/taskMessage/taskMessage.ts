// component/taskMessage/taskMessage.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:String,
    time:String,
    statusBar:String,
    // status:Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    title:'',
    time:'',
    statusBar:'',
  },


  /**
   * 组件的方法列表
   */
  lifetimes: {
    
    attached: function () {
      this.setData({
        time:this.properties.time,
        title:this.properties.title,
        statusBar:this.properties.statusBar,
        // status:this.properties.status
      })
     },
    moved: function () { },
    detached: function () { },
  },

  methods: {
    statusTransform(s:number):string {
      if(s != 0 ) {
        // if( s%2 == 0){}
        if(s == 1 || s == 4 ) {

        }
        else {

        }
      }
      
      return ''
    },
    timeTransform(t:string):string {
      return ''
    }
  }
})
