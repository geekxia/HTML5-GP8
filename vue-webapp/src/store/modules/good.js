import { fetchCates, fetchList } from '@/utils/api'

const state = {
  cates: [],
  activeKey: 0,
  cache: {},   // 用于缓存二级品类的数据
}

const getters = {
  cate (state) {
    if (state.cates.length > 0) {
      return state.cates[state.activeKey].cate
    }
    return ''
  },
  subCates (state) {
    return state.cache[state.activeKey]
  }
}

const mutations = {
  setCates (state, list) {
    state.cates = list
  },
  setActiveKey (state, idx) {
    state.activeKey = idx
  },
  updateCache (state, list) {
    // 添加一个新属性
    state.cache[state.activeKey] = list
    state.cache = JSON.parse(JSON.stringify(state.cache))
  },
  cleanCache (state) {
    state.cache = {}
    state.activeKey = 0
  }
}

const actions = {
  getCates ({commit}) {
    fetchCates().then(res=>{
      commit('setCates', res.list)
    })
  },
  // JD需求：根据一级品类获取二级品类
  // 模拟：根据左边品类获取它所对应的商品列表
  getSubCates ({commit,getters}) {
    // console.log('getters', getters)
    const cate = getters.cate
    fetchList({cate}).then(res=>{
      // console.log('当前品类所对应的商品列表', res)
      commit('updateCache', res.list)
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
