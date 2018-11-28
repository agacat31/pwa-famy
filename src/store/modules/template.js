const state = {
  drawer: true,
  drawerRight: false,
  floatDrawer: false,
  layout: 'admin'
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
  layout (state) {
    return state.layout
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
  SET_LAYOUT (state, layout) {
    state.layout = layout
  }
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
  setLayout ({ commit }, layout) {
    commit('SET_LAYOUT', layout)
  }
}

export var template = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
