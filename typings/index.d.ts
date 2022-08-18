/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo,
    titleCoord: Coord | null,
    navBarHeight:number,
    tabBarBottom:number,
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

interface Coord {
  left:number,
  bottom:number
}

interface BindTapEvent{
  type:string,
  currentTarget:{
    dataset: {
      [propName:string]:any
    }
    [propName: string]: any
  }
  [propName: string]: any
  // dataset:object,
}