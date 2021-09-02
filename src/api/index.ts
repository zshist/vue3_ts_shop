/*
  * @Description:
  * @version:
  * @Author: zshist
  * @2021-8-31 15:06:23
*/
import ajax from './ajax'
import { ResponseValue, UserData, UserMsg } from './Model'
import { ReqMethodEnum } from './ReqMethodEnum'
/*
  * @name: reqLogin
  * @test: test font
  * @msg: 登录接口
  * @param: {string}username
  * @param: {string}password
  * @return: {*}
*/
export const reqLogin = (username: string, password: string): Promise<ResponseValue<UserData, UserMsg>> =>
  ajax<ResponseValue<UserData, UserMsg>>('/login', { username, password }, ReqMethodEnum.POST)

