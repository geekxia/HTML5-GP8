import loadable from "@loadable/component"
import { FormattedMessage } from 'react-intl'

import {
  TransactionOutlined,
  SketchOutlined
} from '@ant-design/icons'

// 最顶层的两个组件：Layout、Login
const Layout = loadable(()=>import('@/layout'))
const Login = loadable(()=>import('./login'))

// 业务页面组件，都是Layout的孩子们（嵌套路由）
const Dashboard = loadable(()=>import('./dashboard'))
const GoodList = loadable(()=>import('./good/GoodList'))
const GoodForm = loadable(()=>import('./good/GoodForm'))

// Sider上的路由信息（有权限的）
export const asyncRoutes = [
  {
    key: 9,
    label: <FormattedMessage id='menu.dashboard' />,
    path: '/dashboard',
    element: <Dashboard />,
    icon: <SketchOutlined />,
  },
  {
    key: 10,
    label: <FormattedMessage id='menu.good' />,
    icon: <TransactionOutlined />,
    roles: ['admin', 'editor'],
    children: [
      {
        key: 1001,
        label: <FormattedMessage id='menu.good.list' />,
        path: '/good/list',
        element: <GoodList />,
        // roles: ['admin']
      },
      {
        key: 1002,
        label: <FormattedMessage id='menu.good.add' />,
        path: '/good/add',
        element: <GoodForm />,
        // roles: ['editor']
      },
      {
        key: 1003,
        label: <FormattedMessage id='menu.good.edit' />,
        path: '/good/edit/:id',  // 动态路由
        element: <GoodForm />,
        // roles: ['editor'],
        hidden: true,   // 不放在Menu上
      }
    ]
  },
  {
    path: '*',
    hidden: true,  // 不放在Menu上
    element: <h1>页面走丢了！！</h1>,
  }
]

// 非Sider上的路由信息（无权限的）
export const constantRoutes = [
  {
    key: 1,
    path: '/',
    element: <Layout />,
    children: []  // 权限待实现
  },
  {
    key: 2,
    path: '/login',
    element: <Login />
  }
]
