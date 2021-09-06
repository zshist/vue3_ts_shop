/*
  * @Description:
  * @version:
  * @Author: zshist
  * @2021-8-31 15:06:23
*/
import ajax from './ajax'
import {
  ResponseValue,
  LoginData,
  UsersData,
  Users,
  AddUsersData,
  UserStateData,
  UserByIdData,
  EditUsersData,
  RoleIdData,
  MenusData,
  RolesData,
  RoleData,
  FinalRoleData
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
export const reqLogin = (username: string, password: string): Promise<ResponseValue<LoginData, Meta>> =>
  ajax<ResponseValue<LoginData, Meta>>('/login', { username, password }, ReqMethodEnum.POST)
/*
  * @name: reqUsers
  * @test: test font
  * @msg: 用户数据列表
  * @return: {*}
*/
export const reqUsers = (query:string, pagenum:number, pagesize: number ): Promise<ResponseValue<UsersData<Users>, Meta>> =>
  ajax<ResponseValue<UsersData<Users>, Meta>>('/users', {query, pagenum, pagesize},ReqMethodEnum.GET)

export const reqAddUsers = (username: string, password: string, email: string, mobile: string): Promise<ResponseValue<AddUsersData, Meta>> =>
  ajax<ResponseValue<AddUsersData, Meta>>('/users', { username, password, email, mobile },ReqMethodEnum.POST)

export const reqEditUserState = (uid: number, type: boolean): Promise<ResponseValue<UserStateData ,Meta>> =>
  ajax<ResponseValue<UserStateData, Meta>>(`/users/${uid}/state/${type}`, ReqMethodEnum.PUT)

export const reqUsersById = (id: number): Promise<ResponseValue<UserByIdData, Meta>> =>
  ajax<ResponseValue<UserByIdData, Meta>>(`/users/${id}`, ReqMethodEnum.GET)

export const reqEditUsers = (id: number, email: string, mobile: string): Promise<ResponseValue<EditUsersData ,Meta>> =>
  ajax<ResponseValue<EditUsersData, Meta>>(`/users/${id}`, { email, mobile },ReqMethodEnum.PUT)

export const reqDeleteUsers = (id: number): Promise<ResponseValue<null, Meta>> =>
  ajax<ResponseValue<null, Meta>>(`/users/${id}`, ReqMethodEnum.DELETE)

export const reqUserToRole = (id: number, rid: string): Promise<ResponseValue<RoleIdData, Meta>> =>
  ajax<ResponseValue<RoleIdData, Meta>>(`/users/${id}/role`, { rid }, ReqMethodEnum.PUT)

export const reqRights = () => {}

/*
  * @name: reqMenus
  * @test: test font
  * @msg: 左侧菜单权限
  * @return: {*}
*/
export const reqMenus = (): Promise<ResponseValue<MenusData<MenusData<[]>> ,Meta>> =>
  ajax<ResponseValue<MenusData<MenusData<[]>> ,Meta>>('/menus', ReqMethodEnum.GET)

export const reqRoles = (): Promise<ResponseValue<RolesData<RoleData<RoleData<RoleData<FinalRoleData>>>>, Meta>> =>
  ajax<ResponseValue<RolesData<RoleData<RoleData<RoleData<FinalRoleData>>>>, Meta>>('/roles', ReqMethodEnum.GET)

export const reqAddRoles = () => {}

export const reqRolesById = () => {}

export const reqEditRoles = () => {}

export const reqDeleteRoles = () => {}

export const reqRolesToRights = () => {}

export const reqDeleteRoleIdByRightId = () => {}

export const reqCategories = () => {}

export const reqAddCategories = () => {}

export const reqCategoriesById = () => {}

export const reqEditCategories = () => {}

export const reqDeleteCategories = () => {}

export const reqCategoriesParams = () => {}

export const reqAddCategoriesParams = () => {}

export const reqDeleteCategoriesParams = () => {}

export const reqDeleteCategoriesParamsById = () => {}

export const reqEditCategoriesParams = () => {}

export const reqGoods = () => {}

export const reqAddGoods = () => {}

export const reqGoodsById = () => {}

export const reqEditGoods = () => {}

export const reqDeleteGoods = () => {}

export const reqGoodsPics = () => {}

export const reqGoodsParams = () => {}

export const reqUpload = () => {}

export const reqOrders = () => {}

export const reqEditOrders = () => {}

export const reqOrdersById = () => {}

export const reqKuaidi = () => {}

export const reqReports = () => {}