/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo,
    statusBarHeight :number,
    navBarHeight:number
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}

interface TimeInfo {
  month:number,
  date:number,
  isAm:boolean,
  hour:number,
  min:number
}