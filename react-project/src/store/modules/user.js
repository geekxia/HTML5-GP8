import produce from 'immer'
import { USER_LOGIN, USER_INFO, USER_PERMISSION, USER_RESET } from '../actionTypes'

const initState = {
  token: localStorage.getItem('token'),
  userinfo: {},
  accessRoutes: []  // 当前用户有权访问的路由规则们
}

export default function (state=initState, {type, payload}) {
  return produce(state, state=>{
    switch (type) {
      case USER_LOGIN:
        state.token = payload
        localStorage.setItem('token', payload)
        break
      case  USER_INFO:
        state.userinfo = payload
        break
      case USER_PERMISSION:
        state.accessRoutes = payload
        break
      case USER_RESET:
        state.token = null
        state.userinfo = {}
        state.accessRoutes = []
        localStorage.removeItem('token')
        window.location.href = '/#/login'
        break
      default:
    }
  })
}
