import Vue from 'vue'
import Router from 'vue-router'
const HelloWorld = () => import('@/components/HelloWorld')
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
      component: HelloWorld,
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
