/*
  * @Description:
  * @version:
  * @Author: zshist
  * @2021-8-31 15:06:23
*/
import ajax from './ajax'
import { ResponseValue } from './Model'
import { ReqMethodEnum } from './ReqMethodEnum'
import { UserModel } from '../types'
/*
  * @name: reqLogin
  * @test: test font
  * @msg: 登录接口
  * @param: {string}username
  * @param: {string}password
  * @return: {*}
*/
export const reqLogin = (username: string, password: string): Promise<ResponseValue<UserModel>> =>
  ajax<ResponseValue<UserModel>>('/login', { username, password }, ReqMethodEnum.POST)

/*
  * @name: reqUsers
  * @test: test font
  * @msg: 获取用户列表
  * @param
  * return {*}
*/