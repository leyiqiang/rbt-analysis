import Vue from 'vue'
import Vuex from 'vuex'
import tools from './modules/tools'
import table from './modules/table'
import newTableForm from './modules/newTableForm'
import abcTable from './modules/abcTable'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        tools,
        table,
        newTableForm,
        abcTable
    }
})