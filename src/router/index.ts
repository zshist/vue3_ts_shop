import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: () => import('../components/Login.vue') },
  { path: '/home', name: 'Home' ,component: () => import('../components/Home.vue'),
    redirect: '/welcome', children: [
      { path: '/welcome', component: () => import('../components/Welcome.vue') },
      { path: '/users', component: () => import('../view/users/Users.vue') },
      { path: '/rights', component: () => import('../view/roles/Rights.vue') },
      { path: '/roles', component: () => import('../view/roles/Roles.vue') },
    ]
  },
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