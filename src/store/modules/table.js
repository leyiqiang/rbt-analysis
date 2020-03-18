import { NA } from '@/utils/constants'

const state = {
    data: {}, // stoName: [{isSuccess: false, promptLevel: PP, note: ""}, ...]
    currentData: {
      isSuccess: false,
      promptLevel:NA,
      note: ""
    },
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
    changeIsSuccess(state, data) {
      state.isSuccess = data
    }
  }
  
export default {
    namespaced: true,
    state,
    getters,
    mutations
  }
  