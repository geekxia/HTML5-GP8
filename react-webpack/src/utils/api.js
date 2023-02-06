// 导入axios实例对象
import request from './request'

export function fetchCnode (params={}) {
  return request({
    url: '/topics',
    method: 'GET',
    params
  })
}
