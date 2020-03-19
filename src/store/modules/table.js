import _ from 'lodash'
const state = {
    data: {
      "打人": [{isSuccess: true, promptLevel: 'N/A', note:""}],
      "洗手": [{isSuccess: true, promptLevel: 'N/A', note:""}],
      "命名动作(刷牙, 拥抱, 睡觉, 挥手)": [{isSuccess: true, promptLevel: 'N/A', note:"拥抱"}]
    }, // stoName: [{isSuccess: false, promptLevel: PP, note: ""}, ...]
    currentData: {
      isSuccess: false,
      promptLevel:'N/A',
      note: ""
    },
}

const getters = {
  getSTOs: (state) => {
    return _.keys(state.data)
  },
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
      console.log(note)
      state.currentData.note = note
    },
    addNewSTO(state, sto) {
      if(_.isNil(state.data[sto])) {
        let newData = _.clone(state.data)
        newData[sto] = []
        state.data= newData
      }
    },
    addDataToSelectedSTO(state, data) {
      const { selectedSTO, currentData } = data
      const currentDataCopy = _.clone(currentData)
      state.data[selectedSTO].push(currentDataCopy)
    },
    resetNote(state) {
      state.currentData.note = ""
    },
    resetCurrentData(state) {
      state.currentData = {
        isSuccess: false,
        promptLevel:'N/A',
        note: ""
      }
    },
    // setLineDataBySTOandIdx(state, data) {
    //   const { STO, idx, linedata } = data
    //   if (data[STO]) {
    //     return state.data[STO][idx] = linedata
    //   }
    // }
  }
  
export default {
    namespaced: true,
    state,
    getters,
    mutations
  }
  