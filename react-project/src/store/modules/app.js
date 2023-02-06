import produce from 'immer'
import { APP_SIDER_LOGO, APP_PRIMARY_COLOR, APP_ANTD_SIZE, APP_ANTD_LANG } from '../actionTypes'

function isFixed () {
  // 注意，如果localStorage中找不到，则返回null
  // 如果localStorage中能找到，返回的是字符串
  const fixedLogo = localStorage.getItem('fixedLogo')
  // console.log('----fixedLogo', fixedLogo)
  if (fixedLogo===null) {
    return true
  } else if (fixedLogo ==='false') {
    return false
  } else {
    return true
  }
}

const initState = {
  fixedLogo: isFixed(),   // 是否显示Sider上的logo
  primaryColor: localStorage.getItem('primaryColor') || '#1890ff',
  antdSize: localStorage.getItem('antdSize') || 'middle',
  lang: localStorage.getItem('lang') || navigator.language.split('-')[0]  // 'zh-CN'
}

export default function (state=initState, {type,payload}) {
  return produce(state, state=> {
    switch (type) {
      case APP_SIDER_LOGO:
        state.fixedLogo = !state.fixedLogo
        localStorage.setItem('fixedLogo', state.fixedLogo)
        break
      case APP_PRIMARY_COLOR:
        state.primaryColor = payload
        localStorage.setItem('primaryColor', state.primaryColor)
        break
      case APP_ANTD_SIZE:
        state.antdSize = payload
        localStorage.setItem('antdSize', payload)
        break
      case APP_ANTD_LANG:
        state.lang = payload
        localStorage.setItem('lang', payload)
        break
      default:
    }
  })
}
