import mimeMap from './mineMap'

class FormData {
  private fileManager: WechatMiniprogram.FileSystemManager
  private data: Object
  private files: Array<any>


  constructor() {
    this.fileManager = wx.getFileSystemManager();
    this.data = {};
    this.files = [];
  }


  appendAll(obj: Object) {
    for (let name in obj) {
      const value = obj[name]
      this.append(name, value)
    }
  }
  append(name: string, value: any): true {
    this.data[name] = value;
    return true;
  }

  appendFile(name: string, path: string) {
    let buffer = this.fileManager.readFileSync(path);
    if (Object.prototype.toString.call(buffer).indexOf("ArrayBuffer") < 0) {
      return false;
    }
    this.files.push({
      name: name,
      buffer: buffer,
      fileName: getFileNameFromPath(path)
    });
    return true;
  }

  getData() {
    return convert(this.data, this.files)
  }
}

function getFileNameFromPath(path: string) {
  let idx = path.lastIndexOf("/");
  return path.substr(idx + 1);
}

function convert(data:Object, files:Object) {
  let boundaryKey = 'wxmpFormBoundary' + randString(); // 数据分割符，一般是随机的字符串
  let boundary = '--' + boundaryKey;
  let endBoundary = boundary + '--';

  let postArray = new Array();
  //拼接参数
  if (data && Object.prototype.toString.call(data) == "[object Object]") {
    for (let key in data) {
      postArray = postArray.concat(formDataArray(boundary, key, data[key]));
    }
  }
  //拼接文件
  if (files && Object.prototype.toString.call(files) == "[object Array]") {
    for (let i in files) {
      let file = files[i];
      postArray = postArray.concat(formDataArray(boundary, file.name, file.buffer, file.fileName));
    }
  }
  //结尾
  let endBoundaryArray = [];
  for (var i = 0; i < endBoundary.length; i++) { // 最后取出结束boundary的charCode
    endBoundaryArray.push(...endBoundary.utf8CodeAt(i));
  }
  postArray = postArray.concat(endBoundaryArray);
  return {
    contentType: 'multipart/form-data; boundary=' + boundaryKey,
    buffer: new Uint8Array(postArray).buffer
  }
}

function randString() {
  let res = "";
  for (let i = 0; i < 17; i++) {
    let n = parseInt(`${Math.random() * 62}`);
    if (n <= 9) {
      res += n;
    }
    else if (n <= 35) {
      res += String.fromCharCode(n + 55);
    }
    else {
      res += String.fromCharCode(n + 61);
    }
  }
  return res;
}

function formDataArray(boundary:string, name:string, value:any, fileName?:string) {
  let dataString = '';

  dataString += boundary + '\r\n';
  dataString += 'Content-Disposition: form-data; name="' + name + '"';
  if (fileName) {
    dataString += '; filename="' + fileName + '"' + '\r\n';
    dataString += 'Content-Type: ' + getFileMime(fileName) + '\r\n\r\n';
  }
  else {
    dataString += '\r\n\r\n';
    dataString += value;
  }

  var dataArray = [];
  for (var i = 0; i < dataString.length; i++) { // 取出文本的charCode（10进制）
    dataArray.push(...dataString.utf8CodeAt(i));
  }

  if (fileName) {
    let fileArray = new Uint8Array(value);
    dataArray = dataArray.concat(Array.prototype.slice.call(fileArray));
  }
  dataArray.push(..."\r".utf8CodeAt(0));
  dataArray.push(..."\n".utf8CodeAt(0));

  return dataArray;
}

function getFileMime(fileName:string):string {
  let idx = fileName.lastIndexOf(".");
  let mime = mimeMap[fileName.substr(idx)];
  return mime ? mime : "application/octet-stream"
}

String.prototype.utf8CodeAt = function (i:number):Array<any> {
  var str = this;
  var out = [], p = 0;
  var c = str.charCodeAt(i);
  if (c < 128) {
    out[p++] = c;
  } else if (c < 2048) {
    out[p++] = (c >> 6) | 192;
    out[p++] = (c & 63) | 128;
  } else if (
    ((c & 0xFC00) == 0xD800) && (i + 1) < str.length &&
    ((str.charCodeAt(i + 1) & 0xFC00) == 0xDC00)) {
    // Surrogate Pair
    c = 0x10000 + ((c & 0x03FF) << 10) + (str.charCodeAt(++i) & 0x03FF);
    out[p++] = (c >> 18) | 240;
    out[p++] = ((c >> 12) & 63) | 128;
    out[p++] = ((c >> 6) & 63) | 128;
    out[p++] = (c & 63) | 128;
  } else {
    out[p++] = (c >> 12) | 224;
    out[p++] = ((c >> 6) & 63) | 128;
    out[p++] = (c & 63) | 128;
  }
  return out;
};


export default FormData;