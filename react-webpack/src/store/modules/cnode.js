import { makeAutoObservable } from 'mobx'
import { fetchCnode } from '@/utils/api'

export default class CnodeStore {

  constructor () {
    makeAutoObservable(this)
  }

  list = []

  // 最新Mobx在严格模式下，不能直接修改obsservable变量
  // 建议封装action方法来修改obsservable变量
  updateList (list) {
    this.list = list
  }

  // action：用async/await执行同步操作
  async getList1 (params) {
    const list = await fetchCnode(params)
    console.log('1---list', list)
    this.updateList(list)
  }

  // flow：用generator函数执行同步操作
  * getList2 (params) {
    const list = yield fetchCnode(params)
    console.log('2---list', list)
    this.updateList(list)
  }

  // action：异步数据流
  getList3 (params) {
    fetchCnode(params).then(list => {
      console.log('3---list', list)
      this.updateList(list)
    })
  }
}
