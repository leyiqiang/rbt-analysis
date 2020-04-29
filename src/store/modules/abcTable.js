import _ from 'lodash'
import { NA } from '@/utils/constants'
import vueAxios from '@/api/vueAxios';
import { ABC_TABLE_API } from '@/api/abcTable';
import { formatDate } from '@/utils/utils';

const EDIT_ABC_ITEM= 'EDIT_ABC_ITEM'
const DELETE_ABC_ITEM = 'DELETE_ABC_ITEM'
const CHANGE_ERROR_MESSAGE = 'CHANGE_ERROR_MESSAGE'
const SET_DATA = 'SET_DATA'

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
      abcs: [
        {
          antecedent: 'asd',
          behavior: 'asds',
          consequence: 'asd',
        },
      ]
    }
  },
  getters: {
    getSTOs: (state) => {
      return _.keys(state.data)
    },
  },
  mutations: {
    [CHANGE_ERROR_MESSAGE](state, data) {
      state.errorMessage = data
      state.errorSnackBar = true
    },
    [SET_DATA](state, data) {
      let { _id, studentName, date, tableName, abcRecords } = data
      state.studentName= studentName
      state.tableName = tableName
      state.date = formatDate(date)
      state.abcs = abcRecords
      state.tableID = _id
    },
    [EDIT_ABC_ITEM](state, data) {
      const { editedIndex, editedItem } = data
      if (editedIndex > -1) {
        Object.assign(state.abcs[editedIndex], editedItem)
      } else {
        state.abcs.push(editedItem)
      }
    },
    [DELETE_ABC_ITEM](state, index) {
      state.abcs.splice(index, 1)
    },
  },
  actions: {
    async getTableData({commit, rootState}, data) {
      const { tableID } = rootState.route.params
      try {
        let res = await vueAxios.get(ABC_TABLE_API + '/' + tableID, rootState.route.params)
        console.log(res)
        commit(SET_DATA, res.data)
      } catch (e) {
        if(e.response){
          commit(CHANGE_ERROR_MESSAGE, e.response.data.message)
        } else {
          commit(CHANGE_ERROR_MESSAGE, e)
        }
      }
    },
    editAbcItem ({commit}, data) {
      commit(EDIT_ABC_ITEM, data)
    },

    deleteAbcItem ({commit}, index) {
      commit(DELETE_ABC_ITEM, index);
    },
  }
}