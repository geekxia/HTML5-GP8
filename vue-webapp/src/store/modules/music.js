import { fetchQQ } from '@/utils/api'

// 这就是子store
// 子store不要再使用modules这个选项
// 强调：子store一定要开启命名空间
export default  {
  // 开启命名空间，我们在组件访问state或触发mutations/actions时，都得强制通过命名空间来使用。
  // 如果不开启命名空间，那么多个store中，相同变量名会冲突。所以建议一定要开启。
  namespaced: true,
  // state
  // 作用：定义可被组件共享的状态数据。
  // 特点：当state被mutations修改后，所有用到当前state数据的组件，都会自动更新（这就是所谓的响应式）
  // 理解：state是数据仓库、数据银行。
  state: {
    count: 10000,
    price: 1,
    list: []   // 音乐列表
  },
  // getters
  // 作用：相当于Vue组件中的computed计算属性，用于对state复杂运算的封装与简化。
  // 特点：只有当getters中所关联的state依赖变化，才会重新计算。
  // 注意：getters方法，是计算属性，所以必须返回一个值。
  // 使用：在Vue组件中，使用this.$store直接访问这些getters，就像直接访问state们一样。
  getters: {
    total (state) {
      // 复杂运算
      return `￥${state.count*state.price}`
    },
    length (state) {
      return state.list.length
    }
  },
  // mutations
  // 作用：是Vuex中推荐的一种专门用于修改state的方法。
  // 特点：它虽然也是函数，但是你不能直接调用它们，我们要使用专门的commit()函数来触发执行它们。
  // 语法：在上游，使用$store.commit('matation方法名', payload)
  // 什么是payload？是上游传递过来的数据。
  mutations: {
    updateCount (state, payload) {
      console.log('---payload', payload)
      state.count += payload
    },
    updateList (state, payload) {
      state.list = payload
    }
  },
  // actions
  // 作用：是Vuex中推荐的一种专门用于调接口的方法。
  // 特点：它也是函数，但是你不能直接调用它们，我们要使用专门的dispatch()来触发执行它们。
  // 语法：在上游，使用$store.dispatch('action方法名', payload)
  // 什么是payload？因为actions方法用于调接口，所以payload经常是调接口的入参。
  actions: {
    getList ({commit}, payload) {
      // 调接口
      fetchQQ(payload).then(res=>{
        console.log('后端数据', res)
        commit('updateList', res.hotkey)
      })
    }
  }
}
