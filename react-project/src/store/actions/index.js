import { STUDY_COUNT_ADD, STUDY_COUNT_SUB, STUDY_CNODE_LIST, APP_SIDER_LOGO, APP_PRIMARY_COLOR, APP_ANTD_SIZE, APP_ANTD_LANG, USER_LOGIN, USER_INFO, USER_RESET, GOOD_LIST, GOOD_ALL_CATES, GOOD_SUBMIT, GOOD_INFO } from '../actionTypes'
import { fetchCnode, fetchLogin, fetchUserInfo, fetchAllCate, fetchGoodList, fetchGoodSubmit, fetchGoodInfo, fetchGoodDelete } from '@/api'


// action生成器
export function addCount (payload=0) {
  // do something
  return { type: STUDY_COUNT_ADD, payload }
}

export function subCount (payload=0) {
  return { type: STUDY_COUNT_SUB, payload }
}

// 配合redux-thunk的写法
export function getCnodeList (payload) {
  // 这个被返回的function是给thunk中间件使用的
  return function (dispatch) {
    fetchCnode(payload).then(res=>{
      dispatch({type: STUDY_CNODE_LIST, payload: res})
    })
  }
}

// 切换显示Sider上的logo
export function toggleSiderLogo () {
  return { type: APP_SIDER_LOGO, payload: '' }
}
// 换主题色
export function togglePrimaryColor (color) {
  return { type: APP_PRIMARY_COLOR, payload: color }
}

// 切换组件Size
export function toggleAntdSize (size) {
  return { type: APP_ANTD_SIZE, payload: size }
}

// 国际化
export function toggleAntdLang (lang) {
  return { type: APP_ANTD_LANG, payload: lang }
}

// 登录
export function login (data) {
  return function (dispatch) {
    fetchLogin(data).then(res=>{
      console.log('----登录成功', res)
      if (res.token) {
        dispatch({ type: USER_LOGIN, payload: res.token })
      }
    })
  }
}

// 用Token获取用户信息
export function getInfo () {
  return function (dispatch) {
    fetchUserInfo().then(res=>{
      console.log('----用户信息', res)
      // dispatch(用户信息派发store)
      dispatch({ type: USER_INFO, payload: res })
    })
  }
}

// 退出系统
export function resetUser () {
  return { type: USER_RESET , payload: '' }
}

// 获取品类
export function getCates () {
  return function (dispatch) {
    fetchAllCate().then(res=> {
      // console.log('品类', res)
      if (res.list) {
        dispatch({ type: GOOD_ALL_CATES, payload: res.list })
      }
    })
  }
}

// 商品列表查询
export function queryGoodList (params) {
  return function (dispatch) {
    fetchGoodList(params).then(res=> {
      console.log('商品列表', res) // res = { total, list }
      dispatch({ type: GOOD_LIST, payload: res})
    })
  }
}

export function goodDone (payload) {
  return { type: GOOD_SUBMIT, payload }
}

export function goodSubmit (data) {
  return dispatch => {
    fetchGoodSubmit(data).then(res=>{
      dispatch(goodDone(1))
    })
  }
}

export function goodInfo (id) {
  return dispatch => {
    fetchGoodInfo(id).then(res=>{
      if (res.info) {
        dispatch({ type: GOOD_INFO, payload: res.info })
      }
    })
  }
}

export function goodDelete (ids) {
  return dispatch => {
    fetchGoodDelete(ids).then(res=>{
      dispatch(goodDone(1))
    })
  }
}
