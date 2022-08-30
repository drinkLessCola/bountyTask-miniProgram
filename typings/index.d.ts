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

interface TaskObj {
  id:BigInt,
  title: String,        // 标题
  bounty: Number,       // 赏金
  startTime: Date,   // 发布时间
  area: String,         // 校区
  deadline: Date,    // 截止时间
}
interface publishTaskObj {
  userid: number,
  title: string,
  illustrate: string,
  bounty: number,
  tasknumber: number,
  deadline: string,
  request: string,
  contact: string,
  label: string,
  // 后端要求拼接字符串
  total: number,
  category:string,
}
interface TaskCollectionOption {
  data: {
    height:number,
    taskArray:TaskObj[]
  }
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

interface Object {
  [key: string]: any
}