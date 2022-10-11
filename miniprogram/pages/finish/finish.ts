// pages/finish/finish.ts

import { submitTask,getTaskById,submitImage,delImage,getImage } from "../../API/finish";
import FormData from "../../utils/formdata";
const app = getApp()
const BASE_URL = "https://summerblink.site/api"
interface ProveImg {
  path:string
  extension:string
  fileName:string
  id:number
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height:app.globalData.navBarHeight,
    show:app.globalData.isRelease,    // 目前发现需要的接口
    // 根据任务id查询
    // 上传证明图片 多次调用
    // 删除某个证明图片 额,似乎是全删
    // 查找该用户在该任务中提交的证明图片 额，每上传一张就重新调用一次。。
    // 提交任务
    taskid:0,
    userid:0,
    // userid看看从哪获取吧

    base64Array:new Array(),
    imgArray: new Array<ProveImg>(),

    task: {
      title: '测试',
      request: '完成后截图'
    } as publishTaskObj, 

    // 需要后端task表的request项，所以直接使用publishTaskObj

    

    // 我不知道用户上传img怎么写在data里噢，是url还是什么玩意？

    submitData: {
      text: '',
    }
  },

  textInput: function (e: any) {
    var newSubmitData = this.data.submitData
    newSubmitData.text = e.detail.value
    this.setData({
      submitData : newSubmitData
    })
    // console.log(this.data.submitData);
    
  },
  /**
   * 选择图片
   */
  async addImg() {
    try {
      // 用户选择的图片 未经压缩
      const unhandledImgs = await wx.chooseMedia({
        count:6,
        mediaType:['image'],
        sizeType:['compressed'],
      })
      // 加上后缀标记
      const tempFiles = unhandledImgs.tempFiles.map(t => {
        const { tempFilePath } = t
        const extension = (tempFilePath.match(/\..*$/) as Array<string>)[0]
        return Object.assign(t, { extension })
      })

      // 压缩图片
      const pendingPromises = tempFiles.map(img => new Promise(async (resolve, reject) => {
        const { tempFilePath:path, extension } = img
        try {
          const res = await wx.compressImage({
            src:path,
            quality:50,
          })
          const { tempFilePath } = res
          resolve({ path:tempFilePath, extension})
        } catch(err) {
          console.log('图片压缩失败');
          reject()
        }
      }))
      const compressedImgs = await Promise.all(pendingPromises) as Array<ProveImg>
      
      // 上传图片
      const uploadedImgs = await Promise.all(
        compressedImgs.map(img => new Promise(async(resolve, reject) => {
          const { extension, path } = img
          const fileName = `bountyImage-${Date.now()}${extension}`
          const { id } = await this.uploadProveImg(path, fileName )
          resolve(Object.assign(img, { fileName, id }))
        }))
      ) as Array<ProveImg>

      // 上传成功，更新 imgArray
      const imgArray =  this.data.imgArray
      imgArray.push(...uploadedImgs)
      this.setData({ imgArray })
    } catch (err) {
      console.log("上传图片失败！" + err);
    }
  },

  delImg(e:any) {
    const index = e.currentTarget.dataset.id
    let imgArray = this.data.imgArray
    let base64Array = this.data.base64Array
    imgArray.splice(index,1)
    base64Array.splice(index,1)
    this.setData({
      imgArray : imgArray,
      base64Array : base64Array
    })
  },
  
  // 删除图片？先不给你删[doge]
  /**
   * 上传图片证明
   */
  uploadProveImg( imgPath:string, fileName:string ) {
    const { taskid, userid } = this.data
    const formData = new FormData()
    formData.appendFile('image', imgPath, fileName)
    formData.append("taskid", taskid)
    formData.append("userid", userid)
    const data = formData.getData()
    return submitImage(data)
  },

  async submit(){ 
    const { imgArray: imgs, taskid, userid } = this.data
    submitTask(taskid, userid)
    .then((res) => {
      console.log(res)
      wx.showToast({icon:'success', title:'提交成功！', duration:3000 }).then(() => wx.navigateBack())
    })
    .catch(err => {
      wx.showToast({icon:'none', title:'提交失败' })
      console.log(err)
    })
    
    // let flag = true //判定是否提交成功
    // this.data.imgArray.forEach(e => {
    //   console.log({
    //     taskid:this.data.taskid,
    //     userid:this.data.userid,
    //     img:e
    //   });
      
      // if(e != ''){
      

      //   let imgSArray = this.spliceToShortString(string_e)
      // submitImage(this.data.taskid,this.data.userid,string_e)
      // // 擦，后端似乎不能强行接收base64
      //   .then((data) => {
      //     console.log(data+'SI');
      //   })
      //   .catch((err) => {
      //     flag = false
      //     console.log(err+'SI');
      //   })
        
        
      // wx.uploadFile({
      //   // url:BASE_URL + '/haha',
      //   url:BASE_URL + '/prove/submit',
      //   filePath : e,
      //   name : "image",
      //   formData:{
      //     taskid:this.data.taskid,
      //     userid:this.data.userid,
      //   },
      //   success: res => {
      //     console.log(res,'上传成功');
      //   },
      //   fail: err => {
      //     console.log(err, '寄')
      //   }
      // })
    //   }
    // })
  },

  spliceToShortString(img:string){
    let stringArray = [];
    let length = img.length
    for(let i=0;i<length;i+=65535){
      stringArray.push(img.substring(i, length >= i+65536 ? i+65536 :length ))
    }
    console.log(stringArray);
    return stringArray;
    
  },



  /**
   * 生命周期函数--监听页面加载
   */
  // 额？从哪个界面进来的？
  onLoad(option) {  
    let taskid
    let userid
    taskid=Number(option.taskid)
    userid=Number(option.userid)
    this.setData({
      taskid:taskid,
      userid:userid
    })
    // 懒得删掉了
    getTaskById(taskid.toString())
      .then((data) => {
        console.log(data);
        this.setData({
          task:data as publishTaskObj
        })
      })
      .catch((err) => console.log(err))
    
    
  },
  // 获取任务这个接口测试后没有问题（因为这里我把他设置成了首页面，上一个页面是没东西传过来的）

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})