import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles  // ['admin', 'editor']
 * @param route  // { path, component, meta: { roles: [] } }
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes 那些有权限的动态的路由规则
 * @param roles  ['admin','editor']
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route } // tmp就是一条具体的路由规则
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],    // 当前用户可以看到的所有的路由规则
  addRoutes: [],  // 当前用户可以看到的动态的路由规则
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  // 使用后端roles数据，动态生成当前用户有权访问的路由规则
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      // 得到当前用户可以访问的路由规则
      let accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)

      // if (roles.includes('admin')) {
      //   accessedRoutes = asyncRoutes || []
      // } else {
      //   accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      // }

      // 把当前用户可访问的动态的路由规则放在vuex
      commit('SET_ROUTES', accessedRoutes)
      // .then()
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
