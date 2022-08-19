// component/userinfoBox/userinfoBOx.ts
Component({
  /**
   * 组件的属性列表
   */
  externalClasses:['fontCSS','imageCSS'],

  properties: {
    avatarUrl: String,
    nickname: String,
    size:Number
  },

  
  /**
   * 组件的初始数据
   */
  data: {
    avatarUrl: '',
    nickname: '',
    size:50,
    fontTop:20,
  },

  /**
   * 组件的方法列表
   */
  lifetimes: {
    attached: function () {
      let size = this.properties.size
      if(size==null ||size==0){
        size=50
      }
      let top = -size/2+14
      //位移为框高一半 - 字体大小的一半
      this.setData({
        avatarUrl: this.properties.avatarUrl,
        nickname: this.properties.nickname,
        size:size,
        fontTop:top
      })

      // console.log(this.properties.avatarUrl);
      // console.log(this.data.nickname);
      
    }
  },

  methods: {

  }
})
