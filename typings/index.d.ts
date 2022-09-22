/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    titleCoord: Coord | null,
    navBarHeight:number,
    tabBarBottom:number,
    bottomBarHeight:number,
    searchKeyword:string,
    isRelease:boolean,
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}

interface TaskObj {
  id:number,
  title: string,        // 标题
  bounty: number,       // 赏金
  startTime: string,   // 发布时间
  label: string,         // 校区
  deadline: string,    // 截止时间
  area:string,
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
interface TaskDetailObj {
  bounty:number,
  contact:string,
  deadline:string,
  // finishNum:number,
  id:number,
  illustrate:string,
  labels:string[],
  request:string,
  number:number,
  title:string,
  //total:number,
  //category:string,
  //startTime:string,
  //taskStatus:number,
}
interface UnhandledTaskDetail {
  bounty:number,
  contact:string,
  deadline:string,
  id:number,
  illustrate:string,
  label:string,
  request:string,
  getNum:number,
  taskNumber:number,
  title:string,
  total:number,
  category:string,
  startTime:string,
  taskStatus:number,
}
interface TaskUser {
  id:number,
  nickName:string,
  avatarUrl:string,
  status:string | number,
}
interface TaskStatusObj {
  id:number,
  taskId:number,
  status:number,
  role:number,
  user:TaskUser
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

interface UserLoginInfo {
  encryptedData: any,
  iv: any
}

interface RecipeObj {
  name:string,
  food:string[],
  quantity:string[],
  step:string[]
}