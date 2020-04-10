import _ from 'lodash'
import { NA } from '@/utils/constants'

const EDIT_ABC_ITEM= 'EDIT_ABC_ITEM'
const DELETE_ABC_ITEM = 'DELETE_ABC_ITEM'

export default {
  namespaced:true,
  state() {
    return {
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
    editAbcItem ({commit}, data) {
      commit(EDIT_ABC_ITEM, data)
    },

    deleteAbcItem ({commit}, index) {
      commit(DELETE_ABC_ITEM, index);
    },
  }
}