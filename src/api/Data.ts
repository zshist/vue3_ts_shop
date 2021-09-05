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

export interface loginData{
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

export interface userStateData{
  id: number
  rid: number
  username: string
  mobile: string
  email: string
  mg_state: number
}

export interface userByIdData{
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
}

export interface roleIdData{
  id: number
  rid: string
  username: string
  mobile: string
  email: string
}

export interface rightsListData{
  id: number
  authName: string
  level: string
  pid: number
  path: string | null
}

export interface rightTreeData<T>{
  id: number
  authName: string
  path: string | null
  pid: number
  children?: T
}

export interface MenusData<T>{
  id: number
  authName: string
  path: null
  children: T
}

export interface rolesData<T>{
  id: number
  roleName: string
  roleDesc: string
  children: T
}

export interface AddRoles{
  roleId: number
  roleName: string
  roleDesc: string
}

export interface categoriesData<T>{
  cat_id: number
  cat_name: string
  cat_pid: number
  cat_level: number
  cat_deleted: boolean
  children: T
}

export interface AddCategoriesData{
  cat_id: number
  cat_name: string
  cat_pid: string
  cat_level: string
}

export interface categoriesListData{
  attr_id: number
  attr_name: string
  cat_id: number
  attr_sel: string
  attr_write: string
  attr_vals: string
}

export interface goodsData<T>{
  total: number
  pagenum: string
  goods: T
}

export interface goodsListData{
  goods_id: number
  goods_name: string
  good_price: number
  goods_number: number
  goods_weight: number
  goods_state: null
  add_time: number
  upd_time: number
  hot_number: number
  is_promote: boolean
}

export interface AddGoods{
  goods_name: string
  goods_cat: string
  goods_price: number
  goods_number: number
  goods_weight: number
  goods_introduce: string
  pics: [pic: string, attrs: [attr_id: number, attr_value: string]]
}

export interface PicsData{
  pics_id: number
  goods_id: number
  pics_big: string
  pics_mid: string
  pics_sma: string
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

export interface GoodsPicsData<T>{
  goods_id: number
  goods_name: string
  goods_price: number
  goods_weight: number
  goods_introduce: null
  goods_big_logo: string
  goods_small_logo: string
  goods_state: number
  is_del: string
  add_time: number
  upd_time: number
  delete_time: number
  hot_number: number
  is_promote: boolean
  pics: T
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
  id: number
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