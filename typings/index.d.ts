/// <reference path="./types/index.d.ts" />
/// <reference path="./task.d.ts"/>
/// <reference path="../miniprogram/utils/socket.ts"/>
/// <reference path="./message.d.ts"/>

interface IAppOption {
  globalData: {
    titleCoord: Coord | null,
    navBarHeight:number,
    tabBarBottom:number,
    bottomBarHeight:number,
    searchKeyword:string,
    isRelease:boolean,
    message:Object,
  }
  handleMsg:(msg:any) => void,
  subscribe:(prop:keyof IAppOption["globalData"], callback:any) => void,
  clearMsg:() => void,
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

interface Object {
  [key: string]: any
}

interface UserLoginInfo {
  encryptedData: any,
  iv: any
}

interface UserInfo {
  id: number,
  money:number,
  finishNum:number,
  getNum:number,
  postNum:number,
  settleNum:number
}

interface FormData {
  contentType: string,
  buffer: ArrayBufferLike
}