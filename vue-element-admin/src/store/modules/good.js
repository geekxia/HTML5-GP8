import { fetchCateAll } from '@/api/good'


const state = {
  cateList: []
}

const mutations = {
  SET_CATE_LIST : (state, list) => {
    state.cateList = list
    setInterval(()=>{
      console.log('---', 1)
    }, 1000)
  }
}

const actions = {
  getCates: ({commit, state}) => {
    fetchCateAll().then(res=>{
      if (res.err===0) {
        // commit('SET_CATE_LIST', res.data.list)
        state.cateList = res.data.list
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
