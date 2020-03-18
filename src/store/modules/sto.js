import { NA } from '@/utils/constants'

const state = {
  STOs: [],
  selectedSTO: "",
  previousSTO: "",
}

const getters = {
  // getItemsByCategory: (state) => (category) => {
  //   return _.filter(state.list, (o) => {
  //     return o.category === category
  //   })
  // }
}

const mutations = {
  // remove_card(state, index) {
  //   state.selectedCards.splice(index, 1)
  // }
  addSTO(state, sto) {
    state.STOs.push(sto)
  },
  changeSelectedSTO(state, sto) {
    state.selectedSTO = sto
  },
  changePreviousSTO(state, sto) {
    state.previousSTO = sto
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
