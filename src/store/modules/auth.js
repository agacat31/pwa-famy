import axios from 'axios'
var storage = window.localStorage

const state = {
  token: false,
}

const getters = {
  getToken (state) {
    return state.token
  }
}

const mutations = {
  SET_AUTH (state, auth) {
    state.token = true
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + auth.token
    window.$cookies.set("ses", auth.token, auth.expires);
  }
}

const actions = {
  setAuth ({ commit }, auth) {
    commit('SET_AUTH', auth)
  }
}

export var auth = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
