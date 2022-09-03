// 类型定义
type validateType = "required" | "positive" | "deadline"
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
  positive: (val: number) => val > 0,
}
/**
 * 校验单个字段是否符合规则
 * @param val 校验的字段的值
 * @param rules 规则数组，如 ["required"]
 */
export function validate(val: any, rules: validateType[]): boolean {
  const res = rules.reduce((valid: boolean, rule) => {
    if (!valid) return valid
    return validateFunc[rule](val)
  }, true)
  return res
}

