import axios from 'axios'
import { message } from 'antd'
import store from '@/store'  // store.dispatch()
import { resetUser } from '@/store/actions'

const baseURL = 'http://localhost:9090'
const version = '/api/v1'

// 创建实例
const instance = axios.create({
  baseURL: baseURL + version,
  timeout: 5000,
  headers: {}
})

// 给实例对象添加请示拦截器
instance.interceptors.request.use(config => {
  // 添加各种headers和Token（向后端传递Token）
  config.headers.Authorization = localStorage.getItem('token')
  return config
}, error => {
  return Promise.reject(error)
})

// 给实例对象添加响应拦截器
instance.interceptors.response.use(response => {
  // HTTP一定是成功的，通常是200
  // 根据业务状态码判断业务是否正确
  // 数据过滤
  if (response.data?.success) {
    return response.data.data
  }
  if (response.data.err===0) {
    return response.data.data
  } else if (response.data.err===-1) {
    store.dispatch(resetUser())
    message.error('登录失效，请重新登录！')
  } else {
    // 业务逻辑的失败，-1表示Token过期，其它情况是其它业务错误
    return message.error(response.data.msg)
  }
  return response
}, error => {
  // HTTP一定是失败的
  message.error('网络异常，稍后再试')
  return Promise.reject(error)
})

export default instance
