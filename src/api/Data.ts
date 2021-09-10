/*
  * @Description:
  * @version:
  * @Author: zshist
  * @Date: 2021-8-31 11:42:54
*/

// 自定义返回类型
export interface ResponseValue<T, K> {
  data: T
  meta: K
}

export interface LoginData{
  id: number
  rid: number
  username: string
  mobile: string
  email: string
  token: string
}

export interface UsersData<T>{
  total: number
  pagenum: number
  users: T
}

export interface Users{
  id: number
  username: string
  mobile: string
  type: number
  email: string
  create_time: string
  mg_state: boolean
  role_name: string
}

export interface AddUsersData{
  id: number
  username: string
  mobile: string
  type: number
  openid: string
  email: string
  create_time: string
  modify_time: null
  is_delete: boolean
  is_active: boolean
}

export interface UserStateData{
  id: number
  rid: number
  username: string
  mobile: string
  email: string
  mg_state: number
}

export interface UserByIdData{
  id: number
  username: string
  role_id: number
  mobile: string
  email: string
}

export interface EditUsersData{
  id: number
  username: string
  role_id: number
  mobile: string
  email: string
}

export interface RoleIdData{
  id: number
  rid: string
  username: string
  mobile: string
  email: string
}

export interface RightsListData{
  id: number
  authName: string
  level: string
  pid: number
  path: string | null
}

export interface RightTreeData<T>{
  id: number
  authName: string
  path: string | null
  pid: number
  children: T
}

export interface FinalRightData{
  id: number
  authName: string
  path: string | null
  pid: number
}

export interface MenusData<T>{
  id: number
  authName: string
  path: null | string
  children: T
}

export interface RolesData<T>{
  id: number
  roleName: string
  roleDesc: string
  children: T
}
export interface RoleData<T>{
  id: number
  authName: string
  path: null | string
  children: T
}

export interface FinalRoleData{
  id: number
  authName: string
  path: null | string
}

export interface AddRolesData{
  roleId: number
  roleName: string
  roleDesc: string
}

export interface CategoriesData<T>{
  cat_id: number
  cat_name: string
  cat_pid: number
  cat_level: number
  cat_deleted: boolean
  children: T
}

export interface FinalCategoriesData{
  cat_id: number
  cat_name: string
  cat_pid: number
  cat_level: number
  cat_deleted: boolean
}

export interface AddCategoriesData{
  cat_id: number
  cat_name: string
  cat_pid: string
  cat_level: string
}

export interface CategoriesListData{
  attr_id: number
  attr_name: string
  cat_id: number
  attr_sel: string
  attr_write: string
  attr_vals: string
}

export interface GoodsData<T>{
  total: number
  pagenum: string
  goods: T
}

export interface GoodsListData{
  goods_id: number
  goods_name: string
  good_price: number
  goods_number: number
  goods_weight: number
  goods_state: null
  add_time: number
  upd_time: number
  hot_number: number
  is_promote: boolean,
}

export interface Pics{
  pic: string
}
export interface Attrs{
  attr_id: number
  attr_value: string
}

export interface PicsData{
  pics_id: number
  goods_id: number
  pics_big: string
  pics_mid: string
  pics_sma: string
}

export interface AddGoodsData{
  goods_id: number,
  goods_name: string,
  goods_price: number,
  cat_id?: number,
  goods_number: number,
  goods_weight: number,
  goods_introduce: string,
  goods_big_logo: string,
  goods_small_logo: string,
  goods_state: number,
  add_time: number
  upd_time: number
  hot_mumber: number
  is_promote: boolean
  pics: PicsData,
  attrs: AttrsData
}

export interface AttrsData{
  goods_id: number
  attr_id: number
  attr_value: string
  add_price: null
  attr_name: string
  attr_sel: string
  attr_write: string
  attr_vals: string
}

export interface UploadData{
  tmp_path: string
  url: string
}

export interface OrdersData<T>{
  total: number
  pagenum: string
  goods: T
}

export interface OrderData{
  order_id: number
  user_id: number
  order_number: string
  order_price: number
  order_pay: string
  is_send: string
  trade_no: string
  order_fapiao_title: string
  order_fapiao_company: string
  order_fapiao_content: string
  consignee_addr: string
  pay_status: string
  create_time: string
  update_time: string
}

export interface GoodsState{
  order_id: number
  user_id: number
  order_number: string
  order_price: number
  order_pay: string
  is_send: string
  trade_no: string
  order_fapiao_title: string,
  order_fapiao_company: string
  order_fapiao_content: string
  consignee_addr: string
  pay_status: string
  create_time: number
  update_time: number
  goods: goods
}

export interface goods{
  id: string
  order_id: number
  goods_id: number
  goods_price: number
  goods_total_price: number
}

export interface KuaidiData{
  time: string
  ftime: string
  context: string
  location: string
}

export interface ReportsData{
  options: {
    title: {
      text: string
    },
    tooltip: {
      trigger: string
      axisPointer: {
        type: string
        label: {
          backgroundColor: string
        }
      }
    },
    grid: {
      left: string,
      right: string
      bottom: string
      containLabel: boolean
    },
    xAxis: [
      {
        boundaryGap: boolean
      }
    ],
    yAxis: [
      {
        type: string
      }
    ]
  }
}