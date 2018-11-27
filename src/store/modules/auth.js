import axios from 'axios'
var storage = window.localStorage

const state = {
  auth: (storage.getItem('auth') == null) ? false : JSON.parse(storage.getItem('auth')),
  token: (storage.getItem('token') == null) ? null : storage.getItem('token')
}

const getters = {
  auth (state) {
    return state.auth
  },
  token (state) {
    return state.token
  }
}

const mutations = {
  setAuth (state, auth) {
    state.auth = auth
    storage.setItem('auth', state.auth)
  },
  setToken (state, token) {
    state.token = token
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + state.token
    storage.setItem('token', state.token)
  }
}

const actions = {
  setAuth ({ commit }, auth) {
    commit('setAuth', auth)
  },
  setToken ({ commit }, token) {
    commit('setToken', token)
  }
}

export var auth = {
  state,
  getters,
  mutations,
  actions
}
