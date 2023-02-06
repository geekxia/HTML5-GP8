import request from '@/utils/request'

export function fetchCheckGoodList (params={}) {
  return request({
    url: '/api/v1/element/check/good/list',
    method: 'GET',
    params
  })
}

export function fetchCheckGood (data) {
  return request({
    url: '/api/v1/element/check/good',
    method: 'POST',
    data
  })
}
