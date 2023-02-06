import loadable from '@loadable/component'

import {
  AppOutline,
  MessageOutline,
  UnorderedListOutline,
  UserOutline,
} from 'antd-mobile-icons'

const Home = loadable(()=>import('./home'))
const Find = loadable(()=>import('./find'))
const Cart = loadable(()=>import('./cart'))
const User = loadable(()=>import('./user'))
const Counter = loadable(()=>import('./counter'))

// Tabbar
export const tabRoutes = [
  {
    key: '/home',
    title: '首页',
    icon: <AppOutline />,
    path: '/home',
    element: <Home />,
  },
  {
    key: '/find',
    title: '分类',
    icon: <UnorderedListOutline />,
    path: '/find',
    element: <Find />
  },
  {
    key: '/cart',
    title: '购物车',
    icon: <MessageOutline />,
    path: '/cart',
    element: <Cart />

  },
  {
    key: '/user',
    title: '我的',
    icon: <UserOutline />,
    path: '/user',
    element: <User />
  },
  {
    key: '/counter',
    title: '测试',
    icon: <UserOutline />,
    path: '/counter',
    element: <Counter />
  },
]

