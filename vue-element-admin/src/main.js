import Vue from 'vue'

// 引入cookie
import Cookies from 'js-cookie'
// 重置样式
import 'normalize.css/normalize.css' // a modern alternative to CSS resets

// 引入Element-UI
import Element from 'element-ui'
import './styles/element-variables.scss'
// 国际化
import enLang from 'element-ui/lib/locale/lang/en'// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖
// 把ElementUI变成全局组件
Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  // locale: enLang // 如果使用中文，无需设置，请删除
})

// 引入自定义的全局样式
import '@/styles/index.scss' // global css

// 引入根组件、引入路由实例、引入状态管理实例
import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // 路由守卫

// 自定义全局过滤器
import * as filters from './filters'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 启动了一个Mock服务
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

Vue.config.productionTip = false

import permission from './directive/permission'
Vue.use(permission)

Vue.prototype.$cdn = 'http://localhost:9999'
Vue.prototype.$socket = 'http://localhost:9090'

// 创建Vue响应式系统
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
