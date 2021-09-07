<template lang='pug'>
el-breadcrumb(separator-class='el-icon-arrow-right')
  el-breadcrumb-item(:to='{path: "/home"}') 首页
  el-breadcrumb-item 权限管理
  el-breadcrumb-item 权限列表
el-card
  el-table(:data='rightsList' border stripe)
    el-table-column(type='index' label='#')
    el-table-column(prop='authName' label='权限名称')
    el-table-column(prop='path' label='路径')
    el-table-column(prop='level' label='权限等级')
      template(#default='scope')
        el-tag(v-if='scope.row.level === "0"') 一级
        el-tag(type='success' v-else-if='scope.row.level === "1"') 二级
        el-tag(type='warning' v-else) 三级
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { reqRights } from '../../api/index'
import useCurrentInstance from '../../utils/useCurrentInstance'
const { proxy } = useCurrentInstance()
let rightsList: any = ref([])
const getRightsList = async () => {
  const result = await reqRights('list')
  if(result.meta.status !== 200){
    return proxy.$message.error(result.meta.msg)
  }
  proxy.$message.success(result.meta.msg)
  rightsList.value = result.data
  console.log(rightsList)
}
getRightsList()
</script>

<style lang='less'>
  
</style>