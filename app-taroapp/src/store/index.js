import Counter from './modules/counter'

class Store {
  constructor () {
    this.counter = new Counter()
  }
}

const store = new Store()
export default store
