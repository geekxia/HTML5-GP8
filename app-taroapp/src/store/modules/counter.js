import { observable, action } from 'mobx'

import { fetchCnode } from '@/utils/fetch'

export default class Counter {
  @observable
  counter = 0

  @observable
  list = []

  @action
  counterStore() {
    this.counter++
  }

  @action
  increment() {
    this.counter++
  }

  @action
  decrement() {
    this.counter--
  }

  @action
  incrementAsync() {
    setTimeout(() => {
      this.counter++
    }, 1000)
  }

  @action
  getList (data) {
    fetchCnode(data).then(res=>{
      console.log('---文章列表', res)
      this.list = res
    })
  }
}


// mobx(v4)的ES5写法
// const counterStore = observable({
//   counter: 0,
//   counterStore() {
//     this.counter++
//   },
//   increment() {
//     this.counter++
//   },
//   decrement() {
//     this.counter--
//   },
//   incrementAsync() {
//     setTimeout(() => {
//       this.counter++
//     }, 1000)
//   }
// })
// export default counterStore
