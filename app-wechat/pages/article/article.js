// pages/article/article.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      { id: '7111976104927166988', title: '第一篇文章' },
      { id: '7111983650161295907', title: '第二篇文章' },
      { id: '7111487394943074816', title: '第三篇文章' }
    ]
  },

  skipTo (ev) {
    const id = ev.target.dataset.id
    wx.navigateTo({
      url: '/pages/detail/detail?id='+id,
    })
  },

  scan () {
    wx.scanCode({
      scanType: ['barCode'],
      success (res) {
        console.log('---扫码成功', res)
      }
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

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