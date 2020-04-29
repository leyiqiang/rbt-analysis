import _ from 'lodash'
import vueAxios from '@/api/vueAxios'
import  { GET_ALL_TABLE_ONE_API } from '@/api/tableOne'

const SET_TABLE_ONES = 'SET_TABLE_ONES'


const state = {
  tableOnes: [],
}

const getters = {
  // getItemsByCategory: (state) => (category) => {
  //   return _.filter(state.list, (o) => {
  //     return o.category === category
  //   })
  // }
}

const mutations = {
  [SET_TABLE_ONES](state, data) {
    state.tableOnes = data
  }
}

const actions = {
  async getTableOnes({commit}, data) {
    let res = await vueAxios.get(GET_ALL_TABLE_ONE_API)
    commit(SET_TABLE_ONES, tables)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
