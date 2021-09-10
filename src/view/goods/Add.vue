<template lang='pug'>
el-breadcrumb(separator-class='el-icon-arrow-right')
  el-breadcrumb-item(:to="{path: '/home'}")
  el-breadcrumb-item 商品管理
  el-breadcrumb-item 添加商品
el-card
  el-alert(title='添加商品信息' type='info' center show-icon :closable='false')
  el-steps(:space='200' :active='activeIndex - 0' finish-status='success' align-center)
    el-step(title='基本信息')
    el-step(title='商品参数')
    el-step(title='商品属性')
    el-step(title='商品图片')
    el-step(title='商品内容')
    el-step(title='完成')
  el-form(:model='addForm')
</template>

<script setup lang='ts'>
import _ from 'lodash'
import { ref } from 'vue'
import { reqCategories } from '../../api/index'
let activeIndex = ref(0),
addForm = ref({
  goods_name: '',
  goods_price: 0,
  goods_weight: 0,
  goods_number: 0,
  goods_cat: [],
  pics: [],
  goods_introduce: '',
  attrs: []
}),
addFormRules = ref({
  goods_name: [{ required: true, message: '请输入商品名', trigger: 'blur' }],
  goods_price: [{ required: true, message: '请输入商品价格', trigger: 'blur' }],
  goods_weight: [{ required: true, message: '请输入商品重量', trigger: 'blur' }],
  goods_number: [{ required: true, message: '请输入商品数量', trigger: 'blur' }],
  goods_cat: [{ required: true, message: '请输入商品分类', trigger: 'blur' }]
}),
catelist = ref([]),
cateProps = ref({
  label: 'cate_name',
  value: 'cate_id',
  children: 'children'
}),
manyTableData = ref([]),
onlyTableData = ref([]),
uploadURL = ref('http://127.0.0.1:8888/api/private/v1/upload'),
headerObj = ref({
  Authorization: sessionStorage.getItem('token')
}),
previewPath = ref(''),
previewVisible = ref(false)
const getCateList = async () => {
  // const result = await reqCategories()
}
getCateList()

  
</script>

<style lang='less'>
  
</style>