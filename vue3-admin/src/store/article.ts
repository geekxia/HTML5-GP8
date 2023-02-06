import { defineStore } from 'pinia'

const useArticleStore = defineStore('article', {
  state: () =>({
    msg: '文章'
  }),
  getters: {
    length () {
      return this.msg.length
    }
  },
  actions: {
    updateMsg (val) {
      this.msg = val
    }
  }
})

export default useArticleStore
