// 上线时，把这个baseURL改成https的线上地址，并且在小程序后台进行配置
const baseURL = 'https://cnodejs.org'
const version = '/api/v1'

function request (url, method='get', data={}) {
  return new Promise (function(resolve, reject) {
    wx.request({
      url: baseURL + version + url,
      method,
      data,
      success (res) {
        console.log('---成功', res)
        resolve(res.data.data)
      },
      fail (err) {
        console.log('---失败', err)
        wx.toast('网络异步')
        reject(err)
      }
    })
  })
}

function fetchList (data) {
  return request('/topics', 'get', data)
}

module.exports = {
  fetchList
}