import _ from 'lodash'
import { NA } from '@/utils/constants'

const ADD_DATA_TO_SELECTED_STO = 'ADD_DATA_TO_SELECTED_STO'
const ADD_NEW_STO = 'ADD_NEW_STO'
const SET_DATA = 'SET_DATA'

export default {
  namespaced:true,
  state() {
    return {
      id: "123abcXYZ",
      data: {
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