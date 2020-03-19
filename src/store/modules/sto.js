import { NA } from '@/utils/constants'

const state = {
  selectedSTO: "",
  newSTO: "",
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
  changeSelectedSTO(state, sto) {
    state.selectedSTO = sto
  },
  changeNewSTO(state, sto) {
    state.newSTO = sto
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
