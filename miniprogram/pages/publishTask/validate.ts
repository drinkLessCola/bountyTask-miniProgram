// 类型定义
type validateType = "required" | "positive" | "deadline" | "non-negative"
export interface ValidateRule {
  [key:string]: validateType[]
}
interface ValidateFunc {
  [key: string]: (val: any) => boolean
}
/**
 * 校验规则对应的函数
 */
const validateFunc: ValidateFunc = {
  required: (val: any) => !!val,
  positive: (val: string) => +val > 0,
  "non-negative": (val: string) => +val >= 0,
}
/**
 * 校验单个字段是否符合规则
 * @param val 校验的字段的值
 * @param rules 规则数组，如 ["required"]
 */
export function validate(val: any, rules: validateType[]): boolean {
  // reduce 遍历规则数组，第一个参数是函数，数组的每一项都会执行该函数
  // 函数的返回值会传递给下一次迭代的第一个参数 valid，最后返回给 res
  const res = rules.reduce((valid: boolean, rule) => {
    // 如果有一个规则不符合，直接返回无效
    if (!valid) return valid
    // 检验是否符合某一个规则，执行对应的规则函数
    console.log(rule,validateFunc[rule](val))
    return validateFunc[rule](val)
  }, true)
  return res
}

