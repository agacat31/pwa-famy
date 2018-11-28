import defaultPhoto from '../../assets/images/kaneki_ken.png'

const state = {
  profile: {
    name: '',
    photo: defaultPhoto,
    phone: '',
    email: '',
  }
}

const getters = {
  profile (state) {
    return state
  }
}

const mutations = {
  SET_PROFILE (state, profile) {
    state.profile = profile
    if (profile.photo === undefined) {
      state.profile.photo = defaultPhoto
    } else {
      
    }
  }
}

const actions = {
  setProfile ({ commit }, profile) {
    commit('SET_PROFILE', profile)
  }
}

export var user = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
