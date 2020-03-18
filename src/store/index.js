import Vue from 'vue'
import Vuex from 'vuex'
import tools from './modules/tools'
import table from './modules/table'
import tableHeader from './modules/tableHeader'
import sto from './modules/sto'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        tools,
        table,
        tableHeader,
        sto
    }
})