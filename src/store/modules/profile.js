import defaultPhoto from '../../assets/images/kaneki_ken.png'
var storage = window.localStorage

const state = {
  profile: {
    name: 'Aga Atmaja',
    photo: defaultPhoto,
    phone: '081213551169',
    email: 'aga@gmail.com',
    company: 'agacat',
    position: 'Developer'
  }
}

const getters = {
  profile (state) {
    return state.profile
  }
}

const mutations = {
  setProfile (state, profile) {
    state.profile = profile
    if (profile.photo === undefined) {
      state.profile.photo = defaultPhoto
    } else {
      // var id = state.profile._id.$oid;
      // var photoPath = cordova.file.dataDirectory+"profile/"+id+"/"+id+".png"
      // state.profile.photo = photoPath;
    }
    storage.setItem('profile', JSON.stringify(state.profile))
  }
}

const actions = {
  setProfile ({ commit }, profile) {
    commit('setProfile', profile)
  }
}

export var profile = {
  state,
  getters,
  mutations,
  actions
}
