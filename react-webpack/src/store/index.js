// Mobx 是一个状态管理工具，它不是React技术栈的专属，它可以在Vue、Angular开发中。
// Mobx 背后的响应原理是基于Object.defineProperty实现的。
// 集成Mobx状态管理：mobx(v6) + mobx-react(v7)

import StudyStore from './modules/study'
import CnodeStore from './modules/cnode'

class Store {
  constructor () {
    // 根store的构造器（合并多个子store）
    this.study = new StudyStore()
    this.cnode = new CnodeStore()
  }
}

const store = new Store()
console.log('---root store', store)
export default store
