import Vue from 'vue'
import Vuex from 'vuex'
import tools from './modules/tools'
import table from './modules/tableOne'
import newTableForm from './modules/newTableForm'
import abcTable from './modules/abcTable'
import tableOne from './modules/tableOne'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        tools,
        table,
        newTableForm,
        abcTable,
        tableOne
    }
})