// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import VueCookies from 'vue-cookies'
import 'vuetify/dist/vuetify.min.css'
import 'vue2-animate/dist/vue2-animate.min.css'

// Layout
import Admin from './layouts/Admin.vue'
import Fullscreen from './layouts/Fullscreen.vue'

import store from './store'

Vue.use(Vuetify)
Vue.use(VueAxios, Axios)
Vue.use(Vuex)
Vue.use(VueCookies)

// Layout
Vue.component('admin-layout', Admin)
Vue.component('fullscreen-layout', Fullscreen)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!window.$cookies.isKey("ses")) {
      window.localStorage.clear()
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else if (!to.matched.some(record => record.meta.requiresAuth)) {
    if (window.$cookies.isKey("ses")) {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    } else {
      window.localStorage.clear()
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
