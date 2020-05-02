import vueAxios from '@/api/vueAxios'
import { GET_ALL_TABLE_ONE_API, GET_TABLE_API } from '@/api/tableOne'
import { GET_ALL_ABC_TABLE_API } from '@/api/abcTAble'

import { ABC_TABLE, TABLE_ONE } from '@/utils/constants';
import { formatDate } from '@/utils/utils';
import _ from 'lodash';

const SET_TABLES = 'SET_TABLES'
const SET_SELECTED_TYPE = 'SET_SELECTED_TYPE'


const state = {
  tableTypes:[TABLE_ONE, ABC_TABLE],
  tables: [],
  selectedType: undefined,
}

const getters = {
  // getItemsByCategory: (state) => (category) => {
  //   return _.filter(state.list, (o) => {
  //     return o.category === category
  //   })
  // }
}

const mutations = {
  [SET_TABLES](state, tables) {
    state.tables = _.map(tables, (table) => {
      table.date = formatDate(table.date)
      return table
    })
  },
  [SET_SELECTED_TYPE](state, selectedType) {
    state.selectedType = selectedType
  }
}

const actions = {
  async changeSelectedType({commit, dispatch}, selectedType) {
    switch(selectedType) {
      case TABLE_ONE:
        dispatch('getTableOnes')
        break;
      case ABC_TABLE:
        dispatch('getABCTables')
        break;
    }
    commit(SET_SELECTED_TYPE, selectedType)
  },

  async getTableOnes({commit}) {
    // todo error handler
    let res = await vueAxios.get(GET_ALL_TABLE_ONE_API)
    const tables = res.data.tables
    commit(SET_TABLES, tables)
  },

  async getABCTables({commit}) {
    // todo error handler
    let res = await vueAxios.get(GET_ALL_ABC_TABLE_API)
    const tables = res.data.tables
    commit(SET_TABLES, tables)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
