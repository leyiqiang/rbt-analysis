import _ from 'lodash'
const state = {
    data: {
      '打人': [{isSuccess: true, promptLevel:"NA", note:"测试"}, {isSuccess: true, promptLevel:"NA", note:"测试"}, {isSuccess: true, promptLevel:"NA", note:"测试"}],
      '测试1': [{isSuccess: true, promptLevel:"PP", note:""}, {isSuccess: false, promptLevel:"NA", note:""}, {isSuccess: true, promptLevel:"P", note:"很棒!"},{isSuccess: true, promptLevel:"PP", note:""}, {isSuccess: false, promptLevel:"NA", note:""}, {isSuccess: true, promptLevel:"V", note:"很棒!"}],
      '测试2': [{isSuccess: true, promptLevel:"PP", note:""}, {isSuccess: false, promptLevel:"NA", note:""}, {isSuccess: true, promptLevel:"PV", note:"很棒!"}, {isSuccess: true, promptLevel:"V", note:"很棒!aaaaaaaasdasdassdasdas"}],
      '测3': [{isSuccess: true, promptLevel:"PP", note:""}, {isSuccess: false, promptLevel:"NA", note:""}, {isSuccess: true, promptLevel:"V", note:"很棒!"},{isSuccess: true, promptLevel:"PP", note:""}, {isSuccess: false, promptLevel:"NA", note:""}, {isSuccess: true, promptLevel:"V", note:"很棒!"}]


    }, // stoName: [{isSuccess: false, promptLevel: PP, note: ""}, ...]
    currentData: {
      isSuccess: false,
      promptLevel:'N/A',
      note: ""
    },
}

const getters = {
  getDataKeys: (state) => {
    return _.keys(state.data)
  }
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
      state.currentData.isSuccess = data
    },
    changePromptLevel(state, data) {
      state.currentData.promptLevel= data
    },
    changeNote(state, note) {
      state.currentData.note = note
    }
  }
  
export default {
    namespaced: true,
    state,
    getters,
    mutations
  }
  