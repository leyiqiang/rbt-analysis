import vueAxios from '@/api/vueAxios'

const SET_USER_NAME = 'SET_USER_NAME'
const SET_USER_AVATAR = 'SET_USER_AVATAR'
const SET_ROLE = 'SET_ROLE'

const state = {
  userName: "",
  userAvatar: "",
  role: "管理员",
}

const getters = {
  // getItemsByCategory: (state) => (category) => {
  //   return _.filter(state.list, (o) => {
  //     return o.category === category
  //   })
  // }
}

const mutations = {
  [SET_USER_NAME](state, username) {
    state.userName = username
  },

  [SET_USER_AVATAR](state, avatar) {
    state.userAvatar = avatar
  },
  [SET_ROLE](state, role) {
    state.role = role
}
}

const actions = {
  async login({ commit, rootState}, data) {
    // todo axios login
    const username = ""
    commit(SET_USER_NAME, username)
  }

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
