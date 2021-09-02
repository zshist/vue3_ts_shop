<template lang="pug">
.login_container
  .login_box
    //- 头像区域
    .avatar_box
      img(src="../assets/images/logo.png" alt="logo")
    //- 登录表单区域
    el-form.login_form(ref='loginFormRef' :model='loginForm' :rules='loginFormRules' label-width='0px')
      //- 用户名
      el-form-item(prop='username')
        el-input(v-model='loginForm.username' prefix-icon='el-icon-user-solid')
      //- 密码
      el-form-item(prop='password')
        el-input(v-model='loginForm.password' prefix-icon="el-icon-s-goods" show-password)
      //- 按钮区域
      el-form-item.btns
        el-button(type='primary' @click='login') 登录
        el-button(type='info' @click='resetLoginForm') 重置
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import useCurrentInstance from '../utils/useCurrentInstance'
import { reqLogin } from '../api/index'
const loginFormRef = ref()
// 这是登录表单的数据绑定对象
const loginForm = reactive({
  username: 'admin',
  password: '123456'
})
const { proxy } = useCurrentInstance()
const router = useRouter()
// 这是表单的验证对象
const loginFormRules = reactive({
  // 验证用户名是否合法
  username: [
    { required: true, message: '请输入登录名称', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在3到10个字符', trigger: 'blur' }
  ],
  // 验证密码是否合法
  password: [
    { required: true, message: '请输入登录名称', trigger: 'blur' },
    { min: 6, max: 15, message: '长度在3到10个字符', trigger: 'blur' }
  ]
})
const resetLoginForm = () => {
  loginFormRef.value.resetFields()
}
const login = () => {
  loginFormRef.value.validate(async (vaild: any) => {
    console.log(loginFormRules)
    if(!vaild) return
    const result = await reqLogin(loginForm.username, loginForm.password)
    if(result.meta.status != 200){
      return proxy.$message.error(result.meta.msg)
    }
    console.log(result)
    sessionStorage.setItem('token', result.data.token)
    router.push('/home')
  })
}
</script>

<style scoped lang='less'>
.login_container{
  background-color: #2b5b6b;
  height: 100%;
}
.login_box{
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .avatar_box{
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #000;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img{
      width: 100%;
      height: 100%;
      box-shadow: 0 0 10px #ddd;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.login_form{
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns{
  display: flex;
  justify-content: flex-end;
}
.login_form{
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>
