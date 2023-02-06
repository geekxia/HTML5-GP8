import request from '@/utils/request'

// 学习redux异步数据流的
export function fetchCnode (params={}) {
  return request({
    url: '/topics',
    method: 'GET',
    params
  })
}

export function fetchLogin (data={}) {
  return request({
    url: '/react/user/login',
    method: 'POST',
    data
  })
}

// 用Token获取用户信息，怎么传Token？(我们用的是headers)
export function fetchUserInfo (params={}) {
  return request({
    url: '/react/user/info',
    method: 'GET',
    params
  })
}

export function fetchAllCate (params={}) {
  return request({
    url: '/react/good/cates',
    method: 'GET',
    params
  })
}

export function fetchGoodList (params={}) {
  return request({
    url: '/react/good/list',
    method: 'GET',
    params
  })
}

// 商品添加与编辑
export function fetchGoodSubmit (data={}) {
  return request({
    url: '/react/good/update',
    method: 'POST',
    data
  })
}

// 根据商品id获取商品详情
export function fetchGoodInfo (id) {
  return request({
    url: '/react/good/info',
    method: 'GET',
    params: { id }
  })
}

export function fetchGoodDelete (ids) {
  return request({
    url: '/react/good/delete',
    method: 'POST',
    data: { ids }
  })
}
