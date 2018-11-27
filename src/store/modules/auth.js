import axios from 'axios'
var storage = window.localStorage

const state = {
  token: (storage.getItem('token') == null) ? false : JSON.parse(storage.getItem('token')),
}

const getters = {
  getToken (state) {
    return state.token
  }
}

const mutations = {
  SET_AUTH (state, auth) {
    state.token = true
    storage.setItem('token', true)
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
  state,
  getters,
  mutations,
  actions
}
