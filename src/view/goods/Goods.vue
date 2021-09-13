<template lang='pug'>
el-breadcrumb(sparator-class='el-icon-arrow-right')
  el-breadcrumb-item(:to="{path: '/home'}") 首页
  el-breadcrumb-item 商品管理
  el-breadcrumb-item 商品列表
el-card
  el-row(:gutter='20')
    el-col(:span='8')
      el-input(placeholder='请输入内容' v-model='queryInfo.query' clearable @clear='getGoodsList')
        template(#append)
          el-button(icon='el-icon-search' @click='getGoodsList')
    el-col(:span='4')
      el-button(type='primary' @click='goAddPage') 添加商品
  el-table(:data='goodsList' border scripe)
    el-table-column(type='index')
    el-table-column(label='商品名称' prop='goods_name')
    el-table-column(label='商品价格(元)' prop='goods_price' width='95px')
    el-table-column(label='商品重量' prop='goods_weight' width='70px')
    el-table-column(label='创建时间' prop='add_time' width='140px')
      template(#default='scope') {{ addTime }}
    el-table-column(label='操作' width='130px')
      template(#default='scope')
        el-button(type='primary' icon='el-icon-edit' size='mini')
        el-button(type='danger' icon='el-icon-delete' size='mini' @click='removeById(scope.row.goods_id)')
  el-pagination(@size-change='handleSizeChange' @current-change='handleCurrentChange' :current-page='queryInfo.pagenum' :page-sizes='[5, 10, 15, 20]' :page-size='queryInfo.pagesize' layout='total, sizes, prev, pager, next, jumper' :total='total' background)
</template>

<script setup lang='ts'>
import { ref, computed } from 'vue'
import {
  reqGoods,
  reqDeleteGoods
} from '../../api/index'
import useCurrentInstance from '../../utils/useCurrentInstance'
import { filterTime } from '../../utils/dayjs'
const { proxy } = useCurrentInstance()
let queryInfo = ref({
  query: '',
  pagenum: 1,
  pagesize: 10
}),
goodsList: any = ref([]),
total = ref(0)
const addTime = computed(() => {
  return filterTime(goodsList.value.add_time)
})
const getGoodsList = async () => {
  const result = await reqGoods(queryInfo.value.query, queryInfo.value.pagenum, queryInfo.value.pagesize)
  if(result.meta.status !== 200){
    return proxy.$message.error(result.meta.msg)
  }
  proxy.$message.success(result.meta.msg)
  console.log(result.data)
  goodsList.value = result.data.goods
  total.value = result.data.total
}
const handleSizeChange = (newSize: number) => {
  queryInfo.value.pagesize = newSize
  getGoodsList()
}
const handleCurrentChange = (newPage: number) => {
  queryInfo.value.pagenum = newPage
}
const removeById = async (id: number) => {
  const confirmResult = await proxy.$confirm('此操作将永久删除该商品，是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).catch((err: Error )=> err)
  if(confirmResult !== 'confirm'){
    return proxy.$message.info('已经取消删除!')
  }
  const result = await reqDeleteGoods(id)
  if(result.meta.status !== 200){
    return proxy.$message.error(result.meta.msg)
  }
  proxy.$message.success(result.meta.msg)
  getGoodsList()
}
const goAddPage = () => {
  proxy.$router.push('/goods/add')
}
getGoodsList()
</script>

<style lang='less'>
  
</style>