// import { observable, action, computed, makeObservable } from 'mobx'
import { makeAutoObservable } from 'mobx'

// 定义一个子store
export default class StudyStore {
  constructor () {
    // 这是子store的构造器
    // makeObservable(this, {
    //   msg: observable,
    //   changeMsg: action,
    //   count: observable,
    //   total: computed,
    //   add: action,
    //   sub: action
    // })
    // 推荐一步到位实现响应式
    makeAutoObservable(this)
  }

  msg = 'Hello Mobx'
  count = 1

  get total () {
    return this.count * 100
  }

  changeMsg (payload) {
    console.log('---payload')
    this.msg = payload
    console.log('---new msg', this.msg)
  }
  add (step) {
    this.count += step
  }
  sub (step) {
    this.count -= step
  }
}
