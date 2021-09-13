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
  RightsListData,
  RightTreeData,
  FinalRightData,
  MenusData,
  RolesData,
  RoleData,
  FinalRoleData,
  AddRolesData,
  CategoriesData,
  FinalCategoriesData,
  AddCategoriesData,
  CategoriesListData,
  GoodsData,
  GoodsListData,
  Pics,
  Attrs,
  AddGoodsData,
  UploadData,
  OrdersData,
  OrderData,
  GoodsState,
  KuaidiData,
  ReportsData
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
  ajax<ResponseValue<UsersData<Users>, Meta>>('/users', { query, pagenum, pagesize }, ReqMethodEnum.GET)

export const reqAddUsers = (username: string, password: string, email: string, mobile: string): Promise<ResponseValue<AddUsersData, Meta>> =>
  ajax<ResponseValue<AddUsersData, Meta>>('/users', { username, password, email, mobile }, ReqMethodEnum.POST)

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

export const reqRights = (type: string): Promise<ResponseValue<RightsListData, Meta>> | Promise<ResponseValue<RightTreeData<RightTreeData<FinalRightData>>, Meta>> => {
  switch(type){
    case 'list':
      return ajax<ResponseValue<RightsListData, Meta>>(`/rights/${type}`, ReqMethodEnum.GET)
    case 'tree':
      return ajax<ResponseValue<RightTreeData<RightTreeData<FinalRightData>>, Meta>>(`/rights/${type}`, ReqMethodEnum.GET)
    default:
      return ajax<ResponseValue<RightsListData, Meta>>(`/rights/list`, ReqMethodEnum.GET)
  } 
}
  
/*
  * @name: reqMenus
  * @test: test font
  * @msg: 左侧菜单权限
  * @return: {*}
*/
export const reqMenus = (): Promise<ResponseValue<MenusData<MenusData<[]>> ,Meta>> =>
  ajax<ResponseValue<MenusData<MenusData<[]>> ,Meta>>('/menus', ReqMethodEnum.GET)

export const reqRoles = (): Promise<ResponseValue<RolesData<RoleData<RoleData<FinalRoleData>>>, Meta>> =>
  ajax<ResponseValue<RolesData<RoleData<RoleData<FinalRoleData>>>, Meta>>('/roles', ReqMethodEnum.GET)

export const reqAddRoles = (roleName: string, roleDesc: string): Promise<ResponseValue<AddRolesData ,Meta>> =>
  ajax<ResponseValue<AddRolesData ,Meta>>('/roles', { roleName, roleDesc }, ReqMethodEnum.POST)

export const reqRolesById = (id: number): Promise<ResponseValue<AddRolesData ,Meta>> =>
  ajax<ResponseValue<AddRolesData ,Meta>>(`/roles/${id}`, ReqMethodEnum.GET)

export const reqEditRoles = (id: number, roleName: string, roleDesc: string): Promise<ResponseValue<AddRolesData ,Meta>> =>
ajax<ResponseValue<AddRolesData ,Meta>>(`/roles/${id}`, { roleName, roleDesc },ReqMethodEnum.PUT)

export const reqDeleteRoles = (id: number): Promise<ResponseValue<null, Meta>> =>
  ajax<ResponseValue<null, Meta>>(`/roles/${id}`, ReqMethodEnum.DELETE)

export const reqRolesToRights = (roleId: number, Rids: number): Promise<ResponseValue<null, Meta>> =>
  ajax<ResponseValue<null, Meta>>(`/roles/${roleId}/rights`, {Rids}, ReqMethodEnum.POST)

export const reqDeleteRoleIdByRightId = (roleId: number, rightId: number): Promise<ResponseValue<RoleData<RoleData<FinalRoleData>>, Meta>> =>
  ajax<ResponseValue<RoleData<RoleData<FinalRoleData>>, Meta>>(`/roles/${roleId}/rights/${rightId}`, ReqMethodEnum.DELETE)

export const reqCategories = (query: string, pagenum: number, pagesize: number): Promise<ResponseValue<CategoriesData<CategoriesData<FinalCategoriesData>>, Meta>> =>
  ajax<ResponseValue<CategoriesData<CategoriesData<FinalCategoriesData>>, Meta>>('/categories', { query, pagenum, pagesize },ReqMethodEnum.GET)

export const reqAddCategories = (): Promise<ResponseValue<AddCategoriesData, Meta>> => 
  ajax<ResponseValue<AddCategoriesData, Meta>>('/categories', ReqMethodEnum.POST)

export const reqCategoriesById = (id: number): Promise<ResponseValue<AddCategoriesData, Meta>> =>
  ajax<ResponseValue<AddCategoriesData, Meta>>(`/categories/${id}`, ReqMethodEnum.GET)

export const reqEditCategories = (id: number): Promise<ResponseValue<AddCategoriesData, Meta>> =>
  ajax<ResponseValue<AddCategoriesData, Meta>>(`/categories/${id}`, ReqMethodEnum.PUT)

export const reqDeleteCategories = (id: number): Promise<ResponseValue<null, Meta>> =>
  ajax<ResponseValue<null, Meta>>(`/categories/${id}`, ReqMethodEnum.DELETE)

