import request from '@/utils/request'

export function fetchCateAdd(data) {
  return request({
    url: '/api/v1/element/cate/add',
    method: 'post',
    data
  })
}

export function fetchCateAll(params={}) {
  return request({
    url: '/api/v1/element/cate/all',
    method: 'get',
    params
  })
}


export function fetchGoodForm(data) {
  return request({
    url: '/api/v1/element/good/update',
    method: 'post',
    data
  })
}

export function fetchGoodList(params={}) {
  return request({
    url: '/api/v1/element/good/list',
    method: 'get',
    params
  })
}


export function fetchGoodInfo(id) {
  return request({
    url: '/api/v1/element/good/info',
    method: 'get',
    params: { id }
  })
}
