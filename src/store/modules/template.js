const state = {
  drawer: true,
  drawerRight: false,
  clipped: true,
  miniVariant: false
}

const getters = {
  drawer (state) {
    return state.drawer
  },
  drawerRight (state) {
    return state.drawerRight
  },
  clipped (state) {
    return state.clipped
  },
  miniVariant (state) {
    return state.miniVariant
  }
}

const mutations = {
  SET_DRAWER (state, drawer) {
    state.drawer = drawer
  },
  SET_DRAWER_RIGHT (state, drawerRight) {
    state.drawerRight = drawerRight
  },
  SET_CLIPPED (state, clipped) {
    state.clipped = clipped
  },
  SET_MINI_VARIANT (state, miniVariant) {
    state.miniVariant = miniVariant
  }
}

const actions = {
  setDrawer ({ commit }, drawer) {
    commit('SET_DRAWER', drawer)
  },
  setDrawerRight ({ commit }, drawerRight) {
    commit('SET_DRAWER_RIGHT', drawerRight)
  },
  setClipped ({ commit }, clipped) {
    commit('SET_CLIPPED', clipped)
  },
  setMiniVariant ({ commit }, miniVariant) {
    commit('SET_MINI_VARIANT', miniVariant)
  }
}

export var template = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
