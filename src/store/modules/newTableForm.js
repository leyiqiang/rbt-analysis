import vueAxios from '@/api/vueAxios'
import { TABLE_ONE_API } from '@/api/table'

const TABLE_ONE = '表格1'
const ABC_TABLE = 'ABC表格'

const CHANGE_ERROR_MESSAGE = 'CHANGE_ERROR_MESSAGE'
const CHANGE_IS_LOADING = 'CHANGE_IS_LOADING'
const CHANGE_STUDENT_NAME = 'CHANGE_STUDENT_NAME'
const CHANGE_TABLE_NAME = 'CHANGE_TABLE_NAME'
const CHANGE_DATE = 'CHANGE_DATE'

const state = {
  isLoading: false,
  errorMessage: "",
  tableTypes:[TABLE_ONE, ABC_TABLE],
  tableName: "",
  studentName: "",
  date: new Date().toISOString().substr(0, 10),
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
      case TABLE_ONE:
        try {
          let res = await vueAxios.post(TABLE_ONE_API, {tableName, studentName, date})
          if(res.data) {
            const tableData = res.data
            const { tableName, studentName, date } = tableData
            commit(CHANGE_STUDENT_NAME, studentName)
            commit(CHANGE_TABLE_NAME, tableName)
            commit(CHANGE_DATE, date.substr(0,10))
            success()
          }
          commit(CHANGE_IS_LOADING, false)
        }
        catch (e) {
          if(e.response){
            commit(CHANGE_ERROR_MESSAGE, e.response.data.message)
            commit(CHANGE_IS_LOADING, false)
          }
        }
        break;
      case ABC_TABLE:
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
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
