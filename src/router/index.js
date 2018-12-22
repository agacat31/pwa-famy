import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('@/components/Home')
const Login = () => import('@/components/login')
const Users = () => import('@/components/Users')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { layout: 'admin', requiresAuth: true },
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      meta: { requiresAuth: false },
      component: Login
    },
    {
      path: '/user',
      name: 'user',
      meta: { layout: 'admin', requiresAuth: true },
      component: Users
    }
  ]
})
