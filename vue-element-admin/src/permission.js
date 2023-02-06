import router from './router'
import store from './store'

// 弹框组件
import { Message } from 'element-ui'
// 进度条组件
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
NProgress.configure({ showSpinner: false }) // NProgress Configuration
// 公共方法
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

// 白名单：无须登录就可以直接访问的页面
const whiteList = ['/login', '/auth-redirect']

// router.beforeEach()  // url找path时
// router.beforeResolve()  // path找component时
// router.afterEach()  // component在<router-view>已经显示成功

// 给路由实例添加路由守卫
router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // DOM操作，改变标题
  document.title = getPageTitle(to.meta.title)

  // 从cookie中取出Token
  const hasToken = getToken()

  if (hasToken) {
    // 有Token，表示登录过
    if (to.path === '/login') {
      // 如果已登录，没必要再访问登录的
      next({ path: '/' })
      NProgress.done()
    } else {
      // 有Token，并且你想访问非登录页
      // 访问vuex中的用户roles信息
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        // 如果vuex中已经存在用户roles，直接访问你的目标页面
        next()
      } else {
        // 如果vuex中没有用户roles信息，路由守卫不认识你，不让过去
        try {
          // 调接口获取用户信息
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const { roles } = await store.dispatch('user/getInfo')

          // generate accessible routes map based on roles
          // 基于后端返回的用户roles，动态生成当前用户有权访问的路由规则
          // 题目：['admin','editor']    [{},{meta:{},children:[]}]
           const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          // dynamically add accessible routes
          // 手动向路由规则追加额外的路由规则
          router.addRoutes(accessRoutes)

          // 请过去，可以访问你想访问的页面了
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* Token不存在时 */
    if (whiteList.indexOf(to.path) !== -1) {
      // 如果访问白名单中的页面，可以直接访问
      next()
    } else {
      // 重定向跳转到登录页
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
