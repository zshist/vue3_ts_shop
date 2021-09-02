/*
  * @Description:
  * @version:
  * @Author: zshist
  * @Date: 2021-8-31 11:42:54
*/

// 自定义返回类型
export interface ResponseValue<T, K> {
  flag?: boolean
  data: T
  message?: string
  meta: K
}

export interface UserData{
  id: number
  rid: number
  username: string
  mobile: string
  email: string
  token: string
}

export interface UserMsg{
  msg: string,
  status: number
}