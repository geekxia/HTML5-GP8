import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import Qf from '@/plugins'
Vue.use(Qf)

new Vue({
  render: h => h(App),
}).$mount('#app')
