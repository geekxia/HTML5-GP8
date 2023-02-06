// react-router-dom路由知识点

// - cnpm i react-router-dom@5.3.3 -S （一定要是V5）
// - 两种路由模式：<HashRouter> <BrowserRouter>
// - 两种路由跳转：<Link> <NavLink>
// - 定义路由规则：<Route>定义路由规则，<Switch>用于加速路由匹配，<Redirect>实现重定向的。
// - <Switch> 必须是 <Route> <Redirect>直接父组件。在定义路由规则，这三个必须一起用的。
// - 关于路由API：在React路由中，默认只有那些被<Route component>直接定义的组件，其props上有路由API和路由。
// - 对于那些没有路由信息的组件，怎么办？使用withRouter这个高阶组件（不推荐），还可以路由Hooks（推荐）
// - 两种路由传参：query传参（useLocation取参），路由路由传参（useParams取参）
// - 代码分割：使用@loadable/component实现基于路由的代码分割，它背后的原理React.lazy()、Webpack代码分割技术、<Suspense>交互提示。

import loadable from "@loadable/component"

const StudyHello = loadable(()=>import('./12/StudyHello'), {fallback: <div>Loading</div>})
const StudyJSX = loadable(()=>import('./12/StudyJSX'), {fallback: <div>Loading</div>})

import StudyProps from '@/pages/12/StudyProps'
import StudyEvent from '@/pages/12/StudyEvent'
import StudyState from '@/pages/12/StudyState'
import StudyRender from '@/pages/12/StudyRender'
import StudyForm from '@/pages/12/StudyForm'

import StudyLife from '@/pages/14/StudyLife'
import StudyLift from '@/pages/14/StudyLift'
import StudyCombine from '@/pages/14/StudyCombine'

import StudyContext from '@/pages/16/StudyContext'
import StudyHoc from '@/pages/16/StudyHoc'
import StudyRef from '@/pages/16/StudyRef'
import StudyHooks from '@/pages/16/StudyHooks'

const StudyMobx = loadable(()=>import('./16/StudyMobx'))
const StudyCnode = loadable(()=>import('./16/StudyCnode'))


// 路由信息都是根据业务需求自定义的
const routes = [
  {
    id: 10,
    text: '12K',
    routes: [
      { id: 1001, text: 'Hello', path: '/', component: StudyHello },
      { id: 1002, text: 'JSX', path: '/jsx', component: StudyJSX },
      { id: 1003, text: 'Props', path: '/props', component: StudyProps }
    ]
  },
  {
    id: 11,
    text: '14K',
    routes: [
      { id: 1101, text: 'Life', path: '/life', component: StudyLife },
      { id: 1102, text: 'Lift', path: '/lift', component: StudyLift }
    ]
  },
  {
    id: 12,
    text: '16K',
    routes: [
      { id: 1201, text: 'Mobx', path: '/mobx', component: StudyMobx },
      { id: 1202, text: 'Cnode', path: '/cnode', component: StudyCnode },

    ]
  }
]

export default routes
