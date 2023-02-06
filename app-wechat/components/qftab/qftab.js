// components/qftab/qftab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    lang: { type: String, value: 'zh' }
  },

  /**
   * 组件的初始数据
   */
  data: {
    list: [
      { id: 1, tab: '中文', value: 'zh' },
      { id: 2, tab: '英文', value: 'en' },
      { id: 3, tab: '法语', value: 'fr' }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    change (ev) {
      console.log('---ev', ev.target.dataset.value)
      const val = ev.target.dataset.value
      this.triggerEvent('change', val)
    }
  }
})
