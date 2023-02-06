import axios from 'axios'

const baseURL = 'http://localhost:8080'
const version = '/api/v1'

// 创建实例
const instance = axios.create({
  baseURL: baseURL + version,
  timeout: 5000,
  headers: {}
})

// 给实例对象添加请示拦截器
instance.interceptors.request.use(config => {
  // 添加各种headers和Token
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
  return response
  
}, error => {
  // HTTP一定是失败的
  return Promise.reject(error)
})

export default instance
