// app.js
App({
  // 整个小程序的入口
  onLaunch () {
    wx.login({
      success (res) {
        console.log('---登录', res.code) // 临时凭证，有效期5分钟
        // wx.request({})  // 把临时凭证发送给业务服务器
        // 收到后端返回的Token，存储在storage中
        wx.setStorageSync('token', res.code)
      }
    })
    // 获取当前用户的授权列表
    wx.getSetting({
      success(res) {
        console.log('---授权信息', res)
        if (!res.authSetting['scope.userLocation']) {
          // 弹出授权框（只弹一次）
          wx.authorize({
            scope: 'scope.userLocation',
            success (res) {
              console.log('用户同意的位置授权', res)
            },
            fail (err) {
              console.log('用户拒绝了位置授权', err)
            }
          })
        }
      }
    })
  },
  // 全局数据（不具有响应式）
  globalData: {
    userinfo: {
      name: '张三',
      age: 10
    }
  }
})
