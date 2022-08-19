// component/userinfoBox/userinfoBOx.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    avatarUrl: String,
    nickname: String,
  },

  externalClasses: ['fontCSS'],
  /**
   * 组件的初始数据
   */
  data: {
    avatarUrl: '',
    nickname: ''
  },

  /**
   * 组件的方法列表
   */
  lifetimes: {
    attached: function () {
      this.setData({
        avatarUrl: this.properties.avatarUrl,
        nickname: this.properties.nickname
      })
      console.log(this.properties.avatarUrl);
      console.log(this.data.nickname);
      
    }
  },

  methods: {

  }
})
