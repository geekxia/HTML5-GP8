
// 引入axios实例，封装可复用的API方法
import request from './request'

// QQ音乐列表
export function fetchQQ (params) {
  // 用axios实例调接口，并返回Promise对象
  return request({
    url:'/splcloud/fcgi-bin/gethotkey.fcg',
    method:'GET',
    params
  })
}

// axios是POST请求时，使用data入参
export function fetchRegist(data) {
  return request({
    url:'/api/v1/vant/user/regist',
    method:'POST',
    data
  })
}

export function fetchLogin(data) {
  return request({
    url:'/api/v1/vant/user/login',
    method:'POST',
    data
  })
}

// 获取品类
export function fetchCates(params={}) {
  return request({
    url: '/api/v1/vant/good/cates',
    method: 'GET',
    params
  })
}

// 商品列表 { page, size, cate .... }
export function fetchList(params={}) {
  return request({
    url: '/api/v1/vant/good/list',
    method: 'GET',
    params
  })
}

// 商品详情
export function fetchInfo(id) {
  return request({
    url: '/api/v1/vant/good/info',
    method: 'GET',
    params: { id }
  })
}

// 添加购物车
export function fetchCartAdd(data) {
  return request({
    url: '/api/v1/vant/cart/add',
    method: 'POST',
    data
  })
}

// 购物车列表
export function fetchCartList(params={}) {
  return request({
    url: '/api/v1/vant/cart/list',
    method: 'GET',
    params
  })
}

export function fetchCartDel (cart_id) {
  return request({
    url: '/api/v1/vant/cart/delete',
    method: 'GET',
    params: { cart_id }
  })
}

export function fetchCartUpd (params) {
  return request({
    url: '/api/v1/vant/cart/update',
    method: 'GET',
    params
  })
}

export function fetchCartSubmit (ids) {
  return request({
    url: '/api/v1/vant/cart/submit',
    method: 'POST',
    data: { ids }
  })
}

// 目的是希望那些用在页面组件中的API放在this上访问
export default {
  fetchList,
  fetchCates,
  fetchInfo,
  fetchCartAdd,
  fetchCartList,
  fetchCartDel,
  fetchCartUpd,
  fetchCartSubmit
}
