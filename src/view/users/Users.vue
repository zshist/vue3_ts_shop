<template lang='pug'>
el-breadcrumb(separator-class='el-icon-arrow-right')
  el-breadcrumb-item(:to='{path: "/home"}') 首页
  el-breadcrumb-item 用户管理
  el-breadcrumb-item 用户列表
el-card
  el-row(:gutter='20')
    el-col(:span='8')
      el-input(placeholder='请输入内容' v-model='queryInfo.query'
      clearable @clear='getUserList')
        template(#append)
          el-button(icon='el-icon-search' @click='getUserList')
    el-col(:span='4')
      el-button(type='primary' @click='addDialogVisible = true') 添加用户
  el-table(:data='userList' border stripe)
    el-table-column(type='index' label='#')
    el-table-column(prop='username' label='名字')
    el-table-column(prop='email' label='邮箱')
    el-table-column(prop='mobile' label='电话')
    el-table-column(prop='role_name' label='角色')
    el-table-column(label='状态')
      template(#default='scope')
        el-switch(v-model='scope.row.mg_state' @change='userStateChanged(scope.row)')
    el-table-column(label='操作' width='180')
      template(#default='scope')
        el-button(type='primary' icon='el-icon-edit' size='mini' @click='showEditDialog(scope.row.id)')
        el-button(type='danger' icon='el-icon-delete' size='mini' @click='removeUserById(scope.row.id)')
        el-tooltip(effect='dark' content='分配角色' placement='top' :enterable='false')
          el-button(type='warning' icon='el-icon-setting' size='mini' @click='setRole(scope.row)')
  el-pagination(@size-change='handleSizeChange' @current-change='handleCurrentChange'
  v-model:currentPage='queryInfo.pagenum' :page-sizes='[1,2,5,10]' :page-size='queryInfo.pagesize'
  layout='total,sizes,prev,pager,next,jumper' :total='total')
el-dialog(title='添加用户' v-model='addDialogVisible', width='50%' @close='addDialogClosed')
  el-form(:model='addForm' :rules='addFormRules' ref='addFormRef')
    el-form-item(label='用户名' prop='username')
      el-input(v-model='addForm.username')
    el-form-item(label='密码' prop='password')
      el-input(v-model='addForm.password')
    el-form-item(label='邮箱' prop='email')
      el-input(v-model='addForm.email')
    el-form-item(label='手机' prop='mobile')
      el-input(v-model='addForm.mobile')
  template(#footer)
    el-button(@click='addDialogVisible = false') 取消
    el-button(type='primary' @click='addUser') 确定
el-dialog(title='修改用户' v-model='editDialogVisible' width='50%' @close='editDialogClosed')
  el-form(:model='editForm' :rules='editFormRules' ref='editFormRef' label-width='70px')
    el-form-item(label='用户名')
      el-input(v-model='editForm.username' disabled)
    el-form-item(label='邮箱' prop='email')
      el-input(v-model='editForm.email')
    el-form-item(label='手机' prop='mobile')
      el-input(v-model='editForm.mobile')
  template(#footer)
    el-button(@click='editDialogVisible=false') 取消
    el-button(type='primary' @click='editUserInfo') 确定
el-dialog(title='分配角色' v-model='setRoleDialogVisible' width='50%' @close='setRoleDialogClosed')
  div
    p 当前的用户:{{userInfo.username}}
    p 当前的角色:{{userInfo.role_name}}
    p 分配新角色
      el-select(v-model='selectedRoleId' placeholder='请选择')
        el-option(v-for='item in rolesList' :key='item.id' :label='item.roleName' :value='item.id')
  template(#footer)
    el-button(@click='setRoleDialogVisible=false') 取消
    el-button(type='primary' @click='saveRoleInfo') 确定
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue'
import {
  reqUsers,
  reqAddUsers,
  reqEditUserState,
  reqUsersById,
  reqEditUsers,
  reqDeleteUsers,
  reqUserToRole,
  reqRoles
} from '../../api/index'
import useCurrentInstance from '../../utils/useCurrentInstance'
const { proxy } = useCurrentInstance()
let total = ref(0),
addFormRef = ref(),
editFormRef = ref(),
addDialogVisible = ref(false),
editDialogVisible = ref(false),
setRoleDialogVisible = ref(false),
selectedRoleId = ref(''),
editForm: any = reactive({}),
userInfo: any = reactive({}),
rolesList: any = reactive([]),
userList: any = reactive([])
const checkEmail = (rule: any, value: string, cb: (arg0?: Error) => any): any => {
  const regEmail: RegExp = /^([a-zA-Z])|[0-9](\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
  if(regEmail.test(value)){
    return cb()
  }
  cb(new Error('请输入合法邮箱'))
}
const checkMobile = (rule: any, value: string, cb: (arg0?: Error | undefined) => any): any => {
  const regMobile: RegExp = /^1(3|4|5|7|8)\d{9}/
  if(regMobile.test(value)){
    return cb()
  }
  cb(new Error('请输入合法手机号码'))
}
const queryInfo = reactive({
  query: '',
  pagenum: 1,
  pagesize: 2
})

const addForm = reactive({
  username: '',
  password: '',
  email: '',
  mobile: ''
})
const addFormRules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: true},
    { min: 3, max: 10, message: '用户名的长度在3~10各字符之间', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }, 
    { min: 6, max: 15, message: '密码的长度在6-15各字符之间', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' }, 
    { validator: checkEmail, trigger: 'blur' }
  ],
  mobile: [
    { required: true, message: '请输入手机', trigger: 'blur' }, 
    { validator: checkMobile, trigger: 'blur' }
  ]
})
const editFormRules = reactive({
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' }, 
    { validator: checkEmail, trigger: 'blur' }
  ],
  mobile: [
    { required: true, message: '请输入手机', trigger: 'blur' }, 
    { validator: checkMobile, trigger: 'blur' }
  ]
})

const getUserList = async () => {
  const result = await reqUsers(queryInfo.query, queryInfo.pagenum, queryInfo.pagesize)
  if(result.meta.status !== 200){
    return proxy.$message.error(result.meta.msg)
  }
  userList = result.data.users
  total.value = result.data.total
  console.log(result)
}
const handleSizeChange = (newSize: number) => {
  queryInfo.pagesize = newSize
  getUserList()
}
const handleCurrentChange = (newPage: number) => {
  queryInfo.pagenum = newPage
  getUserList()
}
const userStateChanged = async (userInfo: any) => {
  console.log(userInfo)
  const result = await reqEditUserState(userInfo.id, userInfo.mg_state)
  if(result.meta.status != 200){
    userInfo.mg_state = !userInfo.mg_state
    return proxy.$message.error(result.meta.msg)
  }
  proxy.$message.success(result.meta.msg)
}
const addDialogClosed = () => {
  addFormRef.value.resetFields()
}
const addUser = async () => {
  addFormRef.value.validate(async (valid: any) => {
    if(!valid) return
    const result = await reqAddUsers(addForm.username, addForm.password, addForm.email, addForm.mobile)
    if(result.meta.status !== 200){
      proxy.$message.error(result.meta.msg)
    }
    proxy.$message.success(result.meta.msg)
    addDialogVisible.value = false
    getUserList()
  })
}
const showEditDialog = async (id: number) => {
  const result = await reqUsersById(id)
  if(result.meta.status != 200){
    proxy.$message.error(result.meta.msg)
  }
  editForm = result.data
  editDialogVisible.value = true
}
const editDialogClosed = () => {
  editFormRef.value.resetFields()
}
const editUserInfo = () => {
  editFormRef.value.validate( async (valid: any) => {
    if(!valid) return
    const result = await reqEditUsers(editForm.id, editForm.email, editForm.mobile)
    if(result.meta.status != 200){
      proxy.$message.error(result.meta.msg)
    }
    editDialogVisible.value = false
    getUserList()
    proxy.$message.success(result.meta.msg)
  })
}
const removeUserById = async (id: any) => {
  const confirmResult = await proxy.$confirm('此操作将永久删除该用户,是否继续?', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).catch((err: any) => err)
  if(confirmResult !== 'confirm'){
    return proxy.$message.info('已取消删除')
  }
  const result = await reqDeleteUsers(id)
  if(result.meta.status !== 200){
    return proxy.$message.error(result.meta.msg)
  }
  proxy.$message.success(result.meta.msg)
}
const setRole = async (userinfo: any) => {
  userInfo = userinfo
  const result = await reqRoles()
  if(result.meta.status !== 200){
    return proxy.$message.error(result.meta.msg)
  }
  rolesList = result.data
  setRoleDialogVisible.value = true
  proxy.$message.success(result.meta.msg)
}
const saveRoleInfo = async () => {
  if(!selectedRoleId.value){
    return proxy.$message.error('请选择要分配的角色')
  }
  const result = await reqUserToRole(userInfo.id, userInfo.rid)
  if(result.meta.status !== 200){
    proxy.$message.error(result.meta.msg)
  }
  proxy.$message.success(result.meta.msg)
  getUserList()
  setRoleDialogVisible.value = false
}
const setRoleDialogClosed = () => {
  selectedRoleId.value = ''
  userInfo = {}
}
getUserList()
</script>

<style lang='less'>
</style>