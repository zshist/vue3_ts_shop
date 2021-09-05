/*
  * @Description:
  * @version:
  * @Author: zshist
  * @2021-8-31 15:06:23
*/
import ajax from './ajax'
import {
  ResponseValue,
  loginData,
  MenusData,
  UsersData,
  Users
} from './Data'
import { Meta } from './Meta'
import { ReqMethodEnum } from './ReqMethodEnum'
/*
  * @name: reqLogin
  * @test: test font
  * @msg: 登录接口
  * @param: {string}username
  * @param: {string}password
  * @return: {*}
*/
export const reqLogin = (username: string, password: string): Promise<ResponseValue<loginData, Meta>> =>
  ajax<ResponseValue<loginData, Meta>>('/login', { username, password }, ReqMethodEnum.POST)
/*
  * @name: reqMenus
  * @test: test font
  * @msg: 左侧菜单权限
  * @return: {*}
*/
export const reqUsers = (query:string, pagenum:number, pagesize: number ): Promise<ResponseValue<UsersData<Users>, Meta>> => ajax('/users', {query, pagenum, pagesize},ReqMethodEnum.GET)

/*
  * @name: reqMenus
  * @test: test font
  * @msg: 左侧菜单权限
  * @return: {*}
*/
export const reqMenus = (): Promise<ResponseValue<MenusData<MenusData<[]>> ,Meta>> =>
  ajax<ResponseValue<MenusData<MenusData<[]>> ,Meta>>('/menus', ReqMethodEnum.GET)
