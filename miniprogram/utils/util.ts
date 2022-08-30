export const formatTime = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

const formatNumber = (n: number) => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}
interface Obj {
  [prop:string]:any
}
export const formdata =  (obj:Obj = {}) => {
  let result = ''
  for (let name of Object.keys(obj)) {
    let value = obj[name];
    result += 
    `\r\n--XXX'\r\nContent-Disposition: form-data; name="${name}"\r\n\r\n${value}`
  }
  return result + '\r\n--XXX--'
}

export const debounceWrapper = (func:Function, ms:number = 500) => {
  let timer:null | number
  return function(this:any, ...args:any[]){
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => func.apply(this, args), ms)
  }
}