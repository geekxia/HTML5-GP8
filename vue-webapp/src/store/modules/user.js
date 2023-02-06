import { fetchLogin, fetchRegist } from '@/utils/api'
import { Toast } from 'vant'
import router from '@/router'

const state = {
  // 当用户刷新页面时，从本地取出token
  token: localStorage.getItem('token'),
  userinfo: {}
}

const getters = {
  isLogin (state) {
    // 把用户是否登录了的计算方案封装起来
    console.log('---')
    return Boolean(state.token)
  }
}

const mutations = {
  getToken (state, token) {
    state.token = token
  },
  resetUser (state) {
    localStorage.removeItem('token')
    state.token = ''
    state.userinfo = {}
  }
}

const actions = {
  regist (store, user) {
    fetchRegist(user).then(res=>{
      if (res) {
        Toast({
          type: 'success',
          message: '注册成功',
          onClose: () => router.replace('/login')
        })
      }
    })
  },
  login ({commit}, user) {
    fetchLogin(user).then(res=>{
      if (res && res.token) {
        commit('getToken', res.token)
        localStorage.setItem('token', res.token)
        Toast({
          message: '登录成功',
          type: 'success',
          onClose: () => router.back()
        })
      }
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
