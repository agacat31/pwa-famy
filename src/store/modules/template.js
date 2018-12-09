const state = {
  drawer: true,
  drawerRight: false,
  floatDrawer: false,
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
  floatDrawer (state) {
    return state.floatDrawer
  },
  miniVariant (state) {
    return state.miniVariant
  },
  clipped (state) {
    return state.clipped
  }
}

const mutations = {
  SET_DRAWER (state, drawer) {
    state.drawer = drawer
  },
  SET_DRAWER_RIGHT (state, drawerRight) {
    state.drawerRight = drawerRight
  },
  SET_FLOAT_DRAWER (state, floatDrawer) {
    state.floatDrawer = floatDrawer
  },
  SET_MINI_VARIANT (state, miniVariant) {
    state.miniVariant = miniVariant
  },
  SET_CLIPPED (state, clipped) {
    state.clipped = clipped
  },
}

const actions = {
  setDrawer ({ commit }, drawer) {
    commit('SET_DRAWER', drawer)
  },
  setDrawerRight ({ commit }, drawerRight) {
    commit('SET_DRAWER_RIGHT', drawerRight)
  },
  setFloatDrawer ({ commit }, floatDrawer) {
    commit('SET_FLOAT_DRAWER', floatDrawer)
  },
  setMiniVariant ({ commit }, miniVariant) {
    commit('SET_MINI_VARIANT', miniVariant)
  },
  setClipped ({ commit }, clipped) {
    commit('SET_CLIPPED', clipped)
  },
}

export var template = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
