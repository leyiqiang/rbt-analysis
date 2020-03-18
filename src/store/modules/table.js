const state = {
    date: "",
    STO: [],
    data: {}, // stoName: [{success: false, promptLevel: PP, note: ""}, ...]
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
  }
  
export default {
    namespaced: true,
    state,
    getters,
    mutations
  }
  