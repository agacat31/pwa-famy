import axios from 'axios'
var storage = window.localStorage

const state = {
  token: (storage.getItem('token') == null) ? null : storage.getItem('token')
}

const getters = {
  getToken (state) {
    return state.token
  }
}

const mutations = {
  SET_TOKEN (state, token) {
    state.token = token
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + state.token
    storage.setItem('token', state.token)
  }
}

const actions = {
  setToken ({ commit }, auth) {
    commit('SET_TOKEN', auth)
  }
}

export var auth = {
  state,
  getters,
  mutations,
  actions
}
