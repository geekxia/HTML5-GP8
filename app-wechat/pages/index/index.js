const app = getApp()

Page({
  data: {
    msg: 'hello wrold',
    name: app.globalData.userinfo.name
  },
  onLoad () {
    console.log('---msg', this.data.msg)
    console.log('---app', app)
  },
  skipToGood () {
    wx.navigateTo({
      url: '/pages/good/good?id=100',
    })
  }
})
