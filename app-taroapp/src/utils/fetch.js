import Taro from '@tarojs/taro'

const baseURL = 'https://cnodejs.org'

function fetch (url, method='get', data={}) {
  return new Promise(resolve=>{
    Taro.request({
      url: baseURL + url,
      method,
      data,
      success (res) {
        resolve(res.data.data)
      }
    })
  })
}

export function fetchCnode (data) {
  return fetch('/api/v1/topics', 'get', data)
}
