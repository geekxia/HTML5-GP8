import { useRoutes, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState, useMemo } from 'react'
import { constantRoutes, asyncRoutes } from '@/views'

import { getInfo } from '@/store/actions'
import { generateRoutes } from '@/store/actions/permission'

// 使用useRoutes来定义路由规则
export default () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const { token, userinfo, accessRoutes } = useSelector(state=>state.user)

  useEffect(()=>{
    if (token) {
      // 登录流程中、刷新页面时，都要用Token获取用户信息
      dispatch(getInfo())
    } else {
      navigate('/login', {repalce:true})
    }
  }, [token])

  useEffect(()=>{
    // 登录流程中、刷新页面时，使用用户信息动态生成当前用户可以访问的路由规则
    if (userinfo.roles && accessRoutes.length===0) {
      // 先生成权限
      dispatch(generateRoutes(asyncRoutes, userinfo.roles))
    }
  }, [userinfo])

  useEffect(()=>{
    // 在登录流程中，当路由规则生成完成后，跳转到系统首页
    if (accessRoutes.length > 0 && pathname==='/login') {
      navigate('/dashboard', {repalce: true})
    }
  }, [accessRoutes])

  useEffect(()=>{
    // 没有Token，并且你尝试访问非/login页面时，跳转登录页
    if (pathname !== '/login' && !token) {
      navigate('/login', { repalce: true })
    }
    // 用户已有Token(已登录)，尝试访问登录页，跳转系统首页
    if (pathname === '/login' && token) {
      // console.log('----yyy')
      navigate('/dashboard', { repalce: true })
    }
    // 用户已登录，尝试访问/，跳转当前用户的首页
    if (token && accessRoutes.length > 0 && pathname==='/') {
      navigate('/dashboard', { repalce: true })
    }
  }, [pathname])

  // 用那些有权限的二级路由，计算得到我们需要的两层嵌套的路由
  const routes = useMemo(()=>{
    let arr = [...constantRoutes]  // 复制一份（数组解构）
    arr[0].children =  accessRoutes // 来自redux中的已生成好的权限路由规则们
    return arr
  }, [accessRoutes])

  // console.log('---routes', routes)
  const element = useRoutes(routes) // 动态路由规则  <Routes>
  return element
}


// <Routes>
//   <Route path='/' element={<Layout />}>
//     <Route path='/dashboard' />
//     <Route path='/good/list' />
//   </Route>
//   <Route path='/login' element={<Login />} />
// </Routes>
