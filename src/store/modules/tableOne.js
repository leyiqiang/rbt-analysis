import _ from 'lodash'
import { vueAxios } from '@/api/vueAxios'
import { formatDate } from '@/utils/utils'
import {
  GET_TABLE_API,
  NEW_STO_API,
  ADD_SINGLE_STO_DATA_API,
  EDIT_SINGLE_STO_DATA_API
} from '@/api/tableOne'

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

function findRecordIndexByID(id, records) {
  const findIdx = _.findIndex(records, (record) => {
    return record._id === id
  })
  return findIdx
}

export default {
  namespaced:true,
  state() {
    return {
      errorSnackBar: false,
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

    getTableHeaders: (state) => {
      // todo sto sto(prompt lvl) sto sto(prmopt lvl) ...
    }
  },
  mutations: {
    [ADD_NEW_STO](state, data) {
      const {_id, tableID, sto, stoList} = data
        state.records.push({_id, sto, stoList})
    },
    [ADD_DATA_TO_SELECTED_STO](state, data) {
      const { selectedSTO, stoSingleData, findIdx } = data
      // const findIdx = findRecordIndexBySTO(selectedSTO, state.records)
      const stoList = state.records[findIdx].stoList
      stoList.push(stoSingleData)
      // todo
    },
    [CHANGE_ERROR_MESSAGE](state, data) {
      state.errorMessage = data
      state.errorSnackBar = true
    },

    [SET_DATA](state, data) {
      let { _id, studentName, date, tableName, stoRecords } = data
      state.studentName= studentName
      state.tableName = tableName
      state.date = formatDate(date)
      state.records = stoRecords
      state.tableID = _id
    },
    setErrorSnackBar(state, data) {
      state.snackBar = data
    }
  },
  actions: {
    async getTableData({commit, rootState}, data) {
      const { tableID } = rootState.route.params
      try {
        let res = await vueAxios.get(GET_TABLE_API + '/' + tableID, rootState.route.params)
        commit(SET_DATA, res.data)
      } catch (e) {
        if(e.response){
          commit(CHANGE_ERROR_MESSAGE, e.response.data.message)
        } else {
          commit(CHANGE_ERROR_MESSAGE, e)
        }
      }
    },


    async addNewSTO({commit, state, rootState}, sto) {
      const findIdx = findRecordIndexBySTO(sto, state.records)
      // make sure no duplicates
      if(findIdx === -1) {
        const { tableID } = rootState.route.params
        try {
          const res = await vueAxios.post(NEW_STO_API + '/' + tableID, { stoName: sto })
          commit(ADD_NEW_STO, {...res.data.newSTO, stoList:[]})
        } catch(err) {
          if(err.response){
            commit(CHANGE_ERROR_MESSAGE, e.response.data.message)
          } else {
            commit(CHANGE_ERROR_MESSAGE, e)
          }
        }
      } else {
        commit(CHANGE_ERROR_MESSAGE, '该STO已存在')

      }
    },

    async addDataToSelectedSTO({commit,state}, data) {
      const { selectedSTO, currentData } = data
      const findIdx = findRecordIndexBySTO(selectedSTO, state.records)
      const stoID = state.records[findIdx]._id
      try {
        const res = await vueAxios.post(ADD_SINGLE_STO_DATA_API + '/' + stoID, { stoRecordID: stoID, ...currentData})
        const stoSingleData = res.data.stoSingleData
        commit(ADD_DATA_TO_SELECTED_STO, { selectedSTO, stoSingleData, findIdx})
      } catch(e) {
        if(e.response){
          commit(CHANGE_ERROR_MESSAGE, e.response.data.message)
        } else {
          commit(CHANGE_ERROR_MESSAGE, e)
        }
      }
    },

    async editDataFromSelectedSTO({commit, state, dispatch}, lineData) {
      const {isSuccess, promptLevel, stoRecordID, _id} = lineData
      const findIdx = findRecordIndexByID(_id, state.records)
      const res = await vueAxios.post(EDIT_SINGLE_STO_DATA_API + '/' +_id, {...lineData})
      if(res.status === 200) {
      }
      dispatch('getTableData')

    },


    setData({commit}, data) {
      commit(SET_DATA, data)
    }
  }
}