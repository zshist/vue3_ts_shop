import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: () => import('../components/Login.vue') },
  { path: '/home', component: () => import('../components/Home.vue') }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  if(to.path === '/login')
    return next()
  const tokenStr = sessionStorage.getItem('token')
  if(!tokenStr)
    return next('/login')
  next()
})
export default router