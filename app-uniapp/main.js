// 入口文件
import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false

// 使用uView组件库
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

// 集成store
import store from '@/store'

App.mpType = 'app'
const app = new Vue({
    ...App,
	store
})
app.$mount()

