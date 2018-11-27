import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { auth } from './modules/auth'
import { user } from './modules/user'
import { template } from './modules/template'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    user,
    template
  },
  plugins: [createPersistedState()]
})
