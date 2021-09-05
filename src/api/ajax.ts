import { ReqMethodEnum } from './ReqMethodEnum'
/*
  * @Description:
  * @version:
  * @Author: zshist
  * @Date: 2021-8-30 16:23:39
  * @LastEditors: zshist
  * @LastEditTime: 2021-8-30 17:04:53
 */
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1'
axios.interceptors.request.use(config => {
  config.headers.Authorization = sessionStorage.getItem('token')
  return config
})

export default function ajax<T>(url: string, data: {} = {}, method: ReqMethodEnum = ReqMethodEnum.GET): Promise<T>{
  return new Promise((resolve, reject) => {
    const headers = { 'content-Type': 'application/json;charset=UTF-8' }
    let promise: Promise<T>
    switch (method){
      case ReqMethodEnum.GET:
        promise = axios.get(url, { params: data, headers })
        break
      case ReqMethodEnum.POST:
        promise = axios.post(url, data, { headers })
        break
      case ReqMethodEnum.PUT:
        promise = axios.put(url, data, { headers })
        break
      case ReqMethodEnum.DELETE:
        promise = axios.delete(url, { params: data, headers })
        break
      default:
        promise = axios.get(url, { params: data, headers })
        break
    }
    promise.then((response: any) => {
      resolve(response.data)
    }).catch((error) => {
      // reject(error)
      alert('请求出错'+ error.message)
    })
  })
}