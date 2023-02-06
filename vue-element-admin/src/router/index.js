import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router) // 调用VueRouter.install(Vue) {}

/* 系统内部布局 */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
    notTag: true   如果等于true，不放在tagview上
  }
 */

// 静态的路由规则，不用区分角色，任何用户都能访问的
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页大屏', icon: 'dashboard', affix: true }
      }
    ]
  }
]

// 动态的路由规则，要区分角色，要根据后端返回的用户信息决定是否能访问。
export const asyncRoutes = [
  {
    path: '/good',
    component: Layout,
    redirect: '/good/list',
    alwaysShow: true, // will always show the root menu
    name: 'Good',
    meta: {
      title: '商品管理',
      icon: 'shopping',
      roles: ['editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/good/good-list'),
        name: 'GoodList',
        meta: {
          title: '商品列表',
          roles: ['editor'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'cate',
        component: () => import('@/views/good/good-cate'),
        name: 'GoodCate',
        meta: {
          title: '品类管理',
          roles: ['editor']
        }
      },
      {
        path: 'add',
        component: () => import('@/views/good/good-form'),
        name: 'GoodAdd',
        hidden: true,
        meta: {
          title: '商品新增',
          roles: ['editor']
        }
      },
      {
        path: 'edit/:id',  // 动态路由传参
        component: () => import('@/views/good/good-form'),
        name: 'GoodEdit',
        hidden: true,
        props: true,  // 开启props接收动态路由参数
        meta: {
          title: '商品编辑',
          roles: ['editor'],
          notTag: true  
        }
      },
    ]
  },
  {
    path: '/check',
    component: Layout,
    redirect: '/check/good',
    alwaysShow: true, // will always show the root menu
    name: 'Check',
    meta: {
      title: '审核管理',
      icon: 'shopping',
      roles: ['admin'] // you can set roles in root nav
    },
    children: [
      {
        path: 'good',
        component: () => import('@/views/check/check-good'),
        name: 'CheckGood',
        meta: {
          title: '商品审核',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/list',
    alwaysShow: true, // will always show the root menu
    name: 'User',
    meta: {
      title: '用户管理',
      icon: 'shopping',
      roles: ['admin'] // you can set roles in root nav
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/user/user-manage'),
        name: 'UserList',
        meta: {
          title: '用户列表',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      }
    ]
  },

  // 重写向
  { path: '*', redirect: '/404', hidden: true }
]

// 工厂函数，返回路由实例
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  // 创建路由实例时，只考虑了“静态的路由”，那些有权限的动态的路由，在哪里考虑的呢？（路由守卫）
  routes: constantRoutes
})

const router = createRouter()

// 手动切换用户角色时，或者登录失效时
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
