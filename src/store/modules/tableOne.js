import _ from 'lodash'
import vueAxios from '@/api/vueAxios'
import { NA } from '@/utils/constants'
import { GET_TABLE_API } from '@/api/table'

const ADD_DATA_TO_SELECTED_STO = 'ADD_DATA_TO_SELECTED_STO'
const ADD_NEW_STO = 'ADD_NEW_STO'
const SET_DATA = 'SET_DATA'

export default {
  namespaced:true,
  state() {
    return {
      tableName: "",
      studentName:"",
      date:"",
      records: {
        "打人": [{ isSuccess: true, promptLevel: 'N/A', note: "" }],
        "洗手": [{ isSuccess: true, promptLevel: 'N/A', note: "" }],
        "命名动作(刷牙, 拥抱, 睡觉, 挥手)": [{ isSuccess: true, promptLevel: 'N/A', note: "拥抱" }]
      }
    }
  },
  getters: {
    getSTOs: (state) => {
      return _.keys(state.data)
    },
  },
  mutations: {
    [ADD_NEW_STO](state, sto) {
      if(_.isNil(state.data[sto])) {
        let newData = _.clone(state.data)
        newData[sto] = []
        state.data= newData
      }
    },
    [ADD_DATA_TO_SELECTED_STO](state, data) {
      const { selectedSTO, currentData } = data
      const currentDataCopy = _.clone(currentData)
      state.data[selectedSTO].push(currentDataCopy)
    },
    [SET_DATA](state, data) {
      state.data = data
    }
  },
  actions: {
    async getTableData({commit, rootState}, data) {
      const { tableName, studentName, date } = rootState.route.params
      let res = await vueAxios.get(GET_TABLE_API + '/' + studentName + '/' + tableName + '/' + date, rootState.route.params)
      commit(SET_DATA, data)
    },

    addDataToSelectedSTO({commit}, data) {
      commit(ADD_DATA_TO_SELECTED_STO, data)
    },
    addNewSTO({commit}, sto) {
      commit(ADD_NEW_STO, sto)
    },

    setData({commit}, data) {
      commit(SET_DATA, data)
    }
  }
}