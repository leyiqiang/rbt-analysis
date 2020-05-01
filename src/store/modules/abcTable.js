import _ from 'lodash'
import { NA } from '@/utils/constants'
import vueAxios from '@/api/vueAxios';
import { ABC_TABLE_API, ADD_ABC_ITEM_API, EDIT_ABC_ITEM_API, DELETE_ABC_ITEM_API } from '@/api/abcTable';
import { formatDate } from '@/utils/utils';

const EDIT_ABC_ITEM= 'EDIT_ABC_ITEM_API'
const ADD_ABC_ITEM= 'ADD_ABC_ITEM_API'
const DELETE_ABC_ITEM = 'DELETE_ABC_ITEM_API'
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
      tableType:"ABC表格",
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
      let { _id, studentName, date, tableName, abcRecords, tableType } = data
      state.studentName= studentName
      state.tableName = tableName
      state.date = formatDate(date)
      state.abcs = abcRecords
      state.tableID = _id
    },
    [EDIT_ABC_ITEM](state, data) {
      const { editedIndex, editedItem } = data
      Object.assign(state.abcs[editedIndex], editedItem)
    },

    [ADD_ABC_ITEM](state, data) {
      const { editedItem } = data
      state.abcs.push(editedItem)
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
        commit(SET_DATA, res.data)
      } catch (e) {
        if(e.response){
          commit(CHANGE_ERROR_MESSAGE, e.response.data.message)
        } else {
          commit(CHANGE_ERROR_MESSAGE, e)
        }
      }
    },
    async addAbcItem ({commit, rootState}, data) {
      const { tableID } = rootState.route.params
      const { editedItem } = data
      try {
        let res = await vueAxios.post(ADD_ABC_ITEM_API + '/' + tableID, editedItem)
        if(res.status === 200) {
          commit(ADD_ABC_ITEM, data)
        }
      } catch(e) {
        if(e.response){
          commit(CHANGE_ERROR_MESSAGE, e.response.data.message)
        } else {
          commit(CHANGE_ERROR_MESSAGE, e)
        }
      }
    },

    async editAbcItem ({commit, rootState}, data) {
      const { editedItem } = data
      const { _id } = editedItem
      try {
        let res = await vueAxios.post(EDIT_ABC_ITEM_API + '/' + _id, editedItem)
        if(res.status === 200) {
          commit(EDIT_ABC_ITEM, data)
        }
      } catch (e) {
        if(e.response){
          commit(CHANGE_ERROR_MESSAGE, e.response.data.message)
        } else {
          commit(CHANGE_ERROR_MESSAGE, e)
        }
      }

    },

    async deleteAbcItem ({commit}, data) {

      const { index, item } = data
      const { _id } = item
      try {
        let res = await vueAxios.post(DELETE_ABC_ITEM_API+ '/' + _id)
        if(res.status === 200) {
          commit(DELETE_ABC_ITEM, index);
        }
      } catch (e) {
        if(e.response){
          commit(CHANGE_ERROR_MESSAGE, e.response.data.message)
        } else {
          commit(CHANGE_ERROR_MESSAGE, e)
        }
      }
    },
  }
}