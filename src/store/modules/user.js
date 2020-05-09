import { vueAxios } from '@/api/vueAxios'
import _ from 'lodash'
import AuthingSSO from '@authing/sso'
const SET_USER_NAME = 'SET_USER_NAME'
const SET_USER_AVATAR = 'SET_USER_AVATAR'
const SET_ROLE = 'SET_ROLE'

import { setXAccessToken } from '@/utils/utils'

const state = {
  userName: "",
  userAvatar: "",
  role: "",
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

let auth = new AuthingSSO({
  appId: "5ead3884a97922d3bf3dce6d",
  appDomain: "rbt-analysis.authing.cn"
});

const actions = {
  async getUserInfo({ commit, rootState}, data) {
    let res = await auth.trackSession();
    if (!_.isNil(res.userInfo)) {
      const userInfo = res.userInfo
      setXAccessToken(userInfo.token)
      commit(SET_USER_NAME, userInfo.username)
    }
  },
  async login({ commit, rootState}, data) {
    let res = await auth.trackSession();
    if (_.isNil(res.session)) {
      auth.login();
    } else {
      const userInfo = res.userInfo
      setXAccessToken(userInfo.token)
      commit(SET_USER_NAME, userInfo.username)
      auth.login();
    }
  },
  async logout({commit}, data) {
    auth.logout().then((res) => {
      setXAccessToken()
      commit(SET_USER_NAME, "")
    })
  }

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
