// pages/find/find.js
const api = require('../../utils/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lang: 'zh',
    count: 100,
    list: [
      { id: 1, name: '张三', age: 10 },
      { id: 2, name: '李四', age: 20 },
      { id: 3, name: '王五', age: 30 },
    ],
    idx: 2,
    bol: true,
    username: '',
    password: ''
  },
  getUsername (ev) {
    console.log('---ev', ev)
    this.setData({
      username: ev.detail.value
    })
  },

  langChange (ev) {
    console.log('---ev', ev.detail)
    this.setData({
      lang: ev.detail
    })
  },

  submit () {

  },

  handle (ev) {
    console.log('事件对象', ev)
  },

  addCount () {
    this.setData({
      count: ++this.data.count
    })
  },

  start1 () {
    this.animate('#box', [
      { opacity: 1.0, rotate: 0, backgroundColor: '#FF0000' },
      { opacity: 0.5, rotate: 45, backgroundColor: '#00FF00'},
      { opacity: 0.1, rotate: 75, backgroundColor: '#FF0000' },
    ], 5000, ()=>{
      console.log('动画已结束')
      this.clearAnimation('#box', {backgroundColor: true}, ()=>{
        console.log('已清除动画')
      })
    })
  },

  start2 () {
    this.animate('#door', [
      { width: '100%' },
      { width: '50%' },
      { width: 0 }
    ], 2000, ()=>{
      this.clearAnimation('#door', {}, ()=>{})
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    console.log('---ready调接口')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    console.log('---onShow调接口')
    api.fetchList({limit:5}).then(data=>{
      console.log('---data', data)
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})