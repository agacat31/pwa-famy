var storage = window.localStorage

const state = {
  template: {
    drawer: (storage.getItem('drawer') == null) ? true : JSON.parse(storage.getItem('drawer')),
    drawerRight: (storage.getItem('drawerRight') == null) ? false : JSON.parse(storage.getItem('drawerRight')),
    floatDrawer: (storage.getItem('floatDrawer') == null) ? false : JSON.parse(storage.getItem('floatDrawer')),
    layout: (storage.getItem('layout') == null) ? 'admin' : storage.getItem('layout')
  }
}

const getters = {
  drawer (state) {
    return state.template.drawer
  },
  drawerRight (state) {
    return state.template.drawerRight
  },
  floatDrawer (state) {
    return state.template.floatDrawer
  },
  setLayout (state) {
    return state.template.layout
  }
}

const mutations = {
  setDrawer (state, drawer) {
    state.template.drawer = drawer
    storage.setItem('drawer', state.template.drawer)
  },
  setDrawerRight (state, drawerRight) {
    state.template.drawerRight = drawerRight
    storage.setItem('drawerRight', state.template.drawerRight)
  },
  setFloatDrawer (state, floatDrawer) {
    state.template.floatDrawer = floatDrawer
    storage.setItem('floatDrawer', state.template.floatDrawer)
  },
  setLayout (state, layout) {
    state.template.layout = layout
    storage.setItem('setLayout', state.template.layout)
  }
}

const actions = {
  setDrawer ({ commit }, drawer) {
    commit('setDrawer', drawer)
  },
  setDrawerRight ({ commit }, drawerRight) {
    commit('setDrawerRight', drawerRight)
  },
  setFloatDrawer ({ commit }, floatDrawer) {
    commit('setFloatDrawer', floatDrawer)
  },
  setLayout ({ commit }, layout) {
    commit('setLayout', layout)
  }
}

export var template = {
  state,
  getters,
  mutations,
  actions
}
