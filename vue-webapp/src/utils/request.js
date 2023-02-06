import axios from 'axios'
import { Toast } from 'vant'
import router from '@/router'
import store from '@/store'

// 本地开发
const baseURL = 'http://localhost:8000'
// 部署到node-server服务
// const baseURL = 'http://192.168.0.118:8888'

// 创建axios实例，并为它添加拦截器
const instance = axios.create({
  baseURL,
  timeout: 5000,  // 设置超时（单位是毫秒）
  headers: {}     // 添加公共的 Headers
})

// 添加请求拦截器（AJAX出门时遇到的门卫）
instance.interceptors.request.use( config => {
  // 添加token，把token传递后后端
  // 每个公司要求传递token的方式是不一样的
  config.headers['Authorization'] = localStorage.getItem('token')
  // 当后端收到token，反解析，就知道你是谁！
  return config
}, error => {
  // Do something with request error
  return Promise.reject(error)
})

// 添加响应拦截器（AJAX携带数据回来时遇到的门卫）
instance.interceptors.response.use(response => {
  // 当HTTP状态是2XX时，这里的代码将执行
  // 对后端返回的数据，进行若干的处理
  // console.log('response', response)

  // 第一层，对HTTP状态码成功与否的判断
  if (response.status===200 && response.data) {
    // 第二层，对业务状态进行成功与否的判断
    if (response.data.code===0) {
      // 数据过滤：把页面想要的数据简单过滤一下
      return response.data.data
    }
  }
  // 对node接口进行拦截（HTTP状态码、业务状态码）
  if (response.status===200 && response.data) {
    if (response.data.err===0) {
      // 数据过滤
      return response.data.data
    } else if (response.data.err === -1) {
      // 在咱们这个项目中，-1 表示token过期了
      store.commit('user/resetUser')
      // window.location.href = '#/login'
      router.push('/login')
      return null
    } else {
      // 当err !== 0 说明有业务逻辑错误
      // 把后端返回的信息提示给用户
      console.log('--msg', response.data)
      Toast.fail(response.data.msg)
      return null
    }
  }
  return response
}, error => {
  // 当HTTP状态不是2XX时，这里的代码会执行
  Toast.fail('网络异常、稍后再试')
  return Promise.reject(error)
})

export default instance
