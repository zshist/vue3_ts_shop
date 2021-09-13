<template lang="pug">
el-breadcrumb(separator-class='el-icon-arrow-right')
  el-breadcrumb-item(:to='{path: "/home"}') 首页
  el-breadcrumb-item 订单管理
  el-breadcrumb-item 订单列表
el-card
  el-row(:gutter='20')
    el-col(:span='8')
    el-input(placeholder="请输入内容")
      template(#append)
        el-button(icon='el-icon-search')
  el-table(:data='orderList' border stripe)
    el-table-column(type='index')
    el-table-column(label='订单编号', prop='order_number')
    el-table-column(label='订单价格' prop='order_price')
    el-table-column(label='是否付款' prop='pay_status')
      template(#default='scope')
        el-tag(type='success' v-if='scope.row.pay_status === "1"') 已付款
        el-tag(type='danger' v-else) 未付款
    el-table-column(label='是否发货' prop='is_send')
     template(#default='scope') {{scope.row.is_send}}
    el-table-column(label='下单时间' prop='create_time')
      template(#default='scope') {{createTime}}
    el-table-column(label='操作')
      template(#default='scope')
        el-button(size='mini' type='primary' icon='el-icon-edit' @click='addressDialogVisible=true')
        el-button(size='mini' type='success' icon='el-icon-location' @click='showProgressBox')
  el-pagination(@size-change='handleSizeChange' @current-change='handleCurrentChange' :current-page='queryInfo.pagenum' :page-sizes='[5,10,15]' :page-size='queryInfo.pagesize' layout='total, sizes, prev, pager, next, jumper' :total='total')
el-dialog(title='修改地址' v-model='addressDialogVisible' width='50%' @close='addressDialogClosed')
  el-form(:model='addressForm' :rules='addressFormRules' ref='addressFormRef' label-width='100px')
    el-form-item(label='省市区/县' prop='address1')
      el-cascader(:options='cityData' v-model='addressForm.address1')
    el-form-item(label='详细地址' prop='address2')
      el-input(v-model='addressForm.address2')
  template(#footer)
    .dialog_footer
      el-button(@click='addressDialogVisible=false') 取消
      el-button(type='primary' @click='addressDialogVisible=false') 确定
el-dialog(title='物流进度' v-model='progressDialogVisible' width='50%')
  el-timeline
    el-timeline-item(v-for='(activity, index) in progressInfo' :key='index' :timestamp='activity.time') {{activity.context}}
</template>

<script lang="ts" setup>
import cityData from './citydata'
import { ref, toRefs, computed } from 'vue'
import { reqOrders, reqKuaidi } from '../../api'
import useCurrentInstance from '../../utils/useCurrentInstance'
import { filterTime } from '../../utils/dayjs'
const { proxy } = useCurrentInstance()
let queryInfo = ref({
  query: '',
  pagenum: 1,
  pagesize: 10
}),
total = ref(0),
orderList: any = ref([]),
addressDialogVisible = ref(false),
addressForm = ref({
  address1: [],
  address2: ''
}),
addressFormRules = ref({
  address1 : [{ required: true, message: '请选择省市区县', trigger: 'blur' }],
  address2: [{ required: true, message: '请填写详细地址', trigger: 'blur' }]
}),
progressDialogVisible = ref(false),
progressInfo: any = ref([])
const createTime = computed(() => {
  return filterTime(orderList.value.create_time)
})
const addressFormRef = ref()
const getOrderList = async () => {
  const { query, pagenum, pagesize } = toRefs(queryInfo.value)
  const result = await reqOrders(query.value, pagenum.value, pagesize.value)
  if(result.meta.status !== 200){
    return proxy.$message.error(result.meta.msg)
  }
  console.log(result)
  total.value = result.data.total
  orderList.value = result.data.goods
  console.log(orderList)
}
const handleSizeChange = (newSize: number) => {
  queryInfo.value.pagesize = newSize
  getOrderList()
}
const handleCurrentChange = (newPage: number) => {
  queryInfo.value.pagenum = newPage
  getOrderList()
}
const addressDialogClosed = () => {
  addressFormRef.value.resetFields()
}
const showProgressBox = async () => {
  const result = await reqKuaidi()
  if(result.meta.status !== 200){
    return proxy.$message.error(result.meta.msg)
  }
  progressInfo.value = result.data
  progressDialogVisible.value = true
}
getOrderList()
</script>

<style lang='less' scoped>

@import '../../plugins/timeline/timeline.css';
@import '../../plugins/timeline-item/timeline-item.css';
.el-cascader{
  width: 100%;
}
</style>