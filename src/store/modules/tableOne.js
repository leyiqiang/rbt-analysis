import _ from 'lodash'
import vueAxios from '@/api/vueAxios'
import { formatDate } from '@/utils/utils'
import { GET_TABLE_API } from '@/api/table'

const ADD_DATA_TO_SELECTED_STO = 'ADD_DATA_TO_SELECTED_STO'
const ADD_NEW_STO = 'ADD_NEW_STO'
const SET_DATA = 'SET_DATA'
const CHANGE_ERROR_MESSAGE = 'CHANGE_ERROR_MESSAGE'

function findRecordIndexBySTO(sto, records) {
  const findIdx = _.findIndex(records, (record) => {
    return record.sto === sto
  })
  return findIdx
}

export default {
  namespaced:true,
  state() {
    return {
      tableID: "",
      errorMessage: "",
      tableName: "",
      studentName:"",
      date:"",
      records: [
        {_id: "", sto: "打人", stoList: [{ isSuccess: true, promptLevel: 'N/A' }]},
        {_id: "", sto: "洗手", stoList: [{ isSuccess: true, promptLevel: 'N/A' }]},
        {_id: "", sto: "命名动作(刷牙, 拥抱, 睡觉, 挥手)", stoList: [{ isSuccess: true, promptLevel: 'N/A' }]}
      ]
    }
  },
  getters: {
    getSTOs: (state) => {
      return _.map(state.records, (record) => {
        return record.sto
      })
    },
  },
  mutations: {
    [ADD_NEW_STO](state, sto) {
      const findIdx = findRecordIndexBySTO(sto, state.records)
      if(findIdx === -1) {
        state.records.push({sto: sto, stoList:[]})
      }
      // todo
    },
    [ADD_DATA_TO_SELECTED_STO](state, data) {
      const { selectedSTO, currentData } = data
      const findIdx = findRecordIndexBySTO(selectedSTO, state.records)
      if(findIdx !== -1) {
        const stoList = state.records[findIdx].stoList
        stoList.push(currentData)
      }
      // todo
    },
    [CHANGE_ERROR_MESSAGE](state, data) {
      state.errorMessage = data
    },

    [SET_DATA](state, data) {
      let { _id, studentName, date, tableName, records } = data
      console.log(studentName)
      state.studentName= studentName
      state.tableName = tableName
      state.date = formatDate(date)
      state.records = records
      state.tableID = _id
    }
  },
  actions: {
    async getTableData({commit, rootState}, data) {
      const { tableID } = rootState.route.params
      try {
        let res = await vueAxios.get(GET_TABLE_API + '/' + tableID, rootState.route.params)
        commit(SET_DATA, res.data)
        console.log(res.data)
      } catch (e) {
        if(e.response){
          commit(CHANGE_ERROR_MESSAGE, e.response.data.message)
        }
      }
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