const TABLE_ONE = '表格1'
const ABC_TABLE = 'ABC表格'

const state = {
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

const mutations = {
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
  getters,
  mutations
}
