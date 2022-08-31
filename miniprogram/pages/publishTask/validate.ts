type validateType = "required" | "positive" | "deadline"
export interface ValidateRule {
  [key:string]: validateType[]
}
interface ValidateFunc {
  [key: string]: (val: any) => boolean
}

const validateFunc: ValidateFunc = {
  required: (val: any) => !!val,
  positive: (val: number) => val > 0,
}

export function validate(val: any, rules: validateType[]): boolean {
  const res = rules.reduce((valid: boolean, rule) => {
    if (!valid) return valid
    return validateFunc[rule](val)
  }, true)
  return res
}

