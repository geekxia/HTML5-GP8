import request from '@/utils/request'

export function login(data) {
  return request({
    // url: '/vue-element-admin/user/login',
    url: '/api/v1/element/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/api/v1/element/userinfo',
    method: 'get',
    // 它的逻辑是使用params把Token传递给后端
    // 这里没有必要了，因为我们的后端要求使用headers传递Token
    params: {}
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
