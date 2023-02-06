import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex) // 注册

import music from './modules/music'
import user from './modules/user'
import good from './modules/good'

// 创建vuex实例对象（根store）
// 虽然在子store中不能使用modules，但在根store还可以再使用state/getters/mutations/actions
const store = new Vuex.Store({
  // modules
  // 作用：把store拆分成多个子store，这是架构层面的一种做法，为了让代码更好地进行组织与维护。
  // 做法：把state/getters/mutations/actions抽离变成子store，并为它们添加命名空间。
  // 当拆分成若干个子store后，我们在组件中就可以使用命名空间来访问或触发这些state或方法了。
  // 使用modules属性，来合并所有的子store
  modules: { music, user, good }
})

export default store
// import store from './*'
