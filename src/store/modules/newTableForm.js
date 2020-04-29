import vueAxios from '@/api/vueAxios'
import { CREATE_TABLE_ONE_API } from '@/api/tableOne'
import { CREATE_ABC_TABLE_API } from '@/api/abcTable'
import { formatDate } from '@/utils/utils';

import { TABLE_ONE, ABC_TABLE } from '@/utils/constants';

const CHANGE_ERROR_MESSAGE = 'CHANGE_ERROR_MESSAGE'
const CHANGE_IS_LOADING = 'CHANGE_IS_LOADING'
const CHANGE_STUDENT_NAME = 'CHANGE_STUDENT_NAME'
const CHANGE_TABLE_NAME = 'CHANGE_TABLE_NAME'
const CHANGE_DATE = 'CHANGE_DATE'
const CHANGE_TABLE_ID = 'CHANGE_TABLE_ID'

const state = {
  tableID: "",
  isLoading: false,
  errorMessage: "",
  tableTypes:[TABLE_ONE, ABC_TABLE],
  tableName: "",
  studentName: "",
  date: formatDate(new Date().toISOString()),
}

const getters = {
  // getItemsByCategory: (state) => (category) => {
  //   return _.filter(state.list, (o) => {
  //     return o.category === category
  //   })
  // }
}

const actions = {
  async createNewTable({ commit, rootState}, data) {
    const route = rootState.route
    const { tableType, tableName, studentName, date, success } = data
    commit(CHANGE_ERROR_MESSAGE, "")
    switch(tableType) {
      // todo: encapsulate function
      case TABLE_ONE:
        try {
          let res = await vueAxios.post(CREATE_TABLE_ONE_API, { tableName, studentName, date })
          if (res.data) {
            const tableData = res.data
            const { _id, tableName, studentName, date } = tableData
            commit(CHANGE_STUDENT_NAME, studentName)
            commit(CHANGE_TABLE_NAME, tableName)
            commit(CHANGE_DATE, formatDate(date))
            commit(CHANGE_TABLE_ID, _id)
            success('tableOne')
          }
          commit(CHANGE_IS_LOADING, false)
        }
        catch (e) {
          if (e.response) {
            commit(CHANGE_ERROR_MESSAGE, e.response.data.message)
            commit(CHANGE_IS_LOADING, false)
          }
        }
        break;
      case ABC_TABLE:
        try {
          let res = await vueAxios.post(CREATE_ABC_TABLE_API, { tableName, studentName, date })
          if (res.data) {
            const tableData = res.data
            console.log(res.data)
            const { _id, tableName, studentName, date } = tableData
            commit(CHANGE_STUDENT_NAME, studentName)
            commit(CHANGE_TABLE_NAME, tableName)
            commit(CHANGE_DATE, formatDate(date))
            commit(CHANGE_TABLE_ID, _id)
            success('abcTable')
          }
          commit(CHANGE_IS_LOADING, false)
        }
        catch (e) {
          if (e.response) {
            commit(CHANGE_ERROR_MESSAGE, e.response.data.message)
            commit(CHANGE_IS_LOADING, false)
          }
        }
        commit(CHANGE_IS_LOADING, false)
        break;
    }
  },
  changeStudentName({ commit }, data) {
    commit(CHANGE_STUDENT_NAME, data)
  },
  changeTableName({ commit }, data) {
    commit(CHANGE_TABLE_NAME, data)
  },
  changeDate({ commit }, data) {
    commit(CHANGE_DATE, date)
  }
}

const mutations = {
  [CHANGE_ERROR_MESSAGE](state, msg) {
    state.errorMessage = msg
  },
  [CHANGE_IS_LOADING](state, bool) {
    state.isLoading = bool
  },
  [CHANGE_TABLE_NAME](state, name) {
    state.tableName = name
  },
  [CHANGE_STUDENT_NAME](state, name) {
    state.studentName = name
  },
  [CHANGE_DATE](state, date) {
    state.date = date
  },
  [CHANGE_TABLE_ID](state, id) {
    state.tableID = id
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
