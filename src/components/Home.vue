<template lang="pug">
el-container.home-container
  //- 头部区域
  el-header
    div
      img(src='../assets/images/heima.png' alt='heima')
      span 电商管理系统
    el-button(type='info' @click='logout') 退出
  //- 主页面区域
  el-container
    //- 侧边栏菜单区域
    el-aside(:width='isCollapse? "64px": "200px"')
      .toggle-button( @click='toggleCollapse') |||
      el-menu(text-color='#fff' active-text-color='#409EFF' background-color='#333744'
      unique-opened :collapse='isCollapse' :collapse-transition='false'
      router :default-active='activePath')
        //- 一级菜单
        el-sub-menu(:index='item.id+""' v-for='item in menulist.value' :key='item.id')
          //- 一级菜单模板区域
          template(#title)
            i(:class='iconsObj[item.id]')
            span {{item.authName}}
          el-menu-item(:index='"/"+subItem.path' v-for='subItem in item.children'
          :key='subItem.id' @click='saveNavState("/"+subItem.path)')
            template(#title)
              i.el-icon-menu
              span {{subItem.authName}}
    //- 右侧内容主体
    el-main
      router-view
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import useCurrentInstance from '../utils/useCurrentInstance'
import { reqMenus } from '../api/index'
const { proxy } = useCurrentInstance()
let menulist: any = reactive({})
interface iconObjParams{
  [propName: string]: string
}
const iconsObj: iconObjParams = reactive({
  125: 'iconfont el-icon-user-solid',
  103: 'iconfont el-icon-s-home',
  101: 'iconfont el-icon-s-goods',
  102: 'iconfont el-icon-s-order',
  145: 'iconfont el-icon-s-data'
})
let isCollapse = ref(false)
let activePath = ref('')
const logout: () => void = () =>{
  sessionStorage.clear()
  proxy.$router.push('/login')
}
const getMenuList: () => Promise<any> = async () => {
  const result = await reqMenus()
  if(result.meta.status != 200)
    return proxy.$message.error(result.meta.msg)
  menulist.value = result.data
  console.log(result)
  console.log(menulist)
}
const toggleCollapse: () => void = () => {
  isCollapse.value = !isCollapse.value
}
const saveNavState = (activePath: string): void => {
  sessionStorage.setItem('activePath', activePath)
  activePath = activePath
}
getMenuList()
activePath.value = sessionStorage.getItem('activePath')!
</script>
<style lang="less">
.home-container{
  height: 100%;
}
.el-header{
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  >div{
    display: flex;
    align-items: center;
    span{
      margin-left: 15px;
    }
  }
}
.el-aside{
  background-color: #333744;
  el-menu{
    border-right: none;
  }
}
.el-main{
  background-color: #eaedf1;
}
.iconfont{
  margin-right: 10px;
}
.toggle-button{
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>