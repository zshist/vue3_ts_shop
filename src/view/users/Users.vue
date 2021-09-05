<template lang='pug'>
div users
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue'
import { reqUsers } from '../../api/index'
import useCurrentInstance from '../../utils/useCurrentInstance'
const { proxy } = useCurrentInstance()
const checkEmail = (rule: any, value: string, cb: (arg0?: Error | undefined) => any): any => {
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
const addDialogVisible = ref(false)
const userlist: any = reactive([])
const total = ref(0)
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
const editDialogVisible = ref(false)
const editForm: any = reactive({})
const setRoleDialogVisible = ref(false)
const userInfo: any = reactive({})
const rolesList: any = reactive([])
const selectedRoleId = ref('')
const getUserList = async () => {
  const result = await reqUsers(queryInfo.query, queryInfo.pagenum, queryInfo.pagesize)
  if(result.meta.status !== 200){
    return proxy.$message.error(result.meta.msg)
  }
  userlist.value = result.data.users
  total.value = result.data.total
  console.log(result)
}
const handleSizeChange = (newSize: any) => {
  queryInfo.pagesize = newSize
}
getUserList()
</script>

<style lang='less'>
</style>