export const reqCategoriesParams = (id: number, sel: string): Promise<ResponseValue<CategoriesListData, Meta>> =>
  ajax<ResponseValue<CategoriesListData, Meta>>(`/categories/${id}/attributes`, {sel}, ReqMethodEnum.GET)

export const reqAddCategoriesParams = (id: number, attr_name: string, attr_sel: string, attr_vals: string): Promise<ResponseValue<CategoriesListData, Meta>> =>
  ajax<ResponseValue<CategoriesListData, Meta>>(`/categories/${id}/attributes`, { attr_name, attr_sel, attr_vals }, ReqMethodEnum.POST)

export const reqDeleteCategoriesParams = (id: number, attrid: number): Promise<ResponseValue<null, Meta>> =>
  ajax<ResponseValue<null, Meta>>(`/categories/${id}/attributes/${attrid}`, ReqMethodEnum.DELETE)

export const reqCategoriesParamsById = (id: number, attrId: number, attr_sel: string, attr_vals: string): Promise<ResponseValue<CategoriesListData, Meta>> =>
  ajax<ResponseValue<CategoriesListData, Meta>>(`/categories/${id}/attributes/${attrId}`,{ attr_sel, attr_vals }, ReqMethodEnum.GET)

export const reqEditCategoriesParams = (id: number, attrId: number, attr_sel: string, attr_vals: string): Promise<ResponseValue<CategoriesListData, Meta>> =>
  ajax<ResponseValue<CategoriesListData, Meta>>(`/categories/${id}/attributes/${attrId}`,{ attr_sel, attr_vals }, ReqMethodEnum.PUT)

export const reqGoods = (query: string, pagenum: number, pagesize: number): Promise<ResponseValue<GoodsData<GoodsListData>, Meta>> =>
  ajax<ResponseValue<GoodsData<GoodsListData>, Meta>>('/goods', { query, pagenum, pagesize }, ReqMethodEnum.GET)

export const reqAddGoods = (goods_name: string, goods_cat: string, goods_price: number, goods_number: number, goods_weight: number, goods_introduce: string, pics: Pics, attrs: Attrs): Promise<ResponseValue<AddGoodsData, Meta>> =>
  ajax<ResponseValue<AddGoodsData, Meta>>('/goods', { goods_name, goods_cat, goods_price, goods_number, goods_weight, goods_introduce, pics, attrs }, ReqMethodEnum.POST)

export const reqGoodsById = (id: number): Promise<ResponseValue<AddGoodsData,Meta>> =>
  ajax<ResponseValue<AddGoodsData,Meta>>(`/goods/${id}`, ReqMethodEnum.GET)

export const reqEditGoods = (id: number, goods_name: string, goods_price: number, goods_number: number, goods_weight: number, goods_introduce: string, pics: Pics, attrs: Attrs): Promise<ResponseValue<AddGoodsData, Meta>> =>
  ajax<ResponseValue<AddGoodsData, Meta>>(`/goods/${id}`, { goods_name, goods_price, goods_number, goods_weight, goods_introduce, pics, attrs }, ReqMethodEnum.PUT)

export const reqDeleteGoods = (id: number): Promise<ResponseValue<null, Meta>> =>
  ajax<ResponseValue<null, Meta>>(`/goods/${id}`, ReqMethodEnum.DELETE)

export const reqGoodsPics = (id: number, pics: string): Promise<ResponseValue<AddGoodsData, Meta>> =>
  ajax<ResponseValue<AddGoodsData, Meta>>(`/goods/${id}/pics`, { pics }, ReqMethodEnum.PUT)

export const reqGoodsParams = (id: number) =>
  ajax<ResponseValue<AddGoodsData, Meta>>(`/goods/${id}`, ReqMethodEnum.PUT)

export const reqUpload = (file: any): Promise<ResponseValue<UploadData, Meta>> =>
  ajax<ResponseValue<UploadData, Meta>>('/upload', { file },ReqMethodEnum.POST)

export const reqOrders = (query: string, pagenum: number, pagesize: number): Promise<ResponseValue<OrdersData<OrderData>, Meta>> =>
  ajax<ResponseValue<OrdersData<OrderData>, Meta>>('/orders', { query, pagenum, pagesize }, ReqMethodEnum.GET)

export const reqEditOrdersState = (id: number, is_send: string, order_pay: string, order_price: number, order_number: number, pay_status: string): Promise<ResponseValue<GoodsState, Meta>> =>
  ajax<ResponseValue<GoodsState, Meta>>(`/orders/${id}`, { is_send, order_pay, order_price, order_number, pay_status }, ReqMethodEnum.PUT)

export const reqOrdersById = (id: number): Promise<ResponseValue<GoodsState, Meta>> =>
  ajax<ResponseValue<GoodsState, Meta>>(`/orders/${id}`, ReqMethodEnum.GET)

export const reqKuaidi = (): Promise<ResponseValue<KuaidiData, Meta>> =>
  ajax<ResponseValue<KuaidiData, Meta>>(`/kuaidi/804909574412544580`, ReqMethodEnum.GET)

export const reqReports = (): Promise<ResponseValue<ReportsData, Meta>> =>
  ajax('/reports/type/1', ReqMethodEnum.GET)