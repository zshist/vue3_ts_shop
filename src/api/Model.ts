/*
  * @Description:
  * @version:
  * @Author: zshist
  * @Date: 2021-8-31 11:42:54
*/
// 自定义返回类型
export interface ResponseValue<T> {
  flag?: boolean
  meta?: T
  message?: string
  data?: T
}