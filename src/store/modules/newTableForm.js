import vueAxios from '../../api/vueAxios'

const TABLE_ONE = '表格1'
const ABC_TABLE = 'ABC表格'

const CHANGE_ERROR_MESSAGE = 'CHANGE_ERROR_MESSAGE'
const CHANGE_IS_LOADING = 'CHANGE_IS_LOADING'

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
  async createNewTable({ commit }, data) {
    const { tableType, tableName, studentName, date } = data
    commit(CHANGE_ERROR_MESSAGE, "")
    switch(tableType) {
      case TABLE_ONE:
        try {
          let res = await vueAxios.post('/api/tables/create/tableOne', {tableName, studentName, date})
          commit(CHANGE_IS_LOADING, false)
          console.log(res)
        }
        catch (e) {
          commit(CHANGE_ERROR_MESSAGE, e.response.data.message)
          commit(CHANGE_IS_LOADING, false)
        }
        break;
      case ABC_TABLE:
        break;

    }
  }
}

const mutations = {
  [CHANGE_ERROR_MESSAGE](state, msg) {
    state.errorMessage = msg
    console.log(state.errorMessage)
  },
  [CHANGE_IS_LOADING](state, bool) {
    state.isLoading = bool
  },
  changeTableName(state, name) {
    state.tableName = name
  },
  changeStudentName(state, name) {
    state.studentName = name
  },
  changeDate(state, date) {
    state.date = date
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
