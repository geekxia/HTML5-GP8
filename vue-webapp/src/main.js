// 这是当前应用程序的入口文件

// 导入Vue这个类（构造函数）
import Vue from 'vue'
// 导入App根组件（一个.vue文件就是一个组件）
// 这个.vue文件，我们称之为单文件组件，目的是为了更方便地编写Vue组件。
// 这种.vue文件，浏览器是无法解析，在当前环境背后有编译器来处理它。
import App from './App.vue'
// 导入路由实例
import router from './router'
// 导入状态管理
import store from './store'
// 导入API方法
import http from './utils/api'

// 引入并注册vant组件
import { Button, Tabbar, TabbarItem, NoticeBar, Search, Swipe, SwipeItem, Lazyload, Grid, GridItem, List, PullRefresh, Cell, NavBar, Sidebar, SidebarItem, SubmitBar, Checkbox, SwipeCell, Card, Col, Row, Image, GoodsAction, GoodsActionIcon, GoodsActionButton, Dialog, Toast } from 'vant'
Vue.use(Button)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(NoticeBar)
Vue.use(Search)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Lazyload)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(List)
Vue.use(PullRefresh)
Vue.use(Cell)
Vue.use(NavBar)
Vue.use(Sidebar)
Vue.use(SidebarItem)
Vue.use(SubmitBar)
Vue.use(Checkbox)
Vue.use(SwipeCell)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Image)
Vue.use(GoodsAction)
Vue.use(GoodsActionIcon)
Vue.use(GoodsActionButton)
Vue.use(Dialog)
Vue.use(Toast)

// 全局配置
Vue.config.productionTip = false

// 全局指令
Vue.directive('scroll', (el,binding) => {
  const arr = binding.value || [0,0,0,0]
  // console.log('arr', arr)
  el.style.position = 'absolute'
  el.style.left = arr[0]
  el.style.top = arr[1]
  el.style.right = arr[2]
  el.style.bottom = arr[3]
  el.style.overflow = 'scroll'
})

// 鉴权指令
Vue.directive('login', el => {
  el.style.position = 'relative'
  const box = document.createElement('div')
  box.style.position = 'absolute'
  box.style.top = 0
  box.style.left = 0
  box.style.bottom = 0
  box.style.right = 0
  box.style.zIndex = 9999
  // box.style.background = 'blue'
  // 未登录时
  if (!store.getters['user/isLogin']) {
    el.appendChild(box)
    box.addEventListener('click', ()=>{
      router.push('/login')
    })
  }
})

// 全局过滤器
Vue.filter('rmb', val=>{
  return Number(val).toFixed(2)
})

Vue.prototype.$http = http

// 和管理系统一起联调时，记得修改图片路径
// 还要记得清空数据库中的假数据！！！！!
// 本地开发
Vue.prototype.$cdn = 'http://localhost:9999'
// 部署到node-server服务
// Vue.prototype.$cdn = 'http://192.168.0.118:9999'

// 创建Vue响应式系统
new Vue({
  // 这个render函数，用于生产虚拟DOM而准备
  // 这个 h，相当于react中createElement()
  render: h => h(App),
  el: '#app',  // 或者 $mount('#app')
  router, // 挂载路由系统
  store,  // 挂载状态管理
})
