import { defineStore } from 'pinia'
import axios from 'axios'

// 定义一个完全独立的store
// 这个hooks一定要用use*开头
const useUserStore = defineStore('user', {
  // 只能写成工厂函数 state(){return{}}  或 state: ()=>({})
  state: () => ({
    msg: 'hello pinia',
    num: 100,
    foo: [],
    list: []
  }),
  // 计算属性：对state进行计算、对另一个计算属性进行计算、对另一个store中的state/getters进行计算。
  getters: {
    // ES5写法（有this）
    total1 () {
      // console.log('---ES5写法 this', this)
      return this.num * 10
    },
    // ES6写法（没有this）
    total2: (state) => {
      // console.log('---ES6写法 this', this)
      return state.num * 10
    },
    total3 () {
      return this.total1 * 10
    },
    // 计算属性可以接收参数
    total4 () {
      return (arg=1) => (this.num * arg)
    }
  },
  // 在pinia中移除的mutations这个概念，actions同时支持同步、异步逻辑。
  // 在多store时，在actions中还可以调用其它store中的action方法。
  // 在actions中还可以调同一个store中的另一个action。
  actions: {
    setMsg (payload) {
      this.msg = payload
    },
    addNum (step=1) {
      // do something
      this.num += step
    },
    getCnodeList (params={}) {
      axios({
        url: 'https://cnodejs.org/api/v1/topics',
        method: 'get',
        params
      }).then(res=>{
        console.log('---文章列表', res.data.data)
        this.list = res.data.data
      })
    },
    async getCnodeListSync (params={}) {
      const res = await axios({
        url: 'https://cnodejs.org/api/v1/topics',
        method: 'get',
        params
      })
      this.list = res.data.data
    }
  }
})

export default useUserStore
