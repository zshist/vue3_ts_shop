<template lang='pug'>
el-breadcrumb(separator-class='el-icon-arrow-right')
  el-breadcrumb-item(:to='{path: "/home"}') 首页
  el-breadcrumb-item 权限管理
  el-breadcrumb-item 角色列表
el-card
  el-row
    el-col
      el-button(type='primary' @click='addRoleDialogVisible=true') 添加角色
  el-table(:data='roleList' border stripe)
    el-table-column(type='expand')
      template(#default='scope')
        el-row(:class="['bdbottom', index === 0? 'bdtop': '', 'vcenter']" v-for='(item, index) in scope.row.children' :key='item.id')
          el-col(:span='5')
            el-tag(closable @close='removeRightById(scope.row, item.id)') {{item.authName}}
          el-col(:span='19')
            el-row(:class="[index1 === 0? '': 'bdtop', 'vcenter']" v-for='(item1, index1) in item.children' :key='item1.id')
              el-col(:span='6')
                el-tag(closable type='success' @close='removeRightById(scope.row, item1.id)') {{item1.suthName}}
                i(class='el-icon-caret-right')
              el-col(:span='18')
                el-tag(closable type='warning' v-for='item2 in item1.children' :key='item2.id' @close='removeRightById(scope.row, item2.id)') {{item2.authName}}
    el-table-column(type='index')
    el-table-column(prop='roleName' label='角色名称')
    el-table-column(prop='roleDesc' label='角色描述')
    el-table-column(label='操作' width='300px')
      template(#default='scope')
        el-button(type='primary' icon='el-icon-edit' size='mini' @click='showEditRoleDialog(scope.row.id)') 编辑
        el-button(type='danger' icon='el-icon-delete' size='mini' @click='removeRoleById(scope.row.id)') 删除
        el-tooltip(effect='dark' content='分配角色' placement='top' :enterable='false')
          el-button(type='warning' icon='el-icon-setting' size='mini' @click='showSetRightDialog(scope.row)')
el-dialog(title='添加角色' v-model='addRoleDialogVisible' width='50%' @close='addRoleDialogClosed')
  el-form(:model='addRoleForm' ref='addRoleFormRef' :rules='addRoleFormRules' label-width='70px')
    el-form-item(label='角色名称' prop='roleName')
      el-input(v-model='addRoleForm.roleName')
    el-form-item(label='角色描述' prop='roleDesc')
      el-input(v-model='addRoleForm.roleDesc')
  template(#footer)
    el-button(@click='addRoleDialogVisible=false') 取消
    el-button(type='primary' @click='addRole') 确定
el-dialog(title='修改角色' v-model='editRoleDialogVisible' width='50%' @close='editRoleDialogClosed')
  el-form(:model='editRoleForm' :rules='editRoleFormRules' ref='editRoleFormRef' label-width='70px')
    el-form-item(label='角色名称' prop='roleName')
      el-input(v-model='editRoleForm.roleName' disabled)
    el-form-item(label='角色描述' prop='roleDesc')
      el-input(v-model='editRoleForm.roleDesc')
  template(#footer)
    el-button(@click='editRoleDialogVisible=false') 取消
    el-button(type='primary' @click='editRoleInfo()') 确定
el-dialog(title='分配权限' v-model='setRightDialogVisible' width='50%' @close='setRightDialogClosed')
  el-tree(:data='rightsList' :props='TreeProps' ref='treeRef' show-checkbox node-key='id' default-expand-all :default-checked-keys='defKeys' highlight-current)
  template(#footer)
    el-button(@click='setRightDialogVisible=false') 取消
    el-button(type='primary' @click='allotRights') 确定

</template>

<script setup lang='ts'>
import { ref } from 'vue'
import {
  reqRoles,
  reqAddRoles,
  reqRolesById,
  reqEditRoles,
  reqDeleteRoles,
  reqRolesToRights,
  reqDeleteRoleIdByRightId,
reqRights,
reqUserToRole
} from '../../api/index'
import useCurrentInstance from '../../utils/useCurrentInstance'
const { proxy } = useCurrentInstance()
let roleList: any = ref([]),
setRightDialogVisible = ref(false),
rightsList: any = ref([]),
roleId = ref(''),
addRoleDialogVisible = ref(false),
addRoleFormRef = ref(),
editRoleDialogVisible = ref(false),
editRoleForm: any = ref({}),
editRoleFormRef = ref(),
TreeProps = ref({
  label: 'authName',
  children: 'children'
}),
defKeys = ref([]),
treeRef = ref()
const addRoleForm = ref({
  roleName: '',
  roleDesc: ''
})
const addRoleFormRules = ref({
  roleName: [
    { required: true, message: '请输入角色名称', trigger: 'blur' },
    { min: 3, max: 10, message: '用户名的长度在3~10个字符之间', trigger: 'blur' }
  ],
  roleDesc: [
    { required: true, message: '请输入角色描述', trigger: 'blur' },
    { min: 6, max: 15, message: '密码的长度在6~15个字符之间', trigger: 'blur' }
  ]
})
const editRoleFormRules = ref({
  roleName: [
    { required: true, message: '请输入角色名称', trigger: 'blur' }, 
    { min: 1, max: 10, message: '用户名的长度在1~10各字符之间', trigger: 'blur' }
  ],
  roleDesc: [
    { required: true, message: '请输入角色描述', trigger: 'blur' }, 
    { min: 1, max: 15, message: '密码的长度在1-15各字符之间', trigger: 'blur' }
  ]
})
const getRolesList = async () => {
  const result = await reqRoles()
  if(result.meta.status !== 200){
    return proxy.$message.error(result.meta.msg)
  }
  proxy.$message.success(result.meta.msg)
  roleList.value = result.data
  console.log(roleList)
}
const addRoleDialogClosed = () => {
  addRoleFormRef.value.resetFields()
}
const addRole = async () => {
  const result = await reqAddRoles(addRoleForm.value.roleName, addRoleForm.value.roleDesc)
  if(result.meta.status !== 200){
    return proxy.$message.error(result.meta.msg)
  }
  proxy.$message.success(result.meta.msg)
  addRoleDialogVisible.value = false
  getRolesList()
}
const showEditRoleDialog = async (id: number) => {
  const result = await reqRolesById(id)
  if(result.meta.status !== 200){
    return proxy.$message.error(result.meta.msg)
  }
  proxy.$message.success(result.meta.msg)
  editRoleForm.value = result.data
  editRoleDialogVisible.value = true
}
const editRoleInfo = async () => {
  const result = await reqEditRoles(editRoleForm.roleId, editRoleForm.roleName, editRoleForm.roleDesc)
  if(result.meta.status !== 200){
    return proxy.$message.error(result.meta.msg)
  }
  proxy.$message.success(result.meta.msg)
  editRoleDialogVisible.value = false
  getRolesList()
}
const editRoleDialogClosed = () => {
  editRoleFormRef.value.resetFields()
}
const removeRoleById = async (id: any) => {
  const confirmResult = await proxy.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).catch((err: any) => err)
  if(confirmResult !== 'confirm'){
    return proxy.$message.info('已取消删除')
  }
  const result = await reqDeleteRoles(id)
  if(result.meta.status !== 200){
    return proxy.$message.error(result.meta.msg)
  }
  proxy.$message.success(result.meta.msg)
  getRolesList()
}
const removeRightById = async (role: any, rightId: number) => {
  const confirmResult = await proxy.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).catch((err: any) => err)
  if(confirmResult !== 'confirm'){
    return proxy.$message.info('已取消删除')
  }
  const result = await reqDeleteRoleIdByRightId(role.id, rightId)
  if(result.meta.status !== 200){
    return proxy.$message.error(result.meta.msg)
  }
  proxy.$message.success(result.meta.msg)
  role.children = result.data
}
const showSetRightDialog = async (role: any) => {
  roleId.value = role.id
  const result = await reqRights('tree')
  if(result.meta.status !== 200){
    return proxy.$message.error(result.meta.msg)
  }
  proxy.$message.success(result.meta.msg)
  rightsList.value = result.data
  getLeafKeys(role, defKeys.value)
  setRightDialogVisible.value = true
}
const getLeafKeys = (node: { children: any; id: any }, arr: any[]) => {
  if(!node.children){
    return arr.push(node.id)
  }
  node.children.forEach((item: any) => getLeafKeys(item, arr))
}
const setRightDialogClosed = () => {
  defKeys.value = []
}
const allotRights = async () => {
  const keys = [
    ...treeRef.value.getCheckedKeys(),
    ...treeRef.value.getHalfCheckedKeys()
  ]
  const idStr = keys.join(',')
  const result = await reqUserToRole(+roleId.value, idStr)
  if(result.meta.status !== 200){
    return proxy.$message.error(result.meta.msg)
  }
  proxy.$message.success(result.meta.msg)
  getRolesList()
  setRightDialogVisible.value = false
}
getRolesList()
</script>

<style lang='less'>
.el-tag{
  margin: 7px;
}
.bdtop{
  border-top: 7px;
}
.bdbottom{
  border-bottom: 1px solid #eee;
}
.vcenter{
  display: flex;
  align-items: center;
}
</style